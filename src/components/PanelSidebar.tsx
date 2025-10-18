"use server";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/actions/auth-actions";
import MenuOption from "./MenuOption";
import options from "../../SidebarPages";
import { House, LogOut } from "lucide-react";

export default async function PanelSidebar({ session }: { session?: any }) {
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <nav className="bg-[#141b2a] h-screen md:w-80 py-8 flex flex-col justify-between drop-shadow-2xl">
        <div>
          <h2 className="text-white text-center text-2xl">Control Panel</h2>
          <div className="mt-10 flex flex-col items-center">
            {options.map((option) => (
              <MenuOption
                key={option.label}
                label={option.label}
                icon={option.icon}
                href={option.href}
                className="mb-4"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={signOut}
            className="px-4 py-2 bg-[#35509b5f] rounded-md text-white hover:bg-[#35509b5f]/50 transition-all cursor-pointer"
          >
            <LogOut className="inline mr-2" />
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}
