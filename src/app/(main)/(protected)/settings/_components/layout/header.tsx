import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";

export interface SettingsHeaderProps {
  title: string;
  description: string;
}

export function SettingsHeader({ title, description }: SettingsHeaderProps): JSX.Element {
  return (
    <Fragment>
      <div>
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Separator />
    </Fragment>
  );
}
