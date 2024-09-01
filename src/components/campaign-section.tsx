import Link from "next/link";
import React from "react";

export default function CampaignSection() {
  return (
    <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 grid gap-8 md:grid-cols-3">
        <Link href="/campaign-one">
          <div className="space-y-4">
            <img
              src="/placeholder.svg"
              width="300"
              height="200"
              alt="Campaign Element 1"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
            />
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Campaign 1</h2>
              <p className="text-muted-foreground">
                Reach the right audience with our personalized outreach
                strategies.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/campaign-two">
          <div className="space-y-4">
            <img
              src="/placeholder.svg"
              width="300"
              height="200"
              alt="Campaign Element 2"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
            />
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Campaign 2</h2>
              <p className="text-muted-foreground">
                Captivate your audience with our visually stunning and
                informative content.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/campaign-three">
          <div className="space-y-4">
            <img
              src="/placeholder.svg"
              width="300"
              height="200"
              alt="Campaign Element 3"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
            />
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Campaign 3</h2>
              <p className="text-muted-foreground">
                Track the success of your campaign with our comprehensive
                analytics.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
