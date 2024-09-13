import Link, { type LinkProps } from "next/link";

interface AuthLinkProps extends LinkProps {
  title: string;
}

export function AuthLink({ title, ...rest }: AuthLinkProps): JSX.Element {
  return (
    <Link className="text-sm text-blue-600 hover:text-blue-500 hover:underline" {...rest}>
      {title}
    </Link>
  );
}
