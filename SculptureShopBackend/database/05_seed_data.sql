-- ============================================
-- Dhinesh Sculpture Shop - Seed Data
-- ============================================

USE sculptureShop;

-- ============================================
-- Insert Default Admin User
-- Password: admin123 (SHA256 hash)
-- ============================================
INSERT INTO admin_users (username, password_hash, full_name) VALUES
('admin', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Dhinesh Selvaraj')
ON DUPLICATE KEY UPDATE full_name = 'Dhinesh Selvaraj';

-- ============================================
-- Insert Categories
-- ============================================
INSERT INTO categories (name, description, display_order) VALUES
('God Statues', 'Beautiful statues of Hindu deities and gods', 1),
('Custom Work', 'Personalized sculptures made to your specifications', 2),
('Stone Sculptures', 'Traditional stone carved sculptures', 3),
('Memorial Statues', 'Commemorative statues and busts', 4),
('Garden Sculptures', 'Outdoor sculptures for gardens and landscapes', 5),
('Temple Sculptures', 'Sculptures designed for temples and religious places', 6),
('Portrait Sculptures', 'Realistic portrait busts and figures', 7),
('Decorative Art', 'Decorative sculptures for home and office', 8)
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- ============================================
-- Insert Materials
-- ============================================
INSERT INTO materials (name, description) VALUES
('Granite', 'Durable natural stone with elegant finish'),
('Marble', 'Classic white and colored marble sculptures'),
('Sandstone', 'Traditional Indian sandstone carvings'),
('Black Stone', 'Premium black granite sculptures'),
('Bronze', 'Metal sculptures with antique finish'),
('Fiber', 'Lightweight fiber reinforced sculptures'),
('Cement', 'Durable cement-based sculptures'),
('Wood', 'Traditional wooden carvings')
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- ============================================
-- Insert Sample Sculptures
-- ============================================
INSERT INTO sculptures (name, slug, category_id, material_id, description, dimensions, height_cm, width_cm, depth_cm, weight_kg, price, is_featured, is_available) VALUES
('Lord Ganesha - Classic', 'lord-ganesha-classic', 1, 1, 'Beautiful granite statue of Lord Ganesha in sitting posture. Hand-carved with intricate details.', '60cm x 40cm x 30cm', 60, 40, 30, 45, 25000.00, 1, 1),
('Lord Shiva Nataraja', 'lord-shiva-nataraja', 1, 5, 'Majestic bronze statue of Lord Shiva in the cosmic dance pose. Perfect for temples and homes.', '90cm x 70cm x 25cm', 90, 70, 25, 35, 75000.00, 1, 1),
('Buddha Meditation', 'buddha-meditation', 1, 2, 'Serene white marble Buddha statue in meditation pose. Brings peace and tranquility.', '45cm x 30cm x 25cm', 45, 30, 25, 20, 35000.00, 1, 1),
('Temple Pillar Design', 'temple-pillar-design', 6, 1, 'Authentic temple pillar with traditional South Indian carvings. Suitable for temple construction.', '180cm x 30cm x 30cm', 180, 30, 30, 200, 150000.00, 0, 1),
('Garden Lion Pair', 'garden-lion-pair', 5, 7, 'Majestic cement lion pair for entrance gates. Weather resistant and durable.', '100cm x 50cm x 80cm each', 100, 50, 80, 150, 45000.00, 1, 1),
('Memorial Bust - Custom', 'memorial-bust-custom', 4, 2, 'Personalized memorial bust created from photographs. Premium marble finish.', '50cm x 30cm x 25cm', 50, 30, 25, 15, 55000.00, 0, 1),
('Saraswati Devi', 'saraswati-devi', 1, 1, 'Elegant granite statue of Goddess Saraswati with veena. Perfect for educational institutions.', '75cm x 45cm x 30cm', 75, 45, 30, 55, 45000.00, 1, 1),
('Lakshmi Devi Standing', 'lakshmi-devi-standing', 1, 5, 'Bronze statue of Goddess Lakshmi in standing pose with lotus.', '80cm x 35cm x 25cm', 80, 35, 25, 28, 65000.00, 0, 1),
('Abstract Garden Art', 'abstract-garden-art', 5, 3, 'Modern abstract sculpture for contemporary gardens. Sandstone with natural finish.', '120cm x 60cm x 40cm', 120, 60, 40, 80, 35000.00, 0, 1),
('Hanuman Flying', 'hanuman-flying', 1, 6, 'Dynamic fiber statue of Lord Hanuman in flying pose. Lightweight and detailed.', '150cm x 100cm x 50cm', 150, 100, 50, 25, 55000.00, 1, 1),
('Krishna with Flute', 'krishna-with-flute', 1, 2, 'White marble statue of Lord Krishna playing flute. Exquisite craftsmanship.', '70cm x 35cm x 25cm', 70, 35, 25, 30, 48000.00, 1, 1),
('Murugan with Vel', 'murugan-with-vel', 1, 1, 'Traditional granite statue of Lord Murugan with vel (spear). Tamil style carving.', '85cm x 40cm x 30cm', 85, 40, 30, 65, 58000.00, 0, 1);

-- ============================================
-- Insert Sculpture Images
-- ============================================
INSERT INTO sculpture_images (sculpture_id, image_url, alt_text, is_primary, display_order) VALUES
(1, '/images/sculptures/ganesha-1.jpg', 'Lord Ganesha Front View', 1, 1),
(1, '/images/sculptures/ganesha-2.jpg', 'Lord Ganesha Side View', 0, 2),
(2, '/images/sculptures/nataraja-1.jpg', 'Nataraja Front View', 1, 1),
(2, '/images/sculptures/nataraja-2.jpg', 'Nataraja Detail', 0, 2),
(3, '/images/sculptures/buddha-1.jpg', 'Buddha Meditation', 1, 1),
(4, '/images/sculptures/pillar-1.jpg', 'Temple Pillar', 1, 1),
(5, '/images/sculptures/lion-1.jpg', 'Garden Lion Pair', 1, 1),
(6, '/images/sculptures/bust-1.jpg', 'Memorial Bust Sample', 1, 1),
(7, '/images/sculptures/saraswati-1.jpg', 'Saraswati Devi', 1, 1),
(8, '/images/sculptures/lakshmi-1.jpg', 'Lakshmi Devi', 1, 1),
(9, '/images/sculptures/abstract-1.jpg', 'Abstract Garden Art', 1, 1),
(10, '/images/sculptures/hanuman-1.jpg', 'Hanuman Flying', 1, 1),
(11, '/images/sculptures/krishna-1.jpg', 'Krishna with Flute', 1, 1),
(12, '/images/sculptures/murugan-1.jpg', 'Murugan with Vel', 1, 1);

-- ============================================
-- Insert Payment Info
-- ============================================
INSERT INTO payment_info (payment_type, display_name, upi_id, qr_code_url, mobile_number, display_order) VALUES
('gpay', 'Google Pay', 'selvaraj2031974@okicici', '/images/gpay-qr.png', '9159948127', 1),
('upi', 'UPI Payment', 'selvaraj2031974@okicici', '/images/upi-qr.png', '9159948127', 2);

-- ============================================
-- Insert Site Settings
-- ============================================
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('shop_name', 'Dhinesh Sculpture Shop', 'text', 'Shop display name'),
('owner_name', 'Selvaraj', 'text', 'Shop owner name'),
('contact_number_1', '9159948127', 'text', 'Primary contact number'),
('contact_number_2', '9150235455', 'text', 'Secondary contact number'),
('email', 'selvaraj2031974@gmail.com', 'text', 'Contact email'),
('whatsapp_number', '919159948127', 'text', 'WhatsApp number with country code'),
('address', 'Tamil Nadu, India', 'text', 'Shop address'),
('google_maps_link', 'https://maps.app.goo.gl/RGnbEj7evrabmL3PA', 'text', 'Google Maps location link'),
('about_text', 'Dhinesh Sculpture Shop specializes in creating beautiful handcrafted sculptures. With years of experience, we create God statues, custom sculptures, and memorial pieces with exceptional craftsmanship.', 'text', 'About us text'),
('working_hours', 'Monday - Saturday: 9:00 AM - 7:00 PM', 'text', 'Working hours')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

SELECT 'Seed data inserted successfully!' AS Status;
