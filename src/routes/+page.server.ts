import { API_BASE_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  return { api_base_url: API_BASE_URL };
}) satisfies PageServerLoad;
