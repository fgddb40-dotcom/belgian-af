import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import app from "../api/[...path].js";
import organizationStructureHandler from "../api/organization/structure.js";
import { aircraft, bases, forceProfile, leadership, news, organisation, organizationStructure, values } from "./data.js";
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
  assert.equal(organizationStructure.commandStaff.length, 3);
  assert.ok(organizationStructure.supportUnits.some((unit) => unit.unit === "Air Traffic Control Center"));
});

test("force profile publishes supplied history, policy, functions, relationships and contact details", () => {
  assert.equal(forceProfile.name, "Belgian Air Force");
  assert.equal(forceProfile.foundingDate, "11 February 2025");
  assert.equal(forceProfile.headquarters, "Quartier Reine Elisabeth, Evere (Brussels)");
  assert.equal(forceProfile.functions.length, 5);
  assert.equal(forceProfile.history.length, 10);
  assert.ok(forceProfile.foreignAffairs.some(({ title }) => title === "GARUD"));
  assert.ok(forceProfile.technology.some(({ title }) => title.includes("B.A.T.S.")));
  assert.equal(forceProfile.recruitmentEmail, "infobafrecruiting@gmail.com");
  assert.match(forceProfile.affiliationPolicy, /GMRP/);
  const publicCopy = JSON.stringify({ aircraft, bases, forceProfile, leadership, news, organisation, organizationStructure, values });
  assert.equal(/\bgeofs\b|\brp\b/i.test(publicCopy), false);
});

test("force aircraft inventory represents listed types and operational stations", () => {
  const aircraftIds = new Set(aircraft.map(({ id }) => id));
  for (const id of ["f-16a", "f-16b", "f-35a", "f-15cd", "rafale", "a400m", "falcon-7x", "skycourier", "a330-mrtt", "e-7", "aw109", "h145m", "nh90-nfh", "pc-7", "sf-260", "mq-9b"]) {
    assert.ok(aircraftIds.has(id), `${id} is listed`);
  }
  for (const id of ["evere", "semmerzake", "beauvechain", "melsbroek", "florennes", "kleine-brogel", "koksijde", "oud-heverlee"]) {
    assert.ok(bases.some((base) => base.id === id), `${id} is mapped`);
  }
});

test("Sioux flight public story records the supplied arrival details", () => {
  const flight = news.find(({ id }) => id === "sioux-flight");
  assert.ok(flight);
  assert.match(flight.excerpt, /Sioux 01.*ERJ-145.*21:32Z/);
  assert.match(flight.body, /Vienna International Airport \(LOWW\).*21:32Z/);
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

  const forceResponse = await fetch(`http://127.0.0.1:${address.port}/api/force`);
  assert.equal(forceResponse.status, 200);
  assert.deepEqual(await forceResponse.json(), forceProfile);
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
