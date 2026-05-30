import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AswalWebStudio | Professional Web Development & Custom Web Apps",
  description: "Request custom websites, eCommerce stores, and premium web applications. AswalWebStudio designs and builds software for businesses, startups, and individuals looking to scale.",
  metadataBase: new URL("https://aswalwebstudio.com"),
  keywords: ["web development agency", "custom web applications", "next.js agency", "website request", "eCommerce stores", "hire developers"],
  authors: [{ name: "AswalWebStudio" }],
  openGraph: {
    title: "AswalWebStudio | Professional Web Development",
    description: "Request custom websites, eCommerce stores, and premium web applications.",
    url: "https://aswalwebstudio.com",
    siteName: "AswalWebStudio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AswalWebStudio | Professional Web Development",
    description: "Request custom websites, eCommerce stores, and premium web applications.",
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
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('color-scheme');
                  var theme = 'dark'; // default
                  if (storedTheme) {
                    theme = storedTheme;
                  } else {
                    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    theme = systemTheme ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(theme);
                  document.documentElement.style.colorScheme = theme;
                  var meta = document.querySelector('meta[name="color-scheme"]');
                  if (meta) meta.content = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
