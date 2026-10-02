export async function getJson(path) {
  const response = await fetch(`/api${path}`, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? `Unable to load information (${response.status}).`);
  }
  return response.json();
}
