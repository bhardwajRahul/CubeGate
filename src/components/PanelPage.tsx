"use client";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth-actions";

export default function Panel({ session }: { session: any }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <>
      <div className="text-black">Hello, {session.user?.name}</div>
      <button
        className="bg-red-500 px-4 py-2 rounded-md "
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </>
  );
}
