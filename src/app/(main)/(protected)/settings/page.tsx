import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings",
};

export default function Settings(): JSX.Element {
  return redirect("/settings/account");
}
