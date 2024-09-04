import PricingSectionCards from "@/components/pricing-section-cards";
import { auth } from "@/auth";
import PostHogClient from "@/lib/posthog";
import Image from "next/image";

export default async function CampaignTwo() {
  const posthog = PostHogClient();
  const session = await auth();

  if (session?.user?.name) {
    posthog.capture({
      distinctId: session.user.name,
      event: "default page Viewed",
    });
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-4xl font-bold pt-10">Campaign default</h2>
      <Image
        className="py-12"
        src={"/campaign-default.jpg"}
        width={1200}
        height={375}
        alt="Campaign default"
      />
      <PricingSectionCards />
    </div>
  );
}
