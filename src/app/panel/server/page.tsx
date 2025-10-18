import ServerPage from "@/app/pages/ServerPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Server() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <ServerPage session={session} />
    </>
  );
}
