import * as React from "react";

export interface HeroContentProps {
  children?: React.ReactNode;
}

export function HeroContent({ children }: HeroContentProps) {
  return <div className="flex flex-col gap-6 max-w-2xl">{children}</div>;
}
