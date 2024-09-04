import Link from "next/link";
import { Button } from "./ui/button";
import { getBootstrapData } from "@/lib/get-bootstrap-data";
import { cn } from "@/lib/utils";

export const fetchCache = "force-no-store";

enum Campaigns {
  "control" = "campaign default",
  "campaign-one" = "campaign 1",
  "campaign-two" = "campaign 2",
  "campaign-three" = "campaign 3",
}

type Campaignflags = keyof typeof Campaigns;

export default async function MainCtaButtonServer({
  className,
}: {
  className?: string;
}) {
  const bootstrapData = await getBootstrapData();
  const flag = bootstrapData.featureFlags["main-cta"] as Campaignflags;
  console.log("flag", flag);

  // const buttonText = flag === "test" ? "Learn More" : "Get Started";
  // console.log("buttonText", flag);

  return (
    <Link href={`/${flag}`} prefetch={false}>
      <Button
        id="main-cta-server"
        className={cn("px-8 py-6 text-lg", className, {
          "bg-orange-600 hover:bg-orange-500": flag === "control",
          "bg-rose-600 hover:bg-rose-500": flag === "campaign-one",
          "bg-blue-600 hover:bg-blue-500": flag === "campaign-two",
          "bg-green-600 hover:bg-green-500": flag === "campaign-three",
        })}
      >
        {Campaigns[flag]}
      </Button>
    </Link>
  );
}
