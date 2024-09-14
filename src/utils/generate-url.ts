import { env } from "@/env";

export function generateUrl(code: string) {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return `${baseUrl}/${code}`;
}
