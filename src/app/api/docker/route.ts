import { NextRequest, NextResponse } from "next/server";
import { getDockerClient } from "@/lib/docker";
const docker = getDockerClient();

export async function POST(req: NextRequest) {
    const body = await req.json()
    return NextResponse.json({message: body},{ status: 200 });
}

export async function GET() {
    await docker.ping()
    const version = await docker.version()
    return NextResponse.json({version: version}, { status: 200 });
}