import Link from "next/link";
import PostHogClient from "@/lib/posthog";
import { auth } from "@/auth";
import Image from "next/image";

export default async function SpecialDiscount() {
  const session = await auth();
  const posthog = PostHogClient();

  let isMyFlagEnabledForUser;
  // capture an event
  if (session?.user?.name) {
    // feature flag called
    isMyFlagEnabledForUser = await posthog.isFeatureEnabled(
      "special-discount",
      session?.user?.name,
    );
  }

  if (!isMyFlagEnabledForUser) {
    return (
      <p className="text-3xl text-red-500">
        Sorry, you don't have any discount. Maybe you should login and try
        again! We prepare suprise for you.
      </p>
    );
  }

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-primary flex justify-center">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-primary-foreground px-3 py-1 text-sm text-primary">
            Limited Time Offer
          </div>
          <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground md:text-4xl/tight">
            Get 50% Off Your First Order
          </h2>
          <p className="max-w-[600px] text-primary-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Don't miss out on this incredible discount! Treat yourself or a
            loved one to something special and save big.
          </p>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Claim Offer
          </Link>
        </div>
        <Image
          src="/placeholder.svg"
          width="550"
          height="400"
          alt="Discount Offer"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
        />
      </div>
    </section>
  );
}
