"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddServerButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [versions, setVersions] = useState([]);
  const [serverName, setServerName] = useState("");
  const [type, setType] = useState("VANILLA");
  const [version, setVersion] = useState("LATEST");
  const [eula, setEula] = useState(true);
  const [initMemory, setInitMemory] = useState("2G");
  const [maxMemory, setMaxMemory] = useState("4G");

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await axios.get(
          "https://mc-versions-api.net/api/java"
        );
        setVersions(response.data.result);
      } catch (error) {
        console.error("Error fetching versions:", error);
      }
    };
    fetchVersions();
  }, []);
  const handleOpenModal = () => setIsModalOpen((v) => !v);

  const handleServerCreate = async () => {
    const payload = {
      metadata: {
        serverName,
      },
      versioning: {
        type,
        version,
      },
      runtime: {
        eula,
        memory: {
          init: initMemory,
          max: maxMemory,
        },
      },
    };
    const res = await axios.post("/api/servers", payload);
    console.log(res.data);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-500/50 transition-all"
      >
        Create New Server
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-lg rounded-xl bg-[#0c1320] p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg">Create server</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 flex flex-col">
              <label className="block text-sm text-zinc-300">
                Server name
                <input
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  className="mt-1 w-full rounded-md bg-[#0b1624] text-white p-2 outline-none"
                />
              </label>
              <div className="flex justify-between">
                <label className="block text-sm text-zinc-300">
                  Type
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 w-full rounded-md bg-[#0b1624] text-white p-2 outline-none"
                  >
                    <option value="VANILLA">Vanilla</option>
                    <option value="FORGE">Forge</option>
                    <option value="FABRIC">Fabric</option>
                    <option value="NEOFORGE">NeoForge</option>
                    <option value="SPIGOT">Spigot</option>
                    <option value="PAPER">Paper</option>
                  </select>
                </label>
                <label className="block text-sm text-zinc-300">
                  Version
                  <select
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="mt-1 w-full rounded-md bg-[#0b1624] text-white p-2 outline-none"
                  >
                    <option value="LATEST">Latest</option>
                    {versions.map((ver) => (
                      <option key={ver} value={ver}>
                        {ver}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleServerCreate}
                  className="cursor-pointer justify-end bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Create Server
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
