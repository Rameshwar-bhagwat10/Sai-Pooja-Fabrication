import * as React from "react";

export interface HeroMediaProps {
  children?: React.ReactNode;
}

export function HeroMedia({ children }: HeroMediaProps) {
  return <div className="relative w-full rounded-[16px] overflow-hidden">{children}</div>;
}
