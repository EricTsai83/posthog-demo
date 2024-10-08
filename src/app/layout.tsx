import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PHProvider } from "@/providers/provider";
import Footer from "@/components/footer";
import CookieConsent from "@/components/cookie-consent";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import dynamic from "next/dynamic";
const PostHogPageView = dynamic(
  () => import("@/components/analytic/postHog-page-view"),
  {
    ssr: false,
  },
);
import { PreviousPathnameProvider } from "@/providers/previous-pathname-provider";
import { getBootstrapData } from "@/lib/get-bootstrap-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "posthog demo",
  description: "posthog demo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const bootstrapData = await getBootstrapData();

  return (
    <html lang="en">
      <PreviousPathnameProvider>
        <PHProvider bootstrapData={bootstrapData}>
          <body className={`${inter.className} min-h-dvh flex flex-col`}>
            <PostHogPageView session={session} />
            <Toaster position="top-center" />
            <Header />
            {children}
            <Footer />
            <CookieConsent variant="small" />
          </body>
        </PHProvider>
      </PreviousPathnameProvider>
    </html>
  );
}
