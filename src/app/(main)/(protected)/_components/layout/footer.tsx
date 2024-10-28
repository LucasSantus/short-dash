import { TailwindIndicator } from "@/components/tailwind-indicator";

export function Footer(): JSX.Element {
  const selectedYear = "2024";
  const currentYear = new Date().getFullYear().toString();

  const year = Number(currentYear) > Number(selectedYear) ? `${selectedYear}-${currentYear}` : selectedYear;

  return (
    <footer className="w-full">
      <div className="mx-4 flex h-14 items-center text-xs leading-loose md:mx-8 md:text-sm">
        <p className="text-left text-muted-foreground">© Short Dash | {year}</p>
        <TailwindIndicator />
      </div>
    </footer>
  );
}
