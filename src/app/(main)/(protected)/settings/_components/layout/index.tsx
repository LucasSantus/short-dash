import { getUser } from "@/actions/queries/auth/get-user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { messages } from "@/constants/messages";
import { UserRoundXIcon } from "lucide-react";
import { PropsWithChildren } from "react";

interface SettingsLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
}

export async function SettingsLayout({ title, description, children }: SettingsLayoutProps) {
  const { isAuthenticated, user } = await getUser();

  if (!isAuthenticated || !user.id)
    return (
      <div className="space-y-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <Alert variant="destructive">
              <UserRoundXIcon className="size-4" />
              <AlertTitle>Ocorreu um problema!</AlertTitle>
              <AlertDescription>{messages.globals.user.notFound}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );

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
