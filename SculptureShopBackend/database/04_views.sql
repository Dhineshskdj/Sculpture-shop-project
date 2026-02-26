-- ============================================
-- Dhinesh Sculpture Shop - Views
-- ============================================

USE sculptureShop;

-- ============================================
-- View: Sculpture List with Details
-- ============================================
CREATE OR REPLACE VIEW vw_sculptures_with_details AS
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
    s.is_active,
    s.view_count,
    s.created_at,
    s.updated_at,
    c.id AS category_id,
    c.name AS category_name,
    m.id AS material_id,
    m.name AS material_name,
    (SELECT image_url FROM sculpture_images si WHERE si.sculpture_id = s.id AND si.is_primary = 1 LIMIT 1) AS primary_image,
    (SELECT COUNT(*) FROM sculpture_images si WHERE si.sculpture_id = s.id) AS image_count
FROM sculptures s
LEFT JOIN categories c ON s.category_id = c.id
LEFT JOIN materials m ON s.material_id = m.id;

-- ============================================
-- View: Active Sculptures for Public Display
-- ============================================
CREATE OR REPLACE VIEW vw_public_sculptures AS
SELECT 
    s.id,
    s.name,
    s.slug,
    s.description,
    s.dimensions,
    s.price,
    s.is_featured,
    s.is_available,
    c.name AS category_name,
    m.name AS material_name,
    (SELECT image_url FROM sculpture_images si WHERE si.sculpture_id = s.id AND si.is_primary = 1 LIMIT 1) AS primary_image
FROM sculptures s
LEFT JOIN categories c ON s.category_id = c.id AND c.is_active = 1
LEFT JOIN materials m ON s.material_id = m.id AND m.is_active = 1
WHERE s.is_active = 1;

-- ============================================
-- View: Category with Sculpture Count
-- ============================================
CREATE OR REPLACE VIEW vw_categories_with_count AS
SELECT 
    c.id,
    c.name,
    c.description,
    c.image_url,
    c.display_order,
    c.is_active,
    COUNT(s.id) AS sculpture_count
FROM categories c
LEFT JOIN sculptures s ON c.id = s.category_id AND s.is_active = 1
GROUP BY c.id, c.name, c.description, c.image_url, c.display_order, c.is_active;

-- ============================================
-- View: Recent Contact Requests
-- ============================================
CREATE OR REPLACE VIEW vw_recent_contact_requests AS
SELECT 
    cr.id,
    cr.customer_name,
    cr.mobile_number,
    cr.email,
    cr.message,
    cr.request_type,
    cr.status,
    cr.created_at,
    JSON_LENGTH(cr.selected_sculpture_ids) AS sculpture_count
FROM contact_requests cr
ORDER BY cr.created_at DESC
LIMIT 100;

-- ============================================
-- View: Recent Custom Requests
-- ============================================
CREATE OR REPLACE VIEW vw_recent_custom_requests AS
SELECT 
    id,
    customer_name,
    mobile_number,
    sculpture_type,
    preferred_material,
    expected_price,
    status,
    quoted_price,
    created_at
FROM custom_requests
ORDER BY created_at DESC
LIMIT 100;

-- ============================================
-- View: Price Range Summary
-- ============================================
CREATE OR REPLACE VIEW vw_price_summary AS
SELECT 
    MIN(price) AS min_price,
    MAX(price) AS max_price,
    AVG(price) AS avg_price,
    COUNT(*) AS total_sculptures
FROM sculptures
WHERE is_active = 1;

SELECT 'All views created successfully!' AS Status;
