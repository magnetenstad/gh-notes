import { writable } from 'svelte/store';

export const user = {
	auth: writable<string>(import.meta.env.VITE_GITHUB_TOKEN),
	repo: writable<string>('gh-notes'),
	username: writable<string>('magnetenstad'),
	info: writable<object>({})
};
