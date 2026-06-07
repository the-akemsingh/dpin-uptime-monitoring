import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "../components/ui/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pingsy.akemnoorsingh.xyz"),
  title: {
    default: "Pingsy — Real-time Website Uptime Monitoring",
    template: "%s | Pingsy",
  },
  description:
    "Pingsy monitors your websites 24/7 and alerts you instantly when downtime is detected. Fast, reliable, and decentralized uptime monitoring you can trust.",
  keywords: [
    "uptime monitoring",
    "website monitoring",
    "downtime alerts",
    "site reliability",
    "Pingsy",
    "real-time monitoring",
  ],
  authors: [{ name: "Pingsy" }],
  creator: "Pingsy",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Pingsy",
    title: "Pingsy — Real-time Website Uptime Monitoring",
    description:
      "Monitor your websites 24/7. Get instant alerts when downtime is detected. Fast, reliable, and decentralized.",
    images: [
      {
        url: "https://pingsy.akemnoorsingh.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pingsy — Real-time Website Uptime Monitoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pingsy — Real-time Website Uptime Monitoring",
    description:
      "Monitor your websites 24/7. Get instant alerts when downtime is detected.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white dark:bg-[#0a0a0a] transition-colors duration-300`}>
        <ThemeProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          >
            {children}
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
