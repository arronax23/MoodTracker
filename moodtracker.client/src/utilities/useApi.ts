export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export async function apiRequest(
  url: string,
  method: HttpMethod = "GET",
  body: unknown = null
): Promise<boolean> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body !== null && body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.ok;
}