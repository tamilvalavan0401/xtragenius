import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Home - Learning made easy",
  description:
    "Welcome to Xtragenius! We empower young learners to achieve academic success through proven abacus training and cognitive skills development. Unlock your child's math genius with our expert-led abacus courses for kids, designed to boost confidence and mental arithmetic skills.",
  icons: {
    icon: [
      { url: "/seo/favicon-32x32.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/seo/favicon-192x192.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    apple: { url: "/seo/apple-touch-icon.jpg" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
