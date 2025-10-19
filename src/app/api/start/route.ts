import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getDockerClient } from "@/lib/docker";

const docker = getDockerClient();

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { serverId } = await req.json();
  if (!serverId) {
    return NextResponse.json({ ok: false, error: "Missing server ID" }, { status: 400 });
  }

  const server = await prisma.server.findUnique({ where: { id: serverId } });
  if (!server) {
    return NextResponse.json({ ok: false, error: "Server not found" }, { status: 404 });
  }
  if (server.ownerId !== session.user.id) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const container = docker.getContainer(server.containerName);

  try {
    await container.inspect();
    await container.start();
  } catch (error: any) {
    if (error?.statusCode === 304){
    } else if (error?.statusCode === 404) {
      return NextResponse.json(
        { ok: false, error: "Container not found" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { ok: false, error: "Error starting container" },
        { status: 500 }
      );
    }
  }

  await prisma.server.update({
    where: { id: serverId },
    data: {
      status: "RUNNING",
    },
  });

  return NextResponse.json({
    ok: true,
    message: `Server '${server.name}' (container ${server.containerName}) started successfully.`,
  }, { status: 200 });
}
