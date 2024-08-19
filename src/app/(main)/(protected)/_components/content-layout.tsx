import { getSession } from "@/lib/getSession";
import { Navbar } from "../_layouts/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export async function ContentLayout({ title, children }: ContentLayoutProps) {
  const session = await getSession();

  return (
    <div className="flex flex-1 flex-col">
      <Navbar title={title} session={session} />
      <div className="container flex flex-1 flex-col gap-2 px-4 py-8 sm:px-8">
        {children}
      </div>
    </div>
  );
}
