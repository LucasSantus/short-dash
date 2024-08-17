import { getUrlByCode } from "@/actions/get/get-url-by-token";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: {
    code: string;
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const url = await getUrlByCode({
    code: params.code,
  });

  if (!url) return <>DEU BOSTA</>;

  return redirect(url.path);
}
