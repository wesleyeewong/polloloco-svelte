import { writable, get } from "svelte/store";
import { browser } from "$app/environment";

export const accessToken = writable(browser ? localStorage.getItem("polloloco_access_token") : null);
export const refreshToken = writable(browser ? localStorage.getItem("polloloco_refresh_token") : null);

export function setAccessToken(token: string) {
  if (browser) { localStorage.setItem("polloloco_access_token", token); }
  accessToken.set(token);
}

export function setRefreshToken(token: string) {
  if (browser) { localStorage.setItem("polloloco_refresh_token", token); }
  refreshToken.set(token);
}
