import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { app } from "./index.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 3001;
const buildDirectory = path.resolve(root, "../dist");

app.use(express.static(buildDirectory));
app.get("*", (_req, res) => res.sendFile(path.join(buildDirectory, "index.html")));
app.listen(port, () => console.info(`Belgian Air Force website listening on port ${port}`));
