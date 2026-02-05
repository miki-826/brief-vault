import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { createReadStream } from "node:fs";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4177;
// Assume running from repo root (npm run start) or server/
const ROOT = process.cwd().endsWith("server")
  ? path.resolve(process.cwd(), "..")
  : process.cwd();
const REPORTS_DIR = path.resolve(ROOT, "reports");
const WEB_DIST = path.resolve(ROOT, "web", "dist");

function safeName(name) {
  // very strict: allow only [a-zA-Z0-9._-] and must end with .md
  if (!/^[a-zA-Z0-9._-]+\.md$/.test(name)) return null;
  return name;
}

async function ensureDirs() {
  await fs.mkdir(REPORTS_DIR, { recursive: true });
}

async function listReports() {
  await ensureDirs();
  const files = await fs.readdir(REPORTS_DIR);
  const md = files.filter((f) => f.toLowerCase().endsWith(".md"));

  const metas = await Promise.all(
    md.map(async (name) => {
      const full = path.resolve(REPORTS_DIR, name);
      const st = await fs.stat(full);
      const text = await fs.readFile(full, "utf8");
      const title = (text.match(/^#\s+(.+)$/m)?.[1] || name).trim();
      const date = (name.match(/^(\d{4}-\d{2}-\d{2})/)?.[1]) ?? undefined;
      return {
        name,
        title,
        date,
        updatedAt: st.mtime.toISOString(),
      };
    })
  );

  metas.sort((a, b) => {
    // date desc fallback mtime desc
    const da = a.date || "";
    const db = b.date || "";
    if (da !== db) return db.localeCompare(da);
    return (b.updatedAt || "").localeCompare(a.updatedAt || "");
  });

  return metas;
}

const app = express();

app.get("/api/reports", async (_req, res) => {
  try {
    const metas = await listReports();
    res.json(metas);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.get("/api/reports/:name", async (req, res) => {
  try {
    const name = safeName(req.params.name);
    if (!name) return res.status(400).send("invalid name");
    const full = path.resolve(REPORTS_DIR, name);
    // prevent path traversal
    if (!full.startsWith(REPORTS_DIR)) return res.status(400).send("invalid path");

    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    createReadStream(full).pipe(res);
  } catch (e) {
    res.status(404).send("not found");
  }
});

app.use(express.static(WEB_DIST));

app.get("*", async (_req, res) => {
  res.sendFile(path.resolve(WEB_DIST, "index.html"));
});

app.listen(PORT, () => {
  console.log(`[brief-vault] http://localhost:${PORT}`);
  console.log(`[brief-vault] reports dir: ${REPORTS_DIR}`);
});
