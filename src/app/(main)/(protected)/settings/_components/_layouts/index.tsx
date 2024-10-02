import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PropsWithChildren } from "react";

interface LayoutSettingsProps extends PropsWithChildren {
  title: string;
  description: string;
}

export function LayoutSettings({ title, description, children }: LayoutSettingsProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <Separator className="mb-3" />

      <CardContent>{children}</CardContent>
    </Card>
  );
}
