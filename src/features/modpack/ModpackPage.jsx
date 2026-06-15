import { useState } from "react";

import useModpackManager from "./useModpackManager";
import ModpackInsights from "./components/ModpackInsights";

export default function ModpackPage() {
  const {
    modpacks,
    activePack,
    activeId,
    addPack,
    removePack,
    switchPack,
    addModToActivePack,
    setVersion,
    setLoader,
  } = useModpackManager();

  const [name, setName] = useState("");

  return (
    <div className="p-4 space-y-4 text-white">

      {/* HEADER */}
      <h1 className="text-2xl font-bold">Modpack Manager</h1>

      {/* CREATE MODPACK */}
      <div className="flex gap-2">
        <input
          className="p-2 text-black rounded"
          placeholder="New modpack name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="bg-green-600 px-3 py-1 rounded"
          onClick={() => {
            addPack(name);
            setName("");
          }}
        >
          Create
        </button>
      </div>

      {/* MODPACK LIST */}
      <div className="space-y-2">
        {modpacks.map((pack) => (
          <div
            key={pack.id}
            className={`p-2 rounded cursor-pointer ${
              pack.id === activeId ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => switchPack(pack.id)}
          >
            <div className="flex justify-between">
              <span>{pack.name}</span>

              <button
                className="text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  removePack(pack.id);
                }}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ACTIVE MODPACK CONTROLS */}
      {activePack && (
        <div className="p-3 bg-gray-800 rounded space-y-3">

          <h2 className="text-lg font-bold">
            Active: {activePack.name}
          </h2>

          {/* VERSION SELECTOR */}
          <div>
            <label>Minecraft Version</label>
            <select
              className="text-black p-1 ml-2"
              value={activePack.mcVersion}
              onChange={(e) => setVersion(e.target.value)}
            >
              <option value="1.18.2">1.18.2</option>
              <option value="1.19.2">1.19.2</option>
              <option value="1.20.1">1.20.1</option>
              <option value="1.20.4">1.20.4</option>
              <option value="1.21.1">1.21.1</option>
            </select>
          </div>

          {/* LOADER SELECTOR */}
          <div>
            <label>Loader</label>
            <select
              className="text-black p-1 ml-2"
              value={activePack.loader}
              onChange={(e) => setLoader(e.target.value)}
            >
              <option value="forge">Forge</option>
              <option value="fabric">Fabric</option>
              <option value="neoforge">NeoForge</option>
            </select>
          </div>

          {/* ADD MOD BUTTON (placeholder hook ready) */}
          <button className="bg-purple-600 px-3 py-1 rounded">
            Add Mods (UI later)
          </button>
        </div>
      )}

      {/* 🧠 INTELLIGENCE PANEL */}
      {activePack && (
        <ModpackInsights modpack={activePack} />
      )}
    </div>
  );
}
