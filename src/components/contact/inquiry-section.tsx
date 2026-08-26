"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { type InquiryFormData, type InquiryFormErrors, type InquiryType } from "@/types/contact";
import { ALL_PRODUCTS } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { InquiryTypeSelector } from "./inquiry-type-selector";
import { InquiryForm } from "./inquiry-form";
import { InquirySuccess } from "./inquiry-success";

export function InquirySection() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const typeParam = searchParams.get("type");

  // Determine initial inquiry type and product from query parameters safely
  const initialType: InquiryType = React.useMemo(() => {
    if (typeParam === "custom-fabrication") return "custom-fabrication";
    if (typeParam === "equipment-requirement") return "equipment-requirement";
    if (typeParam === "general") return "general";
    if (productParam) return "product";
    return "general";
  }, [typeParam, productParam]);

  const initialProduct = React.useMemo(() => {
    if (!productParam) return "";
    const matched = ALL_PRODUCTS.find(
      (p) =>
        p.slug.toLowerCase() === productParam.toLowerCase() ||
        p.name.toLowerCase().includes(productParam.toLowerCase()) ||
        productParam.toLowerCase().includes(p.slug.toLowerCase())
    );
    return matched ? matched.name : "";
  }, [productParam]);

  const [inquiryType, setInquiryType] = React.useState<InquiryType>(initialType);
  const [formData, setFormData] = React.useState<InquiryFormData>({
    inquiryType: initialType,
    selectedProduct: initialProduct,
    name: "",
    phone: "",
    email: "",
    requirement: "",
    additionalDetails: "",
  });

  const [errors, setErrors] = React.useState<InquiryFormErrors>({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Sync state if query params change
  React.useEffect(() => {
    if (typeParam === "custom-fabrication") {
      setInquiryType("custom-fabrication");
      setFormData((prev) => ({ ...prev, inquiryType: "custom-fabrication" }));
    } else if (productParam && initialProduct) {
      setInquiryType("product");
      setFormData((prev) => ({
        ...prev,
        inquiryType: "product",
        selectedProduct: initialProduct,
      }));
    }
  }, [typeParam, productParam, initialProduct]);

  const handleTypeChange = (type: InquiryType) => {
    setInquiryType(type);
    setFormData((prev) => ({ ...prev, inquiryType: type }));
    setErrors((prev) => ({ ...prev, selectedProduct: undefined }));
  };

  const handleFieldChange = (field: keyof InquiryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof InquiryFormErrors]) {
      setErrors((prev) => ({ ...prev, [field as keyof InquiryFormErrors]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: InquiryFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (formData.phone.replace(/[^0-9]/g, "").length < 8) {
      newErrors.phone = "Please enter a valid phone number (at least 8 digits).";
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.requirement.trim()) {
      newErrors.requirement = "Please describe your requirement or farm details.";
    }

    if (inquiryType === "product" && !formData.selectedProduct) {
      newErrors.selectedProduct = "Please select an implement from the catalogue.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <Section surface="forest-900" spacing="default" hasGridPattern isDarkSurface>
      <Container size="narrow">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Interactive Inquiry"
          title="WHAT CAN WE HELP YOU WITH?"
          description="Select your requirement category below to prepare an immediate technical inquiry."
          isDarkSurface
        />

        <div className="mt-12 p-6 sm:p-10 rounded-[20px] bg-[#151A17] border border-white/10 shadow-2xl">
          {isSubmitted ? (
            <InquirySuccess formData={formData} onReset={handleReset} />
          ) : (
            <div className="flex flex-col gap-8">
              {/* Step 1: Inquiry Type Selector */}
              <InquiryTypeSelector
                selectedType={inquiryType}
                onSelectType={handleTypeChange}
              />

              {/* Step 2 & 3: Dynamic Form */}
              <InquiryForm
                inquiryType={inquiryType}
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
