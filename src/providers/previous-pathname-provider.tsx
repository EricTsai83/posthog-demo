"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface PreviousPathnameContextValue {
  previousPathname: string | null;
}

// Create the context with an undefined initial value
const PreviousPathnameContext = createContext<
  PreviousPathnameContextValue | undefined
>(undefined);

interface PreviousPathnameProviderProps {
  children: ReactNode;
}

// Define the provider as a regular function
export function PreviousPathnameProvider({
  children,
}: PreviousPathnameProviderProps) {
  const pathname = usePathname();
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    previousPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <PreviousPathnameContext.Provider
      value={{ previousPathname: previousPathnameRef.current }}
    >
      {children}
    </PreviousPathnameContext.Provider>
  );
}

// Custom hook to use the previous pathname
export function usePreviousPathname(): string | null {
  const context = useContext(PreviousPathnameContext);
  if (!context) {
    throw new Error(
      "usePreviousPathname must be used within a PreviousPathnameProvider",
    );
  }
  return context.previousPathname;
}
