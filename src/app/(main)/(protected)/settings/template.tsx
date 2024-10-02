import { Bounce } from "@/components/framer-motion/animation/bounce";
import { TRANSITION_DURATION } from "@/constants/globals";
import { sidebarSettingItems } from "./_constants/sidebar-items";

interface SettingsTemplateProps {
  children: React.ReactNode;
}

export default function SettingsTemplate({ children }: SettingsTemplateProps) {
  return (
    <Bounce className="grid gap-6" time={{ delay: TRANSITION_DURATION + sidebarSettingItems.length * 0.5 }}>
      {children}
    </Bounce>
  );
}
