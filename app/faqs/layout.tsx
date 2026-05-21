import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ's - Learning made easy",
};

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
