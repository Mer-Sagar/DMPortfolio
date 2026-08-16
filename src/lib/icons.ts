import {
  ArrowRight,
  Briefcase,
  Building2,
  Calculator,
  LineChart,
  FileText,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  "file-text": FileText,
  shield: Shield,
  calculator: Calculator,
  landmark: Landmark,
  chart: LineChart,
  building: Building2,
  sparkles: Sparkles,
  "arrow-right": ArrowRight,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
};

export function getIcon(name?: string): LucideIcon {
  if (!name) return Briefcase;
  return icons[name] ?? Briefcase;
}
