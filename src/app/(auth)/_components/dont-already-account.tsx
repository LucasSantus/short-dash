import { AuthLink } from "./auth-link";

export function DontAlreadyAccount(): JSX.Element {
  return (
    <div className="mt-1 flex items-center justify-center gap-1">
      <span className="text-muted-foreground text-sm">Não possuí uma conta?</span>

      <AuthLink title="Crie uma gratis!" href="/sign-up" />
    </div>
  );
}
