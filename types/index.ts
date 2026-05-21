export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

export interface ProgramCard {
  title: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}
