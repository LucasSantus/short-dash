import { AuthLink } from "./auth-link";

export function AlreadyAccount(): JSX.Element {
  return (
    <div className="mt-1 flex items-center justify-center gap-1">
      <span className="text-muted-foreground text-sm">Já possuí uma conta?</span>

      <AuthLink title="Logar" href="/sign-in" />
    </div>
  );
}
