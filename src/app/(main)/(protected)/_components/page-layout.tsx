import { getSession } from "@/lib/getSession";
import { Navbar } from "../_layouts/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export async function ContentLayout({ title, children }: ContentLayoutProps) {
  const session = await getSession();

  return (
    <div>
      <Navbar title={title} session={session} />
      <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </div>
  );
}
