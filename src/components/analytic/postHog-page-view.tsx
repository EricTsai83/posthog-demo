"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { Session } from "next-auth";

export default function PostHogPageView({
  session,
}: {
  session: Session | null;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  useEffect(() => {
    // Track pageviews
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
      console.log("Track pageviews", posthog.get_distinct_id());
    }
  }, [pathname, searchParams, posthog]);

  useEffect(() => {
    if (session?.user?.name && !posthog._isIdentified()) {
      posthog.identify(session.user.name, {
        name: session.user.name,
      });
      console.log("identify user", posthog.get_distinct_id());
    }

    if (!session && posthog._isIdentified()) {
      posthog.reset();
      console.log("after reset", posthog.get_distinct_id());
    }
  }, [session, posthog]);

  return null;
}
