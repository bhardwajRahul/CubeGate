# 🧩 Contributing to BlockGate

Thank you for your interest in contributing to **BlockGate**!  
We’re excited to have you here, every contribution helps make this project better for everyone.

---

## 🧠 Before You Start

Make sure you have the following installed:
- **Node.js v20+**
- **pnpm** (recommended) or npm/yarn
- **Docker** (for containerized environments)
- A **GitHub** account

Then, fork and clone the repository:

```bash
git clone https://github.com/neozmmv/BlockGate.git
cd blockgate
```

## Install dependencies
`
pnpm install
`

## Run the PostgreSQL Database and other existing Docker Compose deps

`
docker compose up -d
`

## Migrate the database

Run `pnpm dlx prisma migrate dev` to sync the `schema.prisma` file to your PostgreSQL database.

## Start the development server

Run `pnpm dev` and access via via `http://localhost:3000` (Port might change in the future)

## 🧩 How to contribute

Fork the repository, create a new branch for your feature/fix with `git checkout -b feat/my-awesome-feature`

Test locally, run:

```bash
pnpm lint
pnpm build
```

If everything is working correctly, run `git push origin feat/my-awesome-feature` to push your branch.

## Open a Pull Request

Go to the main [BlockGate]("https://github.com/neozmmv/BlockGate) repository and open a Pull Request with a clear and concise description of your changes.
Please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specifications.
Include:
- What you changed
- Why it was needed
- Any issues it closes (e.g., Closes #42)
