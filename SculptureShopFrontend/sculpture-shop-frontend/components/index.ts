// ============================================
// Components Index - Export all components
// ============================================

// Layout Components
export { default as Header } from "./layout/Header";
export { default as Footer } from "./layout/Footer";

// UI Components
export { default as SculptureCard } from "./ui/SculptureCard";
export { default as SearchFilter } from "./ui/SearchFilter";
export { default as ImageGallery } from "./ui/ImageGallery";
export { default as Button } from "./ui/Button";
export { default as Modal } from "./ui/Modal";
export { default as WhatsAppButton } from "./ui/WhatsAppButton";

// Form Components
export { TextInput, TextArea, SelectInput, Checkbox, NumberInput } from "./ui/FormInputs";

// Loading Components
export {
  PageLoader,
  Spinner,
  Skeleton,
  SculptureCardSkeleton,
  SculptureGridSkeleton,
  TableSkeleton,
  DetailPageSkeleton,
} from "./ui/Loading";
