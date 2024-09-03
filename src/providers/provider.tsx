"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

type BootstrapData = {
  distinctID: string;
  featureFlags: Record<string, string | boolean>;
};
type Props = {
  children: React.ReactNode;
  bootstrapData: BootstrapData;
};

export function PHProvider({ children, bootstrapData }: Props) {
  // 確認是否是在 browser 中運行
  if (typeof window !== "undefined") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "always", // identified_only// or 'always' to create profiles for anonymous users as well
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true, // Enable pageleave capture
      bootstrap: bootstrapData,
      loaded: function () {
        console.log("PostHog loaded");
      },
    });
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

// export function NextAuthSessionProvider({
//   children,
//   session,
// }: {
//   children: React.ReactNode;
//   session: Session | null;
// }) {
//   return <SessionProvider session={session}>{children}</SessionProvider>;
// }
