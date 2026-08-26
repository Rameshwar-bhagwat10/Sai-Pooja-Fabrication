import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "brand" | "amber" | "light" | "neutral";
  showArrow?: boolean;
  isExternal?: boolean;
}

export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  (
    {
      className,
      href,
      variant = "brand",
      showArrow = true,
      isExternal = false,
      children,
      ...props
    },
    ref
  ) => {
    const isExternalLink = isExternal || href.startsWith("http");

    const content = (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-medium text-small group transition-colors duration-200 cursor-pointer",
          {
            "text-[#2F6B45] hover:text-[#173B2C]": variant === "brand",
            "text-[#C8913D] hover:text-[#e0a754]": variant === "amber",
            "text-[#F4F1E8] hover:text-white": variant === "light",
            "text-[#151A17] hover:text-[#2F6B45]": variant === "neutral",
          },
          className
        )}
      >
        <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-200 group-hover:after:w-full">
          {children}
        </span>
        {showArrow &&
          (isExternalLink ? (
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          ) : (
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          ))}
      </span>
    );

    if (isExternalLink) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex"
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link ref={ref} href={href} className="inline-flex" {...props}>
        {content}
      </Link>
    );
  }
);

TextLink.displayName = "TextLink";
