import { organizationStructure } from "../../server/data.js";

export default function handler(_request, response) {
  response.statusCode = 200;
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(organizationStructure));
}
