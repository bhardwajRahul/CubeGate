import PanelSidebar from "@/components/PanelSidebar";
import options from "../../../../SidebarPages";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import OverviewPage from "@/app/pages/OverviewPage";

export default async function Server() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <OverviewPage session={session} />
    </>
  );
}
