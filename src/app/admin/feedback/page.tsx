import * as React from "react";
import { getAllFeedbacks, getAllProducts } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { FeedbackManager } from "@/components/admin/feedback-manager";

export const dynamic = "force-dynamic";

export default async function AdminFeedbackPage() {
  const [feedbacks, products] = await Promise.all([
    getAllFeedbacks(),
    getAllProducts(),
  ]);

  return (
    <div>
      <AdminTopbar
        title="Farmer Reviews & Product Feedback"
        subtitle="Review, moderate, feature, and reply to authentic field feedback from tractor owners."
      />

      <FeedbackManager initialFeedbacks={feedbacks} products={products} />
    </div>
  );
}
