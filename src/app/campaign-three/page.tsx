import PricingSectionCards from "@/components/pricing-section-cards";

import { auth } from "@/auth";
import PostHogClient from "@/lib/posthog";

export default async function CampaignTwo() {
  const posthog = PostHogClient();
  const session = await auth();

  if (session?.user?.name) {
    posthog.capture({
      distinctId: session.user.name,
      event: "campaign 1 page Viewed",
    });
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-4xl font-bold pt-10">Campaign 3</h2>
      <PricingSectionCards />
    </div>
  );
}
