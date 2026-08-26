export type InquiryType =
  | "product"
  | "custom-fabrication"
  | "equipment-requirement"
  | "general";

export interface InquiryFormData {
  inquiryType: InquiryType;
  selectedProduct: string;
  name: string;
  phone: string;
  email: string;
  requirement: string;
  additionalDetails?: string;
}

export interface InquiryFormErrors {
  name?: string;
  phone?: string;
  email?: string;
  requirement?: string;
  selectedProduct?: string;
}

export interface ContactFaqItem {
  id: string;
  question: string;
  answer: string;
}
