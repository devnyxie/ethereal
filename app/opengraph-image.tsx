import DefaultBanner from "@/lib/og/default_banner";
import { headers } from "next/headers";

export const runtime = "edge";

// Image metadata
export const alt = "About";
export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default async function Image() {
  const response = await DefaultBanner({ size });
  return response;
}
