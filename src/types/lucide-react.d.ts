declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const LayoutDashboard: LucideIcon;
  export const Package: LucideIcon;
  export const Inbox: LucideIcon;
  export const Image: LucideIcon;
  export const Settings: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const LogOut: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const Plus: LucideIcon;
  export const Search: LucideIcon;
  export const Edit2: LucideIcon;
  export const Edit3: LucideIcon;
  export const Trash2: LucideIcon;
  export const Star: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const Filter: LucideIcon;
  export const Save: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Phone: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const Clock: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const Lock: LucideIcon;
  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const Sparkles: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Check: LucideIcon;
  export const Wrench: LucideIcon;
  export const Calendar: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Maximize2: LucideIcon;
  export const Tractor: LucideIcon;
  export const Loader2: LucideIcon;
  export const Shield: LucideIcon;
  export const Award: LucideIcon;
  export const Users: LucideIcon;
  export const Compass: LucideIcon;
  export const Layers: LucideIcon;
  export const PenTool: LucideIcon;
  export const CheckCheck: LucideIcon;
  export const Info: LucideIcon;

  const icons: { [key: string]: LucideIcon };
  export default icons;
}
