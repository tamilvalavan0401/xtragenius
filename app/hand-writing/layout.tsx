import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Math - Learning made easy",
};

export default function VedicMathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
