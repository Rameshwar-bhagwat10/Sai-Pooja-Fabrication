import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";

export interface CapabilityCardProps {
  category: string;
  title: string;
  description: string;
}

export function CapabilityCard({ category, title, description }: CapabilityCardProps) {
  return (
    <Card variant="feature">
      <CardHeader>
        <Eyebrow variant="amber">{category}</Eyebrow>
        <CardTitle className="mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
