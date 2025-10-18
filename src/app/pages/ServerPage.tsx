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
      <div className="flex-1 bg-[#0b1019] h-full p-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-white text-2xl">Server Management</h1>
          <button className="px-4 py-2 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-500/50 transition-all">
            Create New Server
          </button>
        </div>
        <div className="space-y-8">
          {/* Active servers table */}
          <div className=" bg-[#0c1320] rounded-md p-6">
            <h2 className="text-white text-lg mb-4">Active Servers</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-zinc-400 text-sm">
                    <th className="text-left p-4">Server Name</th>
                    <th className="text-left p-4">Server IP</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Players</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#0b1624]">
                    <td className="p-4 text-white">My Survival Server</td>
                    <td className="p-4 text-white">192.168.1.1:25565</td>
                    <td className="p-4 text-green-400">Online</td>
                    <td className="p-4 text-zinc-300">12 / 100</td>
                    <td className="p-4">
                      <button className="px-3 py-1 bg-blue-500 rounded-md hover:bg-blue-500/80 transition-all">
                        Manage
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Offline servers table */}
          <div className=" bg-[#0c1320] rounded-md p-6">
            <h2 className="text-white text-lg mb-4">Offline Servers</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-zinc-400 text-sm">
                    <th className="text-left p-4">Server Name</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Last Seen</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#07121b]">
                    <td className="p-4 text-zinc-300">Test Server</td>
                    <td className="p-4 text-red-400">Offline</td>
                    <td className="p-4 text-zinc-400">2 days ago</td>
                    <td className="p-4">
                      <button className="px-3 py-1 bg-zinc-700 rounded-md hover:bg-zinc-700/80 transition-all">
                        Start
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
