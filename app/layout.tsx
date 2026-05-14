import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Under Pressure",
    template: "%s | Under Pressure",
  },
  description:
    "Under Pressure is an evidence-informed reflection tool that helps users name pressure, notice outcome-dependent thinking, separate what is controllable from what is not fully controllable, and choose one grounded next step.",
  applicationName: "Under Pressure",
  keywords: [
    "Under Pressure",
    "reflection tool",
    "psychoeducational reflection",
    "pressure patterns",
    "outcome-dependent thinking",
    "grounded next step",
  ],
  authors: [{ name: "Under Pressure" }],
  creator: "Under Pressure",
  openGraph: {
    title: "Under Pressure",
    description:
      "An evidence-informed reflection tool for understanding pressure and choosing one grounded next step.",
    type: "website",
    siteName: "Under Pressure",
  },
  twitter: {
    card: "summary",
    title: "Under Pressure",
    description:
      "An evidence-informed reflection tool for understanding pressure and choosing one grounded next step.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}