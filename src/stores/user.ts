import { writable } from 'svelte/store';

export const user = {
	auth: writable<string>(import.meta.env.VITE_GITHUB_TOKEN),
	repo: writable<string>('web-notes'),
	owner: writable<string>('magnetenstad'),
	info: writable<object>({})
};
