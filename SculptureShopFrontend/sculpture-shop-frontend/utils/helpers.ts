// ============================================
// Utility Functions
// ============================================

// Format price in Indian Rupees
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Format date to readable format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

// Format date with time
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Generate slug from string
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Validate mobile number (Indian format)
export const validateMobileNumber = (mobile: string): boolean => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile.replace(/\s/g, ""));
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get placeholder image URL
export const getPlaceholderImage = (width: number = 400, height: number = 300): string => {
  return `https://placehold.co/${width}x${height}/e2e8f0/64748b?text=No+Image`;
};

// Format dimensions
export const formatDimensions = (height?: number, width?: number, depth?: number): string => {
  if (!height && !width && !depth) return "Dimensions not specified";
  const parts = [];
  if (height) parts.push(`H: ${height}cm`);
  if (width) parts.push(`W: ${width}cm`);
  if (depth) parts.push(`D: ${depth}cm`);
  return parts.join(" × ");
};

// Format weight
export const formatWeight = (weight?: number): string => {
  if (!weight) return "Weight not specified";
  return `${weight} kg`;
};

// Get WhatsApp URL with pre-filled message
export const getWhatsAppUrl = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  // Remove any non-numeric characters from phone number
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};

// Generate WhatsApp message for sculpture inquiry
export const generateSculptureInquiryMessage = (
  customerName: string,
  mobileNumber: string,
  sculptures: { id: number; name: string; price: number }[],
): string => {
  const sculptureList = sculptures.map((s, i) => `${i + 1}. ${s.name} - ${formatPrice(s.price)}`).join("\n");

  return `Hello! I'm interested in the following sculptures:

${sculptureList}

*Customer Details:*
Name: ${customerName}
Mobile: ${mobileNumber}

Please provide more information and availability.`;
};

// Generate WhatsApp message for custom request
export const generateCustomRequestMessage = (
  customerName: string,
  mobileNumber: string,
  sculptureType: string,
  material: string,
  dimensions: string,
  budget: string,
  description: string,
): string => {
  return `Hello! I would like to request a custom sculpture.

*Customer Details:*
Name: ${customerName}
Mobile: ${mobileNumber}

*Sculpture Requirements:*
Type: ${sculptureType}
Material: ${material}
Dimensions: ${dimensions}
Budget: ${budget}

*Description:*
${description}

Please contact me to discuss further.`;
};

// Debounce function
export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

// Scroll to top
export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Check if running on client side
export const isClient = (): boolean => {
  return typeof window !== "undefined";
};

// Local storage helpers
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (!isClient()) return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    if (!isClient()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },
  remove: (key: string): void => {
    if (!isClient()) return;
    localStorage.removeItem(key);
  },
};
