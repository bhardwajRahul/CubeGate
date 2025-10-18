import PanelSidebar from "@/components/PanelSidebar";
import { redirect } from "next/navigation";

export default function OverviewPage({ session }: { session: any }) {
  if (!session) {
    redirect("/login");
  }
  return <PanelSidebar session={session} />;
}
