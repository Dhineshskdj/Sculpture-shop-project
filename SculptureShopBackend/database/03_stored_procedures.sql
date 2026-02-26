-- ============================================
-- Dhinesh Sculpture Shop - Stored Procedures
-- ============================================

USE sculptureShop;

DELIMITER //

-- ============================================
-- CATEGORY PROCEDURES
-- ============================================

-- SP: Get All Active Categories
DROP PROCEDURE IF EXISTS sp_get_all_categories//
CREATE PROCEDURE sp_get_all_categories()
BEGIN
    SELECT 
        id,
        name,
        description,
        image_url,
        display_order,
        created_at
    FROM categories 
    WHERE is_active = 1 
    ORDER BY display_order ASC, name ASC;
END//

-- SP: Get Category By ID
DROP PROCEDURE IF EXISTS sp_get_category_by_id//
CREATE PROCEDURE sp_get_category_by_id(IN p_id INT)
BEGIN
    SELECT 
        id,
        name,
        description,
        image_url,
        is_active,
        display_order,
        created_at,
        updated_at
    FROM categories 
    WHERE id = p_id;
END//

-- SP: Add New Category
DROP PROCEDURE IF EXISTS sp_add_category//
CREATE PROCEDURE sp_add_category(
    IN p_name VARCHAR(100),
    IN p_description TEXT,
    IN p_image_url VARCHAR(500),
    IN p_display_order INT
)
BEGIN
    INSERT INTO categories (name, description, image_url, display_order)
    VALUES (p_name, p_description, p_image_url, IFNULL(p_display_order, 0));
    
    SELECT LAST_INSERT_ID() AS id, 'Category added successfully' AS message;
END//

-- SP: Update Category
DROP PROCEDURE IF EXISTS sp_update_category//
CREATE PROCEDURE sp_update_category(
    IN p_id INT,
    IN p_name VARCHAR(100),
    IN p_description TEXT,
    IN p_image_url VARCHAR(500),
    IN p_display_order INT,
    IN p_is_active TINYINT
)
BEGIN
    UPDATE categories 
    SET 
        name = IFNULL(p_name, name),
        description = IFNULL(p_description, description),
        image_url = IFNULL(p_image_url, image_url),
        display_order = IFNULL(p_display_order, display_order),
        is_active = IFNULL(p_is_active, is_active)
    WHERE id = p_id;
    
    SELECT ROW_COUNT() AS affected_rows, 'Category updated successfully' AS message;
END//

-- SP: Delete Category (Soft Delete)
DROP PROCEDURE IF EXISTS sp_delete_category//
CREATE PROCEDURE sp_delete_category(IN p_id INT)
BEGIN
    UPDATE categories SET is_active = 0 WHERE id = p_id;
    SELECT ROW_COUNT() AS affected_rows, 'Category deleted successfully' AS message;
END//

-- ============================================
-- MATERIAL PROCEDURES
-- ============================================

-- SP: Get All Active Materials
DROP PROCEDURE IF EXISTS sp_get_all_materials//
CREATE PROCEDURE sp_get_all_materials()
BEGIN
    SELECT 
        id,
        name,
        description,
        created_at
    FROM materials 
    WHERE is_active = 1 
    ORDER BY name ASC;
END//

-- SP: Add New Material
DROP PROCEDURE IF EXISTS sp_add_material//
CREATE PROCEDURE sp_add_material(
    IN p_name VARCHAR(100),
    IN p_description TEXT
)
BEGIN
    INSERT INTO materials (name, description)
    VALUES (p_name, p_description);
    
    SELECT LAST_INSERT_ID() AS id, 'Material added successfully' AS message;
END//

-- ============================================
-- SCULPTURE PROCEDURES
-- ============================================

