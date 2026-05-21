import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us - Learning made easy",
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
