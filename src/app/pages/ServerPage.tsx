import PanelSidebar from "@/components/PanelSidebar";
import { redirect } from "next/navigation";

export default function ServerPage({ session }: { session: any }) {
  if (!session) {
    redirect("/login");
  }
  return <PanelSidebar session={session} />;
}
