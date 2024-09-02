"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useFeatureFlagVariantKey, usePostHog } from "posthog-js/react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function MainCtaButton({ className }: { className?: string }) {
  const [ctaState, setCtaState] = useState<string | null>("Get Started");

  const posthog = usePostHog();
  // posthog.featureFlags.override({ "main-cta": "test" });

  useEffect(() => {
    if (posthog.getFeatureFlag("main-cta") === "test") {
      // Do something differently for this user
      setCtaState("Learn More");
    } else {
      // It's a good idea to let control variant always be the default behaviour,
      // so if something goes wrong with flag evaluation, you don't break your app.
      setCtaState("Get Started");
    }
  }, [posthog, setCtaState]);

  return (
    <Link
      id="main-cta"
      href="https://posthog.com/"
      prefetch={false}
      target="_blank"
    >
      <Button className={cn("px-8 py-6 text-lg", className)}>{ctaState}</Button>
    </Link>
  );
}
