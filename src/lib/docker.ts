import Docker from "dockerode"

export function getDockerClient(): Docker {
  // Linux: socket Unix; Windows: Docker Desktop via named pipe
  return process.platform === "win32"
    ? new Docker({ socketPath: "//./pipe/docker_engine" })
    : new Docker({ socketPath: "/var/run/docker.sock" });
}
