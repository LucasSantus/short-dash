import { getServerAuthSession } from "@/utils/get-server-auth-session";
import { Navbar } from "./layout/navbar";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export async function ContentLayout({ children }: ContentLayoutProps) {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-1 flex-col">
      <Navbar session={session} />
      <div className="container flex flex-1 flex-col gap-2 px-4 py-8 sm:px-8">{children}</div>
    </div>
  );
}
