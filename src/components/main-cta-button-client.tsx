"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useFeatureFlagVariantKey, usePostHog } from "posthog-js/react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function MainCtaButtonClient({
  className,
}: {
  className?: string;
}) {
  const [ctaState, setCtaState] = useState<string | null>("");
  const posthog = usePostHog();

  // const varient = posthog.getFeatureFlag("main-cta") === "test";
  // console.log("varient", varient);

  useEffect(() => {
    const flag = posthog.getFeatureFlag("main-cta");
    setCtaState(flag === "test" ? "Learn More" : "Get Started");

    // if (varient) {
    //   // Do something differently for this user
    //   setCtaState("Learn More");
    // } else {
    //   // It's a good idea to let control variant always be the default behaviour,
    //   // so if something goes wrong with flag evaluation, you don't break your app.
    //   setCtaState("Get Started");
    // }
  }, [posthog, setCtaState]);

  return (
    <Link href="https://posthog.com/" prefetch={false} target="_blank">
      <Button id="main-cta" className={cn("px-8 py-6 text-lg w-40", className)}>
        {ctaState === "" ? (
          <LoaderCircle className="animate-spin text-white" />
        ) : (
          ctaState
        )}
      </Button>
    </Link>
  );
}
