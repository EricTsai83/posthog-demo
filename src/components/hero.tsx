import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function Hero() {
  return (
    <section className="flex justify-center w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 space-y-6 md:space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl sm:flex-row md:text-5xl lg:text-6xl flex flex-col justify-center gap-6">
            <p className="sm:text-nowrap">Unlock the Power of</p>
            <div className="flex items-center justify-center min-w-52">
              <Image
                src="/posthog-logo.svg"
                alt="PostHog Logo"
                width={320}
                height={60}
                priority
              />
            </div>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl">
            Discover how PostHog works like a charm.
          </p>
          <div className="flex flex-col sm:flex-row gap-12 mx-auto justify-center ">
            <Link href="https://posthog.com/" prefetch={false} target="_blank">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
