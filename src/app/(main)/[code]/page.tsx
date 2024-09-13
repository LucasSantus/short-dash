import { trpcServer } from "@/trpc/server";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: {
    code: string;
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const link = await trpcServer.link.redirectUrlByCodeMutation({
    code: params.code,
  });

  // const url = await getUrlByCode({
  //   code: params.code,
  // });

  if (!link) return <>DEU RUIM</>;

  return redirect(link.originalUrl);
}
