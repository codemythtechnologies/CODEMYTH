import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { ModalsProvider } from "@/context/ModalsContext";

// Same two typefaces as the old <link href="fonts.googleapis.com/...">
// tag, now self-hosted at build time by next/font (faster, no render-blocking
// request to Google, and nothing to leak to a third party on every load).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-family",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-family",
  display: "swap",
});

export const metadata = {
  title: "Code Myth Technologies — Building legendary code for the modern web",
  description:
    "Remote IT services company delivering full stack web apps, AI-powered solutions, and custom software — fast, clean, production-ready.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://codemyth.example.com"),
  openGraph: {
    title: "Code Myth Technologies",
    description:
      "Remote IT services company delivering full stack web apps, AI-powered solutions, and custom software.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <ToastProvider>
          <AuthProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
