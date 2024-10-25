import { PropsWithChildren } from "react";
import { SettingsHeader, SettingsHeaderProps } from "./settings-header";

interface SettingsLayoutProps extends PropsWithChildren, SettingsHeaderProps {}

export function SettingsLayout({ children, title, description }: SettingsLayoutProps): JSX.Element {
  return (
    <div className="space-y-4">
      <SettingsHeader title={title} description={description} />

      {children}
    </div>
  );
}
