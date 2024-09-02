import Link from "next/link";
import { Button } from "./ui/button";
import { getBootstrapData } from "@/lib/get-bootstrap-data";
import { cn } from "@/lib/utils";

export default async function MainCtaButtonServer({
  className,
}: {
  className?: string;
}) {
  const bootstrapData = await getBootstrapData();
  const flag = bootstrapData.featureFlags["main-cta"];
  console.log("flag", flag);
  const buttonText = flag === "test" ? "Learn More" : "Get Started";
  console.log("buttonText", buttonText);

  return (
    <Link href="https://posthog.com/" prefetch={false} target="_blank">
      <Button
        id="main-cta-server"
        className={cn("px-8 py-6 text-lg w-40", className)}
      >
        {buttonText}
      </Button>
    </Link>
  );
}
