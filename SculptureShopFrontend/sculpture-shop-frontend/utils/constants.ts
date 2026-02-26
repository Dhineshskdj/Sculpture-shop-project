// ============================================
// Application Constants
// ============================================

// Shop Information
export const SHOP_INFO = {
  name: "Dhinesh Sculpture Shop",
  owner: "Selvaraj",
  ownerSon: "Dhinesh",
  phone1: "9159948127",
  phone2: "9150235455",
  whatsappNumber: "919159948127",
  email: "selvaraj2031974@gmail.com",
  address: "Tamil Nadu, India",
  googleMapsLink: "https://maps.app.goo.gl/RGnbEj7evrabmL3PA",
  workingHours: "Monday - Saturday: 9:00 AM - 7:00 PM",
};

// Navigation Links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/sculptures", label: "Sculptures" },
  { href: "/categories", label: "Categories" },
  { href: "/custom-order", label: "Custom Order" },
  { href: "/contact", label: "Contact" },
  { href: "/payment", label: "Payment" },
];

// Admin Navigation Links
export const ADMIN_NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/sculptures", label: "Sculptures" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/custom-requests", label: "Custom Requests" },
  { href: "/admin/settings", label: "Settings" },
];

// Price Range Options
export const PRICE_RANGES = [
  { label: "All Prices", min: undefined, max: undefined },
  { label: "Under ₹25,000", min: 0, max: 25000 },
  { label: "₹25,000 - ₹50,000", min: 25000, max: 50000 },
  { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
  { label: "Above ₹1,00,000", min: 100000, max: undefined },
];

// Sort Options
export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

// Request Status Options
export const REQUEST_STATUS = {
  pending: { label: "Pending", color: "yellow" },
  contacted: { label: "Contacted", color: "blue" },
  completed: { label: "Completed", color: "green" },
  cancelled: { label: "Cancelled", color: "red" },
};

// Custom Request Status Options
export const CUSTOM_REQUEST_STATUS = {
  pending: { label: "Pending", color: "yellow" },
  reviewed: { label: "Reviewed", color: "blue" },
  quoted: { label: "Quoted", color: "purple" },
  accepted: { label: "Accepted", color: "green" },
  in_progress: { label: "In Progress", color: "orange" },
  completed: { label: "Completed", color: "green" },
  cancelled: { label: "Cancelled", color: "red" },
};

// Default Pagination
export const DEFAULT_PAGE_SIZE = 12;

// Image Upload Settings
export const IMAGE_SETTINGS = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  acceptedFormats: ["image/jpeg", "image/png", "image/webp"],
  maxDimensions: { width: 2000, height: 2000 },
};

// SEO Default Values
export const SEO_DEFAULTS = {
  title: "Dhinesh Sculpture Shop - Handcrafted Sculptures",
  description:
    "Explore our collection of handcrafted sculptures including God statues, custom sculptures, and memorial pieces. Quality craftsmanship from Tamil Nadu, India.",
  keywords: [
    "sculpture shop",
    "god statues",
    "custom sculptures",
    "stone sculptures",
    "marble statues",
    "tamil nadu",
    "handcrafted",
    "granite sculptures",
  ],
};
