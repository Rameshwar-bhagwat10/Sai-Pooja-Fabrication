export interface NavLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
  badge?: string;
}

export interface FooterSection {
  title: string;
  links: NavLinkItem[];
}
