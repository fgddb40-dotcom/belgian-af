import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import app from "../api/[...path].js";
import organizationStructureHandler from "../api/organization/structure.js";
import { aircraft, bases, leadership, news, organisation, organizationStructure, values } from "./data.js";
import { aircraftImages } from "../src/aircraftImages.js";

const aircraftImageDirectory = fileURLToPath(new URL("../public/media/aircraft/", import.meta.url));

test("air force aircraft records have complete profiles", () => {
  assert.ok(aircraft.length >= 12);
  for (const item of aircraft) {
    assert.ok(item.id && item.name && item.summary && item.overview && item.role);
    assert.ok(Array.isArray(item.capabilities) && item.capabilities.length > 0);
    assert.ok(Array.isArray(item.specifications) && item.specifications.length > 0);
    assert.ok(item.specifications.some(({ label, value }) => label === "Organization" && value === "Belgian Air Force"));
  }
});

test("public directories include the group's known structure", () => {
  assert.ok(bases.length >= 4);
  assert.ok(bases.some((base) => base.id === "beauvechain"));
  assert.ok(leadership.some((profile) => profile.name === "Madeleine van der Meer"));
  assert.ok(leadership.some((profile) => profile.name === "André Peeters"));
  assert.ok(news.length >= 3);
  assert.ok(organisation.length >= 5);
  assert.ok(values.length >= 4);
  assert.ok(organizationStructure.wings.length >= 4);
  assert.ok(organizationStructure.squadronRoles.length >= 4);
  assert.ok(organizationStructure.squadronRoles.some((unit) => unit.title === "80th UAV Squadron"));
});

test("base map locations follow the supplied order of battle", () => {
  const BelgianLocations = ["beauvechain", "melsbroek", "florennes", "kleine-brogel", "koksijde", "weelde"];
  for (const id of BelgianLocations) {
    const base = bases.find((item) => item.id === id);
    assert.ok(base, `${id} is present`);
    assert.ok(Number.isFinite(base.latitude) && Number.isFinite(base.longitude), `${id} has geographic coordinates`);
  }
  const overseasLocation = bases.find((base) => base.id === "luke-afb");
  assert.equal(overseasLocation?.mapRegion, "overseas");
});

test("every aircraft roster entry has a local image and attribution metadata", () => {
  assert.equal(Object.keys(aircraftImages).length, aircraft.length);
  for (const item of aircraft) {
    const image = aircraftImages[item.id];
    assert.ok(image, `${item.id} has an image mapping`);
    assert.ok(image.alt && image.credit && image.license, `${item.id} has image description and credit`);
    assert.ok(existsSync(path.join(aircraftImageDirectory, path.basename(image.src))), `${item.id} image file exists`);
    if (image.source) assert.ok(image.licenseUrl || image.license === "Public domain", `${item.id} has license details`);
  }
});

test("public mock content contains no embedded URLs or real-time aircraft tracking data", () => {
  const copy = JSON.stringify({ aircraft, bases, leadership, news, organisation, organizationStructure, values }).toLowerCase();
  const aircraftData = JSON.stringify(aircraft).toLowerCase();
  assert.equal(/https?:\/\//i.test(copy), false);
  assert.equal(/latitude|longitude|live position|tracking feed|member list/.test(aircraftData), false);
});

test("the API app serves its endpoints when mounted as a serverless handler", async (context) => {
  const server = app.listen(0);
  context.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));
  await new Promise((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });

  const structureResponse = await fetch(`http://127.0.0.1:${address.port}/api/organization/structure`);
  assert.equal(structureResponse.status, 200);
  assert.deepEqual(await structureResponse.json(), organizationStructure);
});

test("the Vercel nested organization endpoint responds with the structure catalogue", async (context) => {
  const server = createServer(organizationStructureHandler);
  context.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));
  await new Promise((resolve) => server.listen(0, resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const response = await fetch(`http://127.0.0.1:${address.port}/api/organization/structure`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), organizationStructure);
});
