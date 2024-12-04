import Link, { type LinkProps } from "next/link";

interface AuthLinkProps extends LinkProps {
  title: string;
}

export function AuthLink({ title, ...rest }: AuthLinkProps): JSX.Element {
  return (
    <Link
      className="font-semibold text-blue-600 text-sm hover:text-blue-500 hover:underline focus:text-blue-700"
      {...rest}
    >
      {title}
    </Link>
  );
}
