import React from "react";
import { PartnerLogo } from "@/types";
import dynamic from "next/dynamic";

// Import the client component dynamically with SSR disabled
const Partners = dynamic(
  () => import('../layouts/Partners'),
  { ssr: false }
);

interface ParceirosSectionProps {
  partners: PartnerLogo[];
}

export default function ParceirosSection({ partners }: ParceirosSectionProps) {
  // Use the client component to avoid hydration issues
  return <Partners partners={partners} />;
}
