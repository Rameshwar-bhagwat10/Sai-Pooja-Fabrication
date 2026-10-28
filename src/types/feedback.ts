export type FeedbackStatus = "pending" | "approved" | "rejected";

export interface StoredFeedback {
  id: string;
  productSlug: string;
  productName: string;
  customerName: string;
  customerLocation: string;
  customerPhone?: string;
  tractorModel?: string;
  soilType?: string;
  usageDuration?: string;
  rating: number; // 1 to 5
  durabilityRating?: number; // 1 to 5
  performanceRating?: number; // 1 to 5
  serviceRating?: number; // 1 to 5
  headline: string;
  comment: string;
  tags: string[];
  isVerifiedFarmer: boolean;
  status: FeedbackStatus;
  isFeatured: boolean;
  adminReply?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeedbackInput {
  productSlug: string;
  productName: string;
  customerName: string;
  customerLocation: string;
  customerPhone?: string;
  tractorModel?: string;
  soilType?: string;
  usageDuration?: string;
  rating: number;
  durabilityRating?: number;
  performanceRating?: number;
  serviceRating?: number;
  headline: string;
  comment: string;
  tags?: string[];
  isVerifiedFarmer?: boolean;
}

export interface FeedbackStats {
  averageRating: number;
  totalCount: number;
  approvedCount: number;
  ratingDistribution: Record<number, number>;
  verifiedFarmerCount: number;
}
