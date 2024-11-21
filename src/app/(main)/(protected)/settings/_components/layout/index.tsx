import { PropsWithChildren } from "react";
import { SettingsHeader, SettingsHeaderProps } from "./header";

interface SettingsLayoutProps extends PropsWithChildren, SettingsHeaderProps {}

export function SettingsLayout({ title, description, children }: SettingsLayoutProps) {
  return (
    <div className="space-y-4">
      <SettingsHeader title={title} description={description} />

      {children}
    </div>
  );
}
