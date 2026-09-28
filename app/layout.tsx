import type { Metadata } from "next";
import { Azeret_Mono } from "next/font/google";
import "./globals.css";

// Single typeface for the entire site — locked design decision, do not add a second family.
const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-azeret",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aswin Binu — AI/ML Engineer",
  description:
    "Handcrafted portfolio of Aswin Binu. Third-year AI/ML engineering student focused on defense and critical systems.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={azeret.variable}>
      <body>{children}</body>
    </html>
  );
}
