import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { aircraft, bases, leadership, news, organisation, organizationStructure, values } from "./data.js";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.disable("x-powered-by");
app.disable("etag");
app.use(express.json({ limit: "16kb" }));
app.use("/api", (_req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => console.info(JSON.stringify({ method: req.method, path: req.path, status: res.statusCode, durationMs: Date.now() - start })));
  next();
});

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.get("/api/news", (req, res) => {
  const category = typeof req.query.category === "string" ? req.query.category : null;
  const result = category && category !== "All" ? news.filter((item) => item.category === category) : news;
  res.json(result);
});
app.get("/api/news/:id", (req, res) => {
  const item = news.find((entry) => entry.id === req.params.id);
  return item ? res.json(item) : res.status(404).json({ error: "Community update not found." });
});
app.get("/api/aircraft", (_req, res) => res.json(aircraft));
app.get("/api/aircraft/:id", (req, res) => {
  const item = aircraft.find((entry) => entry.id === req.params.id);
  return item ? res.json(item) : res.status(404).json({ error: "Aircraft information not found." });
});
app.get("/api/bases", (_req, res) => res.json(bases));
app.get("/api/leadership", (_req, res) => res.json(leadership));
app.get("/api/organization", (_req, res) => res.json(organisation));
app.get("/api/organization/structure", (_req, res) => res.json(organizationStructure));
app.get("/api/values", (_req, res) => res.json(values));

app.use("/api", (_req, res) => res.status(404).json({ error: "API endpoint not found." }));
app.use((error, _req, res, _next) => {
  console.error(JSON.stringify({ level: "error", message: error.message }));
  res.status(500).json({ error: "The request could not be completed." });
});

export { app };

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  app.listen(port, () => console.info(`Belgian Air Force API listening on port ${port}`));
}
