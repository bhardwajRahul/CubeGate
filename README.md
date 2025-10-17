# CubeGate — Self-Hosted Minecraft Server Management Platform

**CubeGate** is an **open-source, self-hosted control panel** for managing and running **Minecraft servers** with Docker.  
It was built to provide a modern, developer-friendly, and efficient way to create, manage, and monitor Minecraft instances, all from a simple and elegant web interface.

> 🔒 Licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)** — free and open for everyone, but protected against closed-source commercial forks.

---

## Run instructions (Work in Progress)

- To run **CubeGate**, you need Docker and Docker Compose installed.
- The `docker-compose.yml` file has all the project core dependencies
- Run **CubeGate** with:
```
sudo docker compose up -d
```

## Overview

CubeGate lets you easily create and manage Minecraft servers on your own infrastructure.  
It aims to combine the simplicity of plug-and-play panels like Aternos with the power and flexibility of full Docker orchestration.

Whether you just want to host a small personal server, or eventually build a larger cloud-based hosting service, CubeGate gives you the foundation — clean, modular, and self-contained.

---

## Core Concepts

- **Self-Hosted by Design** — runs entirely on your server with Docker Compose.
- **Modular Architecture** — built with a clear separation between the **web panel** and a local **agent** that controls Docker.
- **Open Source Core** — transparent and extensible; ideal for developers, communities, and enthusiasts.
- **Future-Proof Foundation** — ready for scaling into a multi-node hosting environment later.
- **Minecraft-Focused** — built exclusively for Minecraft servers, with an emphasis on simplicity, performance, and automation.
- **Docker Based** — all Minecraft servers are isolated Docker containers based on the `itzg/minecraft-server` image.
---
