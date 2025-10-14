export async function PopularItems(type: string) {
  try {
    const url = `/api/${type}/latest`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server did not return JSON");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
