-- ============================================
-- Dhinesh Sculpture Shop - Table Creation
-- ============================================

USE sculptureShop;

-- ============================================
-- 1. Categories Table
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    is_active TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- 2. Materials Table
-- ============================================
CREATE TABLE IF NOT EXISTS materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- 3. Sculptures Table (Main Product Table)
-- ============================================
CREATE TABLE IF NOT EXISTS sculptures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INT,
    material_id INT,
    description TEXT,
    dimensions VARCHAR(100),
    height_cm DECIMAL(10,2),
    width_cm DECIMAL(10,2),
    depth_cm DECIMAL(10,2),
    weight_kg DECIMAL(10,2),
    price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    is_featured TINYINT(1) DEFAULT 0,
    is_available TINYINT(1) DEFAULT 1,
    is_active TINYINT(1) DEFAULT 1,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_material (material_id),
    INDEX idx_price (price),
    INDEX idx_featured (is_featured),
    INDEX idx_active (is_active),
    FULLTEXT INDEX ft_search (name, description)
) ENGINE=InnoDB;

-- ============================================
-- 4. Sculpture Images Table
-- ============================================
CREATE TABLE IF NOT EXISTS sculpture_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sculpture_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    is_primary TINYINT(1) DEFAULT 0,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sculpture_id) REFERENCES sculptures(id) ON DELETE CASCADE,
    INDEX idx_sculpture (sculpture_id)
) ENGINE=InnoDB;

-- ============================================
-- 5. Contact Requests Table
-- ============================================
CREATE TABLE IF NOT EXISTS contact_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    message TEXT,
    selected_sculpture_ids JSON,
    request_type ENUM('general', 'inquiry', 'quotation') DEFAULT 'inquiry',
    status ENUM('pending', 'contacted', 'completed', 'cancelled') DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_mobile (mobile_number)
) ENGINE=InnoDB;

-- ============================================
-- 6. Custom Sculpture Requests Table
-- ============================================
CREATE TABLE IF NOT EXISTS custom_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    reference_image_url VARCHAR(500),
    sculpture_type VARCHAR(100),
    preferred_material VARCHAR(100),
    expected_height VARCHAR(50),
    expected_width VARCHAR(50),
    expected_depth VARCHAR(50),
    expected_price DECIMAL(12,2),
    description TEXT,
    special_requirements TEXT,
    status ENUM('pending', 'reviewed', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    quoted_price DECIMAL(12,2),
    estimated_days INT,
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_mobile (mobile_number)
) ENGINE=InnoDB;

-- ============================================
-- 7. Admin Users Table (Simple Admin Access)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    is_active TINYINT(1) DEFAULT 1,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- 8. Site Settings Table
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type ENUM('text', 'number', 'boolean', 'json', 'image') DEFAULT 'text',
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- 9. Payment Info Table
-- ============================================
CREATE TABLE IF NOT EXISTS payment_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_type ENUM('upi', 'bank', 'gpay', 'phonepe', 'paytm') NOT NULL,
    display_name VARCHAR(100),
    upi_id VARCHAR(100),
    qr_code_url VARCHAR(500),
    mobile_number VARCHAR(20),
    bank_name VARCHAR(100),
    account_number VARCHAR(50),
    ifsc_code VARCHAR(20),
    account_holder_name VARCHAR(100),
    is_active TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Confirm tables created
SELECT 'All tables created successfully!' AS Status;
