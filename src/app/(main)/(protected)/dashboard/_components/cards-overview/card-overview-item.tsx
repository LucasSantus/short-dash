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
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
        <p className="text-xs text-muted-foreground">{summary}</p>
      </CardContent>
    </Card>
  );
}
