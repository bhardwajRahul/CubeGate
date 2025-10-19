"use client";
import { useState, useEffect } from "react";

export default function ActiveTable() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      const response = await fetch("/api/servers");
      const data = await response.json();
      setServers(data.servers);
    };
    fetchServers();
  }, []);

  return (
    <>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-zinc-400 text-sm">
            <th className="text-left p-4">Server Name</th>
            <th className="text-left p-4">Server IP</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Version</th>
            <th className="text-left p-4">Type</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#0b1624]">
            {servers.map((server: any) => (
              <>
                <td key={server.id} className="p-4 text-white">
                  {server.name}
                </td>
                <td key={server.id} className="p-4 text-white">
                  {server.ipAddress}:{server.port}
                </td>
                <td key={server.id} className="p-4 text-green-400">
                  {server.status}
                </td>
                <td key={server.id} className="p-4 text-white">
                  {server.version}
                </td>
                <td key={server.id} className="p-4 text-white">
                  {server.serverType}
                </td>
                <td className="p-4">
                  <button className="px-3 py-1 bg-blue-500 rounded-md hover:bg-blue-500/80 transition-all">
                    Manage
                  </button>
                </td>
              </>
            ))}
            {/* <tr className="bg-[#0b1624]">
            <td className="p-4 text-white">My Survival Server</td>
            <td className="p-4 text-white">192.168.1.1:25565</td>
            <td className="p-4 text-green-400">Online</td>
            <td className="p-4 text-zinc-300">12 / 100</td>
            <td className="p-4">
              <button className="px-3 py-1 bg-blue-500 rounded-md hover:bg-blue-500/80 transition-all">
                Manage
              </button>
            </td>
          </tr> */}
          </tr>
        </tbody>
      </table>
    </>
  );
}
