import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Epilogue, Plus_Jakarta_Sans, Geist, Geist_Mono, Afacad, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AppWrapper from "@/components/shared/AppWrapper";
import { MigrationGuard } from "@/components/shared/MigrationGuard";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const akira = localFont({
  src: "../../public/fonts/Akira.otf",
  variable: "--font-akira",
});

const aonic = localFont({
  src: "../../public/fonts/Aonic.ttf",
  variable: "--font-aonic",
});

const urbanosta = localFont({
  src: "../../public/fonts/Urbanosta.otf",
  variable: "--font-urbanosta",
});

const minecraft = localFont({
  src: "../../public/fonts/Minecraft.ttf",
  variable: "--font-minecraft",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "CYNTROL",
  description: "High-fidelity student dashboard with Kinetic Thermography",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CYNTROL",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="color-scheme" content="dark light" />
      </head>

      <body
        className={`
          antialiased
          bg-theme-bg
          h-full
          min-h-screen
          ${epilogue.variable}
          ${jakarta.variable}
        `}
      >
        <AppProvider>
          <ThemeProvider>
            <MigrationGuard>
              <AppWrapper>
                {children}
              </AppWrapper>
            </MigrationGuard>
          </ThemeProvider>
        </AppProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

