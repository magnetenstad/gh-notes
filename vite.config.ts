import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'node-fetch': 'isomorphic-fetch'
		}
	},
	define: {
		global: {}
	}
};

export default config;
