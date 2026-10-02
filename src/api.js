export async function getJson(path) {
  let response;
  try {
    response = await fetch(`/api${path}`, { headers: { Accept: "application/json" } });
  } catch (error) {
    const message = error instanceof Error && typeof error.message === "string" ? error.message : "Network request failed.";
    throw new Error(`Unable to connect to the public information service: ${message}`);
  }

  if (!response.ok) {
    let detail = "";
    if (response.headers.get("content-type")?.includes("application/json")) {
      const body = await response.json().catch(() => null);
      if (body && typeof body.error === "string") detail = ` ${body.error}`;
    }
    throw new Error(`Unable to load ${path.replace(/^\//, "")} (${response.status}).${detail}`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error(`The public information service returned invalid data for ${path.replace(/^\//, "")}.`);
  }
}