-- SP: Get All Sculptures with Filters
DROP PROCEDURE IF EXISTS sp_get_sculptures//
CREATE PROCEDURE sp_get_sculptures(
    IN p_category_id INT,
    IN p_material_id INT,
    IN p_min_price DECIMAL(12,2),
    IN p_max_price DECIMAL(12,2),
    IN p_search_term VARCHAR(100),
    IN p_is_featured TINYINT,
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    DECLARE v_limit INT DEFAULT 100;
    DECLARE v_offset INT DEFAULT 0;
    
    SET v_limit = IFNULL(p_limit, 100);
    SET v_offset = IFNULL(p_offset, 0);
    
    SELECT 
        s.id,
        s.name,
        s.slug,
        s.description,
        s.dimensions,
        s.height_cm,
        s.width_cm,
        s.depth_cm,
        s.weight_kg,
        s.price,
        s.is_featured,
        s.is_available,
        s.view_count,
        s.created_at,
        c.id AS category_id,
        c.name AS category_name,
        m.id AS material_id,
        m.name AS material_name,
        (SELECT image_url FROM sculpture_images WHERE sculpture_id = s.id AND is_primary = 1 LIMIT 1) AS primary_image
    FROM sculptures s
    LEFT JOIN categories c ON s.category_id = c.id
    LEFT JOIN materials m ON s.material_id = m.id
    WHERE s.is_active = 1
        AND (p_category_id IS NULL OR s.category_id = p_category_id)
        AND (p_material_id IS NULL OR s.material_id = p_material_id)
        AND (p_min_price IS NULL OR s.price >= p_min_price)
        AND (p_max_price IS NULL OR s.price <= p_max_price)
        AND (p_is_featured IS NULL OR s.is_featured = p_is_featured)
        AND (p_search_term IS NULL OR p_search_term = '' OR 
             s.name LIKE CONCAT('%', p_search_term, '%') OR 
             s.description LIKE CONCAT('%', p_search_term, '%'))
    ORDER BY s.is_featured DESC, s.created_at DESC
    LIMIT v_limit
    OFFSET v_offset;
END//

-- SP: Get Sculpture Count with Filters
DROP PROCEDURE IF EXISTS sp_get_sculptures_count//
CREATE PROCEDURE sp_get_sculptures_count(
    IN p_category_id INT,
    IN p_material_id INT,
    IN p_min_price DECIMAL(12,2),
    IN p_max_price DECIMAL(12,2),
    IN p_search_term VARCHAR(100),
    IN p_is_featured TINYINT
)
BEGIN
    SELECT COUNT(*) AS total_count
    FROM sculptures s
    WHERE s.is_active = 1
        AND (p_category_id IS NULL OR s.category_id = p_category_id)
        AND (p_material_id IS NULL OR s.material_id = p_material_id)
        AND (p_min_price IS NULL OR s.price >= p_min_price)
        AND (p_max_price IS NULL OR s.price <= p_max_price)
        AND (p_is_featured IS NULL OR s.is_featured = p_is_featured)
        AND (p_search_term IS NULL OR p_search_term = '' OR 
             s.name LIKE CONCAT('%', p_search_term, '%') OR 
             s.description LIKE CONCAT('%', p_search_term, '%'));
END//

-- SP: Get Sculpture By ID
DROP PROCEDURE IF EXISTS sp_get_sculpture_by_id//
CREATE PROCEDURE sp_get_sculpture_by_id(IN p_id INT)
BEGIN
    -- Update view count
    UPDATE sculptures SET view_count = view_count + 1 WHERE id = p_id;
    
    -- Return sculpture details
    SELECT 
        s.id,
        s.name,
        s.slug,
        s.description,
        s.dimensions,
        s.height_cm,
        s.width_cm,
        s.depth_cm,
        s.weight_kg,
        s.price,
        s.is_featured,
        s.is_available,
        s.view_count,
        s.created_at,
        s.updated_at,
        c.id AS category_id,
        c.name AS category_name,
        m.id AS material_id,
        m.name AS material_name
    FROM sculptures s
    LEFT JOIN categories c ON s.category_id = c.id
    LEFT JOIN materials m ON s.material_id = m.id
    WHERE s.id = p_id AND s.is_active = 1;
END//

-- SP: Get Sculpture By Slug
DROP PROCEDURE IF EXISTS sp_get_sculpture_by_slug//
CREATE PROCEDURE sp_get_sculpture_by_slug(IN p_slug VARCHAR(255))
BEGIN
    DECLARE v_sculpture_id INT;
    
    SELECT id INTO v_sculpture_id FROM sculptures WHERE slug = p_slug AND is_active = 1;
    
    IF v_sculpture_id IS NOT NULL THEN
        -- Update view count
        UPDATE sculptures SET view_count = view_count + 1 WHERE id = v_sculpture_id;
        
        -- Return sculpture details
        SELECT 
            s.id,
            s.name,
            s.slug,
            s.description,
            s.dimensions,
            s.height_cm,
            s.width_cm,
            s.depth_cm,
            s.weight_kg,
            s.price,
            s.is_featured,
            s.is_available,
            s.view_count,
            s.created_at,
            s.updated_at,
            c.id AS category_id,
            c.name AS category_name,
            m.id AS material_id,
            m.name AS material_name
        FROM sculptures s
        LEFT JOIN categories c ON s.category_id = c.id
        LEFT JOIN materials m ON s.material_id = m.id
        WHERE s.id = v_sculpture_id;
    END IF;
END//

-- SP: Get Sculpture Images
DROP PROCEDURE IF EXISTS sp_get_sculpture_images//
CREATE PROCEDURE sp_get_sculpture_images(IN p_sculpture_id INT)
BEGIN
    SELECT 
        id,
        sculpture_id,
        image_url,
        alt_text,
        is_primary,
        display_order
    FROM sculpture_images 
    WHERE sculpture_id = p_sculpture_id
    ORDER BY is_primary DESC, display_order ASC;
END//

-- SP: Add New Sculpture
DROP PROCEDURE IF EXISTS sp_add_sculpture//
CREATE PROCEDURE sp_add_sculpture(
    IN p_name VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_category_id INT,
    IN p_material_id INT,
    IN p_description TEXT,
    IN p_dimensions VARCHAR(100),
    IN p_height_cm DECIMAL(10,2),
    IN p_width_cm DECIMAL(10,2),
    IN p_depth_cm DECIMAL(10,2),
    IN p_weight_kg DECIMAL(10,2),
    IN p_price DECIMAL(12,2),
    IN p_is_featured TINYINT,
    IN p_is_available TINYINT
)
BEGIN
    DECLARE v_slug VARCHAR(255);
    
    -- Generate slug if not provided
    SET v_slug = IFNULL(p_slug, LOWER(REPLACE(REPLACE(p_name, ' ', '-'), '''', '')));
    
    INSERT INTO sculptures (
        name, slug, category_id, material_id, description,
        dimensions, height_cm, width_cm, depth_cm, weight_kg,
        price, is_featured, is_available
    ) VALUES (
        p_name, v_slug, p_category_id, p_material_id, p_description,
        p_dimensions, p_height_cm, p_width_cm, p_depth_cm, p_weight_kg,
        IFNULL(p_price, 0), IFNULL(p_is_featured, 0), IFNULL(p_is_available, 1)
    );
    
    SELECT LAST_INSERT_ID() AS id, v_slug AS slug, 'Sculpture added successfully' AS message;
END//

-- SP: Update Sculpture
DROP PROCEDURE IF EXISTS sp_update_sculpture//
CREATE PROCEDURE sp_update_sculpture(
    IN p_id INT,
    IN p_name VARCHAR(255),
    IN p_category_id INT,
    IN p_material_id INT,
    IN p_description TEXT,
    IN p_dimensions VARCHAR(100),
    IN p_height_cm DECIMAL(10,2),
    IN p_width_cm DECIMAL(10,2),
    IN p_depth_cm DECIMAL(10,2),
    IN p_weight_kg DECIMAL(10,2),
    IN p_price DECIMAL(12,2),
    IN p_is_featured TINYINT,
    IN p_is_available TINYINT
)
BEGIN
    UPDATE sculptures 
    SET 
        name = IFNULL(p_name, name),
        category_id = IFNULL(p_category_id, category_id),
        material_id = IFNULL(p_material_id, material_id),
        description = IFNULL(p_description, description),
        dimensions = IFNULL(p_dimensions, dimensions),
        height_cm = IFNULL(p_height_cm, height_cm),
        width_cm = IFNULL(p_width_cm, width_cm),
        depth_cm = IFNULL(p_depth_cm, depth_cm),
        weight_kg = IFNULL(p_weight_kg, weight_kg),
        price = IFNULL(p_price, price),
        is_featured = IFNULL(p_is_featured, is_featured),
        is_available = IFNULL(p_is_available, is_available)
    WHERE id = p_id;
    
    SELECT ROW_COUNT() AS affected_rows, 'Sculpture updated successfully' AS message;
END//

-- SP: Delete Sculpture (Soft Delete)
DROP PROCEDURE IF EXISTS sp_delete_sculpture//
CREATE PROCEDURE sp_delete_sculpture(IN p_id INT)
BEGIN
    UPDATE sculptures SET is_active = 0 WHERE id = p_id;
    SELECT ROW_COUNT() AS affected_rows, 'Sculpture deleted successfully' AS message;
END//

-- SP: Add Sculpture Image
DROP PROCEDURE IF EXISTS sp_add_sculpture_image//
CREATE PROCEDURE sp_add_sculpture_image(
    IN p_sculpture_id INT,
    IN p_image_url VARCHAR(500),
    IN p_alt_text VARCHAR(255),
    IN p_is_primary TINYINT,
    IN p_display_order INT
)
BEGIN
    -- If this is primary, unset other primary images
    IF p_is_primary = 1 THEN
        UPDATE sculpture_images SET is_primary = 0 WHERE sculpture_id = p_sculpture_id;
    END IF;
    
    INSERT INTO sculpture_images (sculpture_id, image_url, alt_text, is_primary, display_order)
    VALUES (p_sculpture_id, p_image_url, p_alt_text, IFNULL(p_is_primary, 0), IFNULL(p_display_order, 0));
    
    SELECT LAST_INSERT_ID() AS id, 'Image added successfully' AS message;
END//

-- SP: Delete Sculpture Image
DROP PROCEDURE IF EXISTS sp_delete_sculpture_image//
CREATE PROCEDURE sp_delete_sculpture_image(IN p_id INT)
BEGIN
    DELETE FROM sculpture_images WHERE id = p_id;
    SELECT ROW_COUNT() AS affected_rows, 'Image deleted successfully' AS message;
END//

-- SP: Get Featured Sculptures
DROP PROCEDURE IF EXISTS sp_get_featured_sculptures//
CREATE PROCEDURE sp_get_featured_sculptures(IN p_limit INT)
BEGIN
    DECLARE v_limit INT DEFAULT 10;
    
    SET v_limit = IFNULL(p_limit, 10);
    
    SELECT 
        s.id,
        s.name,
        s.slug,
        s.description,
        s.price,
        s.is_available,
        c.name AS category_name,
        m.name AS material_name,
        (SELECT image_url FROM sculpture_images WHERE sculpture_id = s.id AND is_primary = 1 LIMIT 1) AS primary_image
    FROM sculptures s
    LEFT JOIN categories c ON s.category_id = c.id
    LEFT JOIN materials m ON s.material_id = m.id
    WHERE s.is_active = 1 AND s.is_featured = 1
    ORDER BY s.created_at DESC
    LIMIT v_limit;
END//

-- SP: Get Related Sculptures
DROP PROCEDURE IF EXISTS sp_get_related_sculptures//
CREATE PROCEDURE sp_get_related_sculptures(
    IN p_sculpture_id INT,
    IN p_limit INT
)
BEGIN
    DECLARE v_category_id INT;
    DECLARE v_limit INT DEFAULT 4;
    
    SET v_limit = IFNULL(p_limit, 4);
    
    SELECT category_id INTO v_category_id FROM sculptures WHERE id = p_sculpture_id;
    
    SELECT 
        s.id,
        s.name,
        s.slug,
        s.price,
        c.name AS category_name,
        (SELECT image_url FROM sculpture_images WHERE sculpture_id = s.id AND is_primary = 1 LIMIT 1) AS primary_image
    FROM sculptures s
    LEFT JOIN categories c ON s.category_id = c.id
    WHERE s.is_active = 1 
        AND s.id != p_sculpture_id 
        AND s.category_id = v_category_id
    ORDER BY RAND()
    LIMIT v_limit;
END//

-- ============================================
-- CONTACT REQUEST PROCEDURES
-- ============================================

-- SP: Create Contact Request
DROP PROCEDURE IF EXISTS sp_create_contact_request//
CREATE PROCEDURE sp_create_contact_request(
    IN p_customer_name VARCHAR(100),
    IN p_mobile_number VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_message TEXT,
    IN p_selected_sculpture_ids JSON,
    IN p_request_type VARCHAR(20)
)
BEGIN
    INSERT INTO contact_requests (
        customer_name, mobile_number, email, message, 
        selected_sculpture_ids, request_type
    ) VALUES (
        p_customer_name, p_mobile_number, p_email, p_message,
        p_selected_sculpture_ids, IFNULL(p_request_type, 'inquiry')
    );
    
    SELECT LAST_INSERT_ID() AS id, 'Contact request submitted successfully' AS message;
END//

-- SP: Get All Contact Requests (Admin)
DROP PROCEDURE IF EXISTS sp_get_contact_requests//
CREATE PROCEDURE sp_get_contact_requests(
    IN p_status VARCHAR(20),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    DECLARE v_limit INT DEFAULT 50;
    DECLARE v_offset INT DEFAULT 0;
    
    SET v_limit = IFNULL(p_limit, 50);
    SET v_offset = IFNULL(p_offset, 0);
    
    SELECT 
        id,
        customer_name,
        mobile_number,
        email,
        message,
        selected_sculpture_ids,
        request_type,
        status,
        admin_notes,
        created_at,
        updated_at
    FROM contact_requests
    WHERE (p_status IS NULL OR status = p_status)
    ORDER BY created_at DESC
    LIMIT v_limit
    OFFSET v_offset;
END//

-- SP: Update Contact Request Status
DROP PROCEDURE IF EXISTS sp_update_contact_request_status//
CREATE PROCEDURE sp_update_contact_request_status(
    IN p_id INT,
    IN p_status VARCHAR(20),
    IN p_admin_notes TEXT
)
BEGIN
    UPDATE contact_requests 
    SET 
        status = p_status,
        admin_notes = IFNULL(p_admin_notes, admin_notes)
    WHERE id = p_id;
    
    SELECT ROW_COUNT() AS affected_rows, 'Status updated successfully' AS message;
END//

-- ============================================
-- CUSTOM REQUEST PROCEDURES
-- ============================================

-- SP: Create Custom Sculpture Request
DROP PROCEDURE IF EXISTS sp_create_custom_request//
CREATE PROCEDURE sp_create_custom_request(
    IN p_customer_name VARCHAR(100),
    IN p_mobile_number VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_reference_image_url VARCHAR(500),
    IN p_sculpture_type VARCHAR(100),
    IN p_preferred_material VARCHAR(100),
    IN p_expected_height VARCHAR(50),
    IN p_expected_width VARCHAR(50),
    IN p_expected_depth VARCHAR(50),
    IN p_expected_price DECIMAL(12,2),
    IN p_description TEXT,
    IN p_special_requirements TEXT
)
BEGIN
    INSERT INTO custom_requests (
        customer_name, mobile_number, email, reference_image_url,
        sculpture_type, preferred_material, expected_height, expected_width,
        expected_depth, expected_price, description, special_requirements
    ) VALUES (
        p_customer_name, p_mobile_number, p_email, p_reference_image_url,
        p_sculpture_type, p_preferred_material, p_expected_height, p_expected_width,
        p_expected_depth, p_expected_price, p_description, p_special_requirements
    );
    
    SELECT LAST_INSERT_ID() AS id, 'Custom request submitted successfully' AS message;
END//

-- SP: Get All Custom Requests (Admin)
DROP PROCEDURE IF EXISTS sp_get_custom_requests//
CREATE PROCEDURE sp_get_custom_requests(
    IN p_status VARCHAR(20),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    DECLARE v_limit INT DEFAULT 50;
    DECLARE v_offset INT DEFAULT 0;
    
    SET v_limit = IFNULL(p_limit, 50);
    SET v_offset = IFNULL(p_offset, 0);
    
    SELECT 
        id,
        customer_name,
        mobile_number,
        email,
        reference_image_url,
        sculpture_type,
        preferred_material,
        expected_height,
        expected_width,
        expected_depth,
        expected_price,
        description,
        special_requirements,
        status,
        quoted_price,
        estimated_days,
        admin_notes,
        created_at,
        updated_at
    FROM custom_requests
    WHERE (p_status IS NULL OR status = p_status)
    ORDER BY created_at DESC
    LIMIT v_limit
    OFFSET v_offset;
END//

-- SP: Update Custom Request (Admin)
DROP PROCEDURE IF EXISTS sp_update_custom_request//
CREATE PROCEDURE sp_update_custom_request(
    IN p_id INT,
    IN p_status VARCHAR(20),
    IN p_quoted_price DECIMAL(12,2),
    IN p_estimated_days INT,
    IN p_admin_notes TEXT
)
BEGIN
    UPDATE custom_requests 
    SET 
        status = IFNULL(p_status, status),
        quoted_price = IFNULL(p_quoted_price, quoted_price),
        estimated_days = IFNULL(p_estimated_days, estimated_days),
        admin_notes = IFNULL(p_admin_notes, admin_notes)
    WHERE id = p_id;
    
    SELECT ROW_COUNT() AS affected_rows, 'Custom request updated successfully' AS message;
END//

-- ============================================
-- ADMIN & SETTINGS PROCEDURES
-- ============================================

-- SP: Admin Login
DROP PROCEDURE IF EXISTS sp_admin_login//
CREATE PROCEDURE sp_admin_login(
    IN p_username VARCHAR(50),
    IN p_password_hash VARCHAR(255)
)
BEGIN
    DECLARE v_user_id INT;
    
    SELECT id INTO v_user_id 
    FROM admin_users 
    WHERE username = p_username 
        AND password_hash = p_password_hash 
        AND is_active = 1;
    
    IF v_user_id IS NOT NULL THEN
        UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = v_user_id;
        
        SELECT 
            id,
            username,
            full_name,
            'Login successful' AS message,
            1 AS success
        FROM admin_users WHERE id = v_user_id;
    ELSE
        SELECT 
            NULL AS id,
            NULL AS username,
            NULL AS full_name,
            'Invalid credentials' AS message,
            0 AS success;
    END IF;
END//

-- SP: Get Site Settings
DROP PROCEDURE IF EXISTS sp_get_site_settings//
CREATE PROCEDURE sp_get_site_settings()
BEGIN
    SELECT 
        setting_key,
        setting_value,
        setting_type,
        description
    FROM site_settings;
END//

-- SP: Update Site Setting
DROP PROCEDURE IF EXISTS sp_update_site_setting//
CREATE PROCEDURE sp_update_site_setting(
    IN p_setting_key VARCHAR(100),
    IN p_setting_value TEXT
)
BEGIN
    INSERT INTO site_settings (setting_key, setting_value)
    VALUES (p_setting_key, p_setting_value)
    ON DUPLICATE KEY UPDATE setting_value = p_setting_value;
    
    SELECT 'Setting updated successfully' AS message;
END//

-- SP: Get Payment Info
DROP PROCEDURE IF EXISTS sp_get_payment_info//
CREATE PROCEDURE sp_get_payment_info()
BEGIN
    SELECT 
        id,
        payment_type,
        display_name,
        upi_id,
        qr_code_url,
        mobile_number,
        bank_name,
        account_number,
        ifsc_code,
        account_holder_name,
        display_order
    FROM payment_info 
    WHERE is_active = 1
    ORDER BY display_order ASC;
END//

-- SP: Dashboard Stats (Admin)
DROP PROCEDURE IF EXISTS sp_get_dashboard_stats//
CREATE PROCEDURE sp_get_dashboard_stats()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM sculptures WHERE is_active = 1) AS total_sculptures,
        (SELECT COUNT(*) FROM sculptures WHERE is_active = 1 AND is_featured = 1) AS featured_sculptures,
        (SELECT COUNT(*) FROM categories WHERE is_active = 1) AS total_categories,
        (SELECT COUNT(*) FROM contact_requests WHERE status = 'pending') AS pending_inquiries,
        (SELECT COUNT(*) FROM custom_requests WHERE status = 'pending') AS pending_custom_requests,
        (SELECT SUM(view_count) FROM sculptures) AS total_views;
END//

DELIMITER ;

SELECT 'All stored procedures created successfully!' AS Status;
