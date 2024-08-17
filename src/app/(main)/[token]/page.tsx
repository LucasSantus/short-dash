import { getUrlByToken } from "@/actions/get/get-url-by-token";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: {
    token: string;
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const url = await getUrlByToken({
    token: params.token,
  });

  if (!url) return <>DEU BOSTA</>;

  return redirect(url.redirect);
}
