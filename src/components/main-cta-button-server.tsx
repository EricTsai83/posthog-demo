import Link from "next/link";
import { Button } from "./ui/button";
import { getBootstrapData } from "@/lib/get-bootstrap-data";
import { cn } from "@/lib/utils";
import { getPersonProperties } from "@/app/actions/getPersonProperties";

export const fetchCache = "force-no-store";

enum Campaigns {
  "control" = "campaign default",
  "campaign-one" = "campaign 1",
  "campaign-two" = "campaign 2",
  "campaign-three" = "campaign 3",
}

type Campaignflags = keyof typeof Campaigns;

export default async function MainCtaButtonServer({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const bootstrapData = await getBootstrapData();
  // console.log("bootstrapData", bootstrapData);
  const personProperties = await getPersonProperties(bootstrapData.distinctID);
  const flag = bootstrapData.featureFlags["main-cta"] as Campaignflags;
  // console.log("flag", flag);
  // console.log(
  //   "personProperties customerType",
  //   personProperties.results[0]?.properties?.customerType,
  // );
  const isVip =
    personProperties.results[0]?.properties?.customerType === "VIP"
      ? true
      : false;

  // const buttonText = flag === "test" ? "Learn More" : "Get Started";
  // console.log("buttonText", flag);

  return (
    <Link id={id} href={`/${flag}`} prefetch={false}>
      {isVip ? (
        <Button
          className={cn(
            "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white",
            "px-8 py-6 text-lg",
            className,
          )}
        >
          {Campaigns[flag]}
        </Button>
      ) : (
        <Button
          className={cn("px-8 py-6 text-lg", className, {
            "bg-orange-600 hover:bg-orange-500": flag === "control",
            "bg-rose-600 hover:bg-rose-500": flag === "campaign-one",
            "bg-blue-600 hover:bg-blue-500": flag === "campaign-two",
            "bg-green-600 hover:bg-green-500": flag === "campaign-three",
          })}
        >
          {Campaigns[flag]}
        </Button>
      )}
    </Link>
  );
}
