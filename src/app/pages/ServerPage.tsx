// NEVER USE CLIENT ON THESE PAGES
import PanelSidebar from "@/components/PanelSidebar";
import { redirect } from "next/navigation";

export default function ServerPage({ session }: { session: any }) {
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex h-screen">
      <PanelSidebar session={session} />
      <div className="flex-1 bg-[#0b1019]"></div>
    </div>
  );
}
