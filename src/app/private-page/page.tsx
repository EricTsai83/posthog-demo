import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function PrivatePage() {
  return (
    <main className="flex flex-col items-center">
      <section className="flex justify-center w-full px-8 py-12 md:py-24 lg:py-32">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Private Page
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl">
            If you are not logged in, you will be redirected to the login page.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:justify-center">
            <div>
              <Link href="/">
                <Button>Back to Home Page</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
