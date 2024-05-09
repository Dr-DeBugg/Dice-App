import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/ui/navbar";
import { Toaster } from "@/components/shadcn/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
