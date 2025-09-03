import { getSession } from "./session";

export interface PodioApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
}

export async function podioApiCall(
  endpoint: string,
  options: PodioApiOptions = {}
) {
  const session = await getSession();

  if (!session) {
    throw new Error("No active session found");
  }

  const { method = "GET", body, headers = {} } = options;

  // Check if token is expired and refresh if needed
  if (Date.now() > session.tokens.expires_at) {
    // Token is expired, but getSession should have already refreshed it
    // If we still don't have a valid session, throw an error
    const refreshedSession = await getSession();
    if (!refreshedSession) {
      throw new Error("Failed to refresh access token");
    }
  }

  const apiUrl = `https://api.podio.com${endpoint}`;
  const requestHeaders = {
    Authorization: `OAuth2 ${session.tokens.access_token}`,
    "Content-Type": "application/json",
    ...headers,
  };

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body && method !== "GET") {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(apiUrl, requestOptions);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Podio API error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return response.json();
}

// Convenience functions for common API operations
export async function getPodioUserProfile() {
  return podioApiCall("/user/profile");
}

export async function getPodioWorkspaces() {
  return podioApiCall("/workspace/");
}

export async function getPodioApps(workspaceId: number) {
  return podioApiCall(`/app/space/${workspaceId}/`);
}

export async function getPodioItems(
  appId: number,
  options: { limit?: number; offset?: number } = {}
) {
  const params = new URLSearchParams();
  if (options.limit) params.set("limit", options.limit.toString());
  if (options.offset) params.set("offset", options.offset.toString());

  const queryString = params.toString();
  const endpoint = `/item/app/${appId}/${queryString ? `?${queryString}` : ""}`;

  return podioApiCall(endpoint);
}

export async function createPodioItem(appId: number, itemData: any) {
  return podioApiCall(`/item/app/${appId}/`, {
    method: "POST",
    body: itemData,
  });
}

export async function updatePodioItem(itemId: number, itemData: any) {
  return podioApiCall(`/item/${itemId}`, {
    method: "PUT",
    body: itemData,
  });
}

export async function deletePodioItem(itemId: number) {
  return podioApiCall(`/item/${itemId}`, {
    method: "DELETE",
  });
}
