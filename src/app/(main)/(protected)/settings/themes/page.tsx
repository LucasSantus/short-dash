import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LayoutSettings } from "../_components/_layouts";

const ThemeForm = dynamic(() => import("./form").then(({ ThemeForm }) => ThemeForm), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Temas",
};

export default function Themes(): JSX.Element {
  return (
    <LayoutSettings title="Temas" description="Used to identify your store in the marketplace.">
      <ThemeForm />
    </LayoutSettings>
  );
}
