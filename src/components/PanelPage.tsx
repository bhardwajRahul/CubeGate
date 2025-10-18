"use client";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth-actions";
import MenuOption from "./MenuOption";
import PanelSidebar from "./PanelSidebar";
// this component is rendered only when the user is authenticated
// session is handled in src/app/panel/page.tsx
export default function Panel({ session }: { session: any }) {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <>
      <PanelSidebar
        MenuOptions={[
          { label: "Overview", href: "/panel/overview" },
          { label: "Settings", href: "/panel/settings" },
          { label: "Users", href: "/panel/users" },
        ]}
      />
    </>
  );
}
