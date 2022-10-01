<script lang="ts">
	import { goto } from '$app/navigation';
	import { Octokit } from 'octokit';
	import { user } from '$stores/user';

	let octokit: Octokit;
	let form = {
		auth: '',
		username: '',
		repo: ''
	};

	user.auth.subscribe((auth) => {
		octokit = new Octokit({ auth });
		form.auth = auth;
	});
	user.username.subscribe((value) => (form.username = value));
	user.repo.subscribe((value) => (form.repo = value));

	const isAuthenticated = async () => {
		try {
			const userInfo = await octokit.rest.users.getByUsername({ username: form.username });
			user.info.set(userInfo);
			return true;
		} catch {
			return false;
		}
	};

	const tryRedirect = async () => {
		if (await isAuthenticated()) {
			goto('/path/root');
		}
	};

	const onSubmit = () => {
		user.auth.set(form.auth);
		user.username.set(form.username);
		user.repo.set(form.repo);
		tryRedirect();
	};
</script>

<div class="col">
	<label for="auth">GitHub Token</label>
	<input for="auth" type="text" bind:value={form.auth} />
	<label for="username">Username</label>
	<input for="username" type="text" bind:value={form.username} />
	<label for="repo">Repository</label>
	<input for="repo" type="text" bind:value={form.repo} />
	<button on:click={onSubmit}>Submit</button>
</div>

<style>
	.col {
		gap: 1em;
	}
</style>
