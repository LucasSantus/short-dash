import Link, { type LinkProps } from "next/link";

interface AuthLinkProps extends LinkProps {
  title: string;
}

export function AuthLink({ title, ...rest }: AuthLinkProps): JSX.Element {
  return (
    <Link className="text-blue-600 text-sm hover:text-blue-500 hover:underline" {...rest}>
      {title}
    </Link>
  );
}
