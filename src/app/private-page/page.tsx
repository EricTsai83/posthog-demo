import MainCtaButtonServer from "@/components/main-cta-button-server";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function PrivatePage() {
  return (
    <main className="flex flex-col items-center">
      <section className="flex justify-center w-full px-8 py-12 md:py-24 lg:py-32">
        <div className="relative text-center space-y-8">
          <div className="absoulte left-0 top-0 w-40">
            <Link href="/">
              <Button className="rounded-3xl">
                <ArrowLeft className="mr-2" />
                Back to Home Page
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Private Page
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl">
            If you are not logged in, you will be redirected to the login page.
          </p>
          <div className="flex flex-col space-y-4 sm:justify-center">
            <Suspense
              fallback={
                <Link
                  className="pointer-events-none"
                  href="https://posthog.com/"
                  prefetch={false}
                >
                  <Button className="px-8 py-6 text-lg mt-4 w-full h-36">
                    <LoaderCircle className="animate-spin text-white" />
                  </Button>
                </Link>
              }
            >
              <MainCtaButtonServer className="mt-4 w-full h-36" />
            </Suspense>
            <div className="flex flex-col sm:space-x-4 justify-center sm:flex-row">
              <p className="text-orange-600 font-semibold">campaign default</p>
              <p className="text-rose-600 font-semibold">campaign 1</p>
              <p className="text-blue-600 font-semibold">campaign 2</p>
              <p className="text-green-600 font-semibold">campaign 3</p>
            </div>

            <div className="pt-20">
              <p className="font-semibold">
                Note: Use the account below to see someone with a VIP tag.
              </p>
              <p>
                <span className="font-semibold">user name:</span> eric
              </p>
              <p>
                <span className="font-semibold">password:</span> test
              </p>
            </div>

            {/* <div>
              <p className="text-blue-500">Get feature flag from client</p>
              <MainCtaButtonClient className="mt-4" />
            </div> */}
          </div>
        </div>
      </section>
    </main>
  );
}
