import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us - Learning made easy",
};

export default function PartnerWithUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
