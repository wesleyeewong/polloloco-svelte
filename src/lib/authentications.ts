import { PUBLIC_API_BASE_URL } from "$env/static/public";
import { setAccessToken, setRefreshToken, refreshToken } from "./auth_token_store";
import { get } from "svelte/store";
import { goto } from "$app/navigation";
import { browser } from "$app/environment";

export async function getAuthTokensViaGoogleAuth(credential: string) {
  if (browser) {
    const endpoint = PUBLIC_API_BASE_URL + "/auth/google";
    const options = {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oauth_token: credential })
    }
    const res = await fetch(endpoint, options);

    if (res.ok) {
      const data = await res.json();

      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);

      goto("/app/day")
    }
  }
}

export async function refreshAccessToken() {
  if (browser && refreshToken) {
    const endpoint = PUBLIC_API_BASE_URL + "/access_tokens";
    const options = { method: "POST", headers: { "Authorization": "Bearer " + get(refreshToken) } }

    const response = await fetch(endpoint, options);

    if (response.ok) {
      const data = await response.json();

      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);

      return true;
    } else {
      return false;
    }
  }

  return false;
}
