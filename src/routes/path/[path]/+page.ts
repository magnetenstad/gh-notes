import { error } from '@sveltejs/kit';
import { Octokit } from 'octokit';
import { user } from '../../../stores/user';

export interface DataItem {
	type: 'file' | 'dir';
	name: string;
	path: string;
	content?: string;
}

// TODO: Find typing
export async function load({ params }: { params: { path: string } }) {
	const octoParams = {
		owner: '',
		repo: '',
		path: params.path === 'root' ? '' : params.path.replaceAll('>', '/')
	};

	let octokit: Octokit;
	user.auth.subscribe((auth) => (octokit = new Octokit({ auth })));
	user.username.subscribe((value) => (octoParams.owner = value));
	user.repo.subscribe((value) => (octoParams.repo = value));

	const getDirContent = () => octokit.rest.repos.getContent(octoParams);

	const data = (await getDirContent()).data;

	if (!data) {
		throw error(404, 'Not found');
	}

	if (Object.hasOwn(data, 'type')) {
		// a file
		return {
			path: octoParams.path,
			dataItem: data as DataItem
		};
	} else {
		// a directory
		return {
			path: octoParams.path,
			dataItems: data as DataItem[]
		};
	}
}
