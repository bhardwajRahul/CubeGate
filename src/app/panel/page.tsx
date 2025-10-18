import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import PanelPage from "@/components/PanelPage";

export default async function Panel() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <PanelPage session={session} />
    </>
  );
}
