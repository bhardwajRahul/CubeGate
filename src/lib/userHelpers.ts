import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// maybe use this to get userid easier
export async function requireUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("UNAUTHORIZED");
  return (session.user as any).id ?? session.user.email; // ajuste conforme seu modelo
}

export function userSlug(userId: string) {
  return userId.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
