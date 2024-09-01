import Link from "next/link";
import PostHogClient from "@/lib/posthog";
import { auth } from "@/auth";
import Hero from "@/components/hero";
import CampaignSection from "@/components/campaign-section";

export default async function Home() {
  const posthog = PostHogClient();
  const session = await auth();

  // if (session?.user?.name) {
  //   posthog.capture({
  //     distinctId: session.user.name,
  //     event: "Home Page Viewed",
  //   });
  // }

  return (
    <main className="flex flex-col items-center">
      <Hero />
      <CampaignSection />
    </main>
  );
}
