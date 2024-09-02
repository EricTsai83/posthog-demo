// app/utils/getBootstrapData.js
import { PostHog } from "posthog-node";
import { cookies } from "next/headers";
import { generateId } from "@/lib/gen-id";

export async function getBootstrapData() {
  let distinct_id = "";
  const phProjectAPIKey = process.env.NEXT_PUBLIC_POSTHOG_KEY!;
  const phCookieName = `ph_${phProjectAPIKey}_posthog`;
  const cookieStore = cookies();
  const phCookie = cookieStore.get(phCookieName);

  if (phCookie) {
    const phCookieParsed = JSON.parse(phCookie.value);
    distinct_id = phCookieParsed.distinct_id;
  }
  if (!distinct_id) {
    distinct_id = generateId();
  }

  const posthog = new PostHog(phProjectAPIKey, {
    host: "https://us.i.posthog.com",
  });
  const flags = await posthog.getAllFlags(distinct_id);
  const bootstrap = {
    distinctID: distinct_id,
    featureFlags: flags,
  };

  return bootstrap;
}
