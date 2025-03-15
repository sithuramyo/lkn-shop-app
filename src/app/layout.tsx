import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider"
import Navbar from "@/components/common/navbar";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/react-query-provider";
import TopNavbar from "@/components/common/navbar_v2";

const padaukBold = localFont({
  src: "./fonts/Padauk-Bold.ttf",
  variable: "--font-padauk-bold",
  weight: "100 900"
})

const padaukRegular = localFont({
  src: "./fonts/Padauk-Regular.ttf",
  variable: "--font-padauk-regular",
  weight: "100 900"
})

export const metadata: Metadata = {
  title: "Lawkanat Thingan House",
  description: "All in one monk robes and accesssories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${padaukBold.variable} ${padaukRegular.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            {/*<Navbar />*/}
            <TopNavbar />
            <Toaster position="bottom-right" />
            <main>
              {children}
            </main>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
