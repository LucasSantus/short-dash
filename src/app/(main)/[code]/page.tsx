import { notFound, permanentRedirect } from "next/navigation";
import { getShortUrl } from "./get-short-url";

interface RedirectPageProps {
  params: {
    code: string;
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const link = await getShortUrl(params.code);

  if (!link) notFound();

  permanentRedirect(link.originalUrl);
}
