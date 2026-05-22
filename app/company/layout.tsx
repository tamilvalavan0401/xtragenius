import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company - Learning made easy",
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
