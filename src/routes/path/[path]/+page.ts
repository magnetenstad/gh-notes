import { error } from '@sveltejs/kit';
import { Octokit } from 'octokit';

export interface DataItem {
	type: 'file' | 'dir';
	name: string;
	path: string;
	content?: string;
}

// TODO: Find typing
export async function load({ params }: { params: { path: string } }) {
	const auth = import.meta.env.VITE_GITHUB_TOKEN;
	const repo = 'web-notes';
	const owner = 'magnetenstad';
	const path = params.path === 'root' ? '' : params.path.replaceAll('>', '/');
	const octokit = new Octokit({ auth });

	const getDirContent = async () => {
		return await octokit.rest.repos.getContent({
			owner,
			repo,
			path
		});
	};

	const data = (await getDirContent()).data;

	if (!data) {
		throw error(404, 'Not found');
	}

	if (Object.hasOwn(data, 'type')) {
		// a file
		return {
			path,
			dataItem: data as DataItem
		};
	} else {
		// a directory
		return {
			path,
			dataItems: data as DataItem[]
		};
	}
}
