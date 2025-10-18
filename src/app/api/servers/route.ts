import { NextRequest, NextResponse } from "next/server";
import { getDockerClient } from "@/lib/docker";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const docker = getDockerClient();
const IMAGE = "itzg/minecraft-server:latest";

enum versionType {
  VANILLA = "VANILLA",
  FORGE = "FORGE",
  FABRIC = "FABRIC",
  NEOFORGE = "NEOFORGE",
  SPIGOT = "SPIGOT",
  PAPER = "PAPER",
}

export interface Payload {
  metadata: { serverName: string; description?: string; tags?: string[] };
  versioning: { type: versionType; version: string; build?: string | null };
  runtime: {
    eula: boolean;
    memory: { init: string; max: string };
    java?: { useAikarFlags?: boolean; jvmOpts?: string; jvmXXOpts?: string };
    timezone?: string;
  };
  network?: { serverPort?: number };
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "mc-server";
}

async function ensureImage(image: string) {
  try {
    await docker.getImage(image).inspect();
  } catch {
    await new Promise<void>((resolve, reject) => {
      docker.pull(image, (err: any, stream: any) => {
        if (err) return reject(err);
        docker.modem.followProgress(stream, (err2) => (err2 ? reject(err2) : resolve()));
      });
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Payload;

    // payload mapping
    const envObj: Record<string, string> = {
      EULA: body.runtime.eula ? "TRUE" : "FALSE",
      TYPE: body.versioning.type,
      VERSION: body.versioning.version,
      INIT_MEMORY: body.runtime.memory.init,
      MAX_MEMORY: body.runtime.memory.max,
      TZ: body.runtime.timezone ?? "UTC",
      OVERRIDE_SERVER_PROPERTIES: "TRUE",
      REPLACE_ENV_VARIABLES: "TRUE",
    };
    if (body.runtime.java?.useAikarFlags) envObj.USE_AIKAR_FLAGS = "TRUE";
    if (body.runtime.java?.jvmOpts) envObj.JVM_OPTS = body.runtime.java.jvmOpts;
    if (body.runtime.java?.jvmXXOpts) envObj.JVM_XX_OPTS = body.runtime.java.jvmXXOpts;

    const Env = Object.entries(envObj).map(([k, v]) => `${k}=${v}`);

    // Define name and volume based on server name
    const slug = toSlug(body.metadata.serverName);
    const containerName = `mc-${slug}`;
    const volumeName = `mc-data-${slug}`;
    const hostPort = body.network?.serverPort ?? 25565;

    // Guarantee image + volume
    await ensureImage(IMAGE);
    await docker.createVolume({ Name: volumeName }).catch(() => { /* se existir, reutiliza */ });

    // Port mapping
    const ExposedPorts: Record<string, {}> = { "25565/tcp": {} };
    const PortBindings: Record<string, Array<{ HostPort: string }>> = {
      "25565/tcp": [{ HostPort: String(hostPort) }],
    };

    // Container creation
    const container = await docker.createContainer({
      name: containerName,
      Image: IMAGE,
      Env,
      Tty: true,
      OpenStdin: true,
      ExposedPorts,
      HostConfig: {
        Mounts: [{ Target: "/data", Source: volumeName, Type: "volume" }],
        PortBindings,
        RestartPolicy: { Name: "unless-stopped" },
      },
      Labels: {
        "com.cubegate.server": slug,
        "com.cubegate.description": body.metadata.description ?? "",
      },
    });

    await container.start();

    const info = await container.inspect();

    return NextResponse.json(
      {
        ok: true,
        containerId: info.Id,
        containerName,
        volumeName,
        hostPort,
        type: body.versioning.type,
        version: body.versioning.version,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Error on server creation" },
      { status: 400 }
    );
  }
}

export async function GET() {
    // Get user session
    const session  = await auth.api.getSession({
    headers : await headers(),
});
/* if(!session){
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  } */
  try {
    const containers = await docker.listContainers({ all: true, filters: { label: ["com.cubegate.server"] } });
    const servers = containers.map((container) => ({
      containerId: container.Id,
      containerName: container.Names[0].replace(/^\//, ""),
    }));

    return NextResponse.json({ ok: true, servers,
        user: session?.user.id
     }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Error on server listing" },
      { status: 400 }
    );
  }
}