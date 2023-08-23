import { writable } from "svelte/store";

export const movements = writable<Movement[]>([]);
export const progressions = writable<Progression[]>([]);
