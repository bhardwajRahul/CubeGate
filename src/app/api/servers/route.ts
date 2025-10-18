import { NextRequest, NextResponse } from "next/server";

// Could add more version types later
enum versionType {
    VANILLA = "VANILLA",
    FORGE = "FORGE",
    FABRIC = "FABRIC",
    NEOFORGE = "NEOFORGE",
    PAPER = "PAPER"
}

export interface Payload {
  metadata: {
    serverName: string;
    description?: string;
    tags?: string[];
  };

  versioning: {
    type: versionType;
    version: string; // "LATEST", "SNAPSHOT" ou "1.21.1"
    build?: string | null; // ex.: build específico para Paper ou Purpur
  };

  runtime: {
    eula: boolean; // precisa ser boolean
    memory: {
      init: string; // "1G", "512M"
      max: string;  // "2G", "4G"
    };
    java?: {
      useAikarFlags?: boolean;
      jvmOpts?: string;
      jvmXXOpts?: string;
    };
    timezone?: string; // "America/Sao_Paulo"
  };

  network?: {
    serverPort?: number;
    enableQuery?: boolean;
    queryPort?: number;
    rcon?: {
      enabled: boolean;
      port: number;
      password: string;
    };
  };

  players?: {
    maxPlayers?: number;
    onlineMode?: boolean;
    ops?: string[];
    whitelistEnabled?: boolean;
    whitelist?: string[];
  };

  world?: {
    levelName?: string;
    seed?: string;
    levelType?: "DEFAULT" | "FLAT" | "AMPLIFIED" | "LARGE_BIOMES";
    viewDistance?: number;
    simulationDistance?: number;
  };

  gameplay?: {
    gamemode?: "SURVIVAL" | "CREATIVE" | "ADVENTURE" | "SPECTATOR";
    difficulty?: "PEACEFUL" | "EASY" | "NORMAL" | "HARD";
    pvp?: boolean;
    allowFlight?: boolean;
    enableCommandBlock?: boolean;
    spawnProtection?: number;
  };

  modsAndPlugins?: {
    modrinth?: string[];     // lista de slugs/IDs
    curseforge?: string[];   // "projectId:fileId"
    directUrls?: string[];
    removeOld?: boolean;
  };

  qualityOfLife?: {
    motd?: string;
    iconUrl?: string | null;
    autoPause?: boolean;
  };
}

export async function POST(req: NextRequest) {
    const body = await req.json() as Payload;
    return NextResponse.json({message: body.metadata.description},{ status: 200 });
}