import type React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";
import "./amplify-cognito-config";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider as AmplifyTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studio",
  description: "Upload a document and create summaries with custom images",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />

              <main className="flex-1">{children}</main>
              <Toaster position="top-right" richColors />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
