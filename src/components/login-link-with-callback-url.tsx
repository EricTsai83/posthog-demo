"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginLinkWithCallbackUrl() {
  const pathname = usePathname();
  return (
    <Link
      href={"/login?callbackUrl=" + pathname}
      className="text-sm font-medium hover:underline underline-offset-4"
      prefetch={false}
    >
      Login
    </Link>
  );
}
