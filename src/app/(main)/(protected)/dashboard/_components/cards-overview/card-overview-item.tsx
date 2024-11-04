import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface CardOverviewItemProps {
  title: string;
  icon: LucideIcon;
  content: ReactNode;
  summary: ReactNode;
}

export function CardOverviewItem({ title, icon: Icon, content, summary }: CardOverviewItemProps): JSX.Element {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">{title}</CardTitle>
        <Icon className="size-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">{content}</div>
        <p className="text-muted-foreground text-xs">{summary}</p>
      </CardContent>
    </Card>
  );
}
