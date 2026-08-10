import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-src",
  display: "swap",
});

export const metadata: Metadata = {
  title: "King Owusu — IT Support Specialist & Cybersecurity Analyst",
  description:
    "King Owusu is an IT support specialist and cybersecurity analyst based in Houston, TX — SkillsUSA Texas State Champion in Cybersecurity, GIAC & CompTIA Security+ certified, now extending into applied AI.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "King Owusu — IT Support Specialist & Cybersecurity Analyst",
    description:
      "SkillsUSA Texas State Champion in Cybersecurity. GIAC & CompTIA Security+ certified. Building toward applied AI.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body
        className="font-body antialiased selection:bg-signal-soft"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
