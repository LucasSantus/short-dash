import { usePathname, useSearchParams } from "next/navigation";
import nProgress from "nprogress";
import { useEffect } from "react";

export function Navigation(): JSX.Element | null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    nProgress.done();
  }, [pathname, searchParams]);

  return null;
}
