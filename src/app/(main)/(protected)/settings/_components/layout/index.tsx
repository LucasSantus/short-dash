import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PropsWithChildren } from "react";

interface SettingsLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
}

export function SettingsLayout({ title, description, children }: SettingsLayoutProps) {
  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">{children}</CardContent>
      </Card>
    </div>
  );
}
