import { goto } from "$app/navigation";
import { PUBLIC_API_BASE_URL } from "$env/static/public";
import { accessToken } from "./auth_token_store";
import { refreshAccessToken } from "./authentications";
import { get } from "svelte/store";

export async function authorizedGet(endpoint: string) {
  let response = await fetch(
    PUBLIC_API_BASE_URL + endpoint,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + get(accessToken) }
    }
  );

  if (response.status == 401) {
    if (await refreshAccessToken()) {
      response = await fetch(
        PUBLIC_API_BASE_URL + endpoint,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + get(accessToken) }
        }
      );

      if (response.status == 401) {
        goto("/signin")
      }
    }
  }

  return response;
}

export async function authorizedPost(endpoint: string, body: object) {
  const body_string = JSON.stringify(body);
  let response = await fetch(
    PUBLIC_API_BASE_URL + endpoint,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + get(accessToken) },
      body: body_string
    }
  );

  if (response.status == 401) {
    if (await refreshAccessToken()) {
      response = await fetch(
        PUBLIC_API_BASE_URL + endpoint,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + get(accessToken) },
          body: body_string
        }
      );

      if (response.status == 401) {
        goto("/signin")
      }
    }
  }

  return response;
}
