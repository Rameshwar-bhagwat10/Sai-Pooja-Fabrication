"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Fabrication", href: "/fabrication" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export interface NavbarProps {
  isTransparent?: boolean;
}

export function Navbar({ isTransparent = false }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const shouldBeDarkHero = isHome && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#10271D]/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3.5"
          : shouldBeDarkHero || isTransparent
          ? "bg-transparent py-5"
          : "bg-[#10271D]/95 backdrop-blur-sm border-b border-white/10 py-4"
      )}
    >
      <Container size="default">
        <div className="flex items-center justify-between">
          {/* Brand Logo with light/dark contrast */}
          <Logo variant="light" size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-small font-medium transition-colors duration-200 relative py-1 focus-ring rounded-[4px]",
                    isActive
                      ? "text-[#F4F1E8] font-semibold"
                      : "text-[#D8D9D3]/80 hover:text-white"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8913D] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="amber"
              size="sm"
              showArrow
              onClick={() => {
                router.push("/contact");
              }}
            >
              CONTACT US
            </Button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 rounded-[8px] text-[#F4F1E8] hover:bg-white/10 focus-ring"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navItems={NAV_ITEMS}
        currentPath={pathname}
      />
    </header>
  );
}
