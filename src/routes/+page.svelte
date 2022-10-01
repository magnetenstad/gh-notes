<script lang="ts">
	import { goto } from '$app/navigation';
	import { Octokit } from 'octokit';
	import { onMount } from 'svelte';
	import { user } from '../stores/user';

	let octokit: Octokit;
	let owner: string;
	let inputValue: string;

	user.auth.subscribe((auth) => (octokit = new Octokit({ auth })));
	user.owner.subscribe((value) => (owner = value));

	const isAuthenticated = async () => {
		try {
			const userInfo = await octokit.rest.users.getByUsername({ username: owner });
			user.info.set(userInfo);
			return true;
		} catch {
			return false;
		}
	};

	const tryRedirect = async () => {
		if (await isAuthenticated()) goto('/path/root');
	};

	const onSubmit = () => {
		user.auth.set(inputValue);
		tryRedirect();
	};

	onMount(() => {
		tryRedirect();
	});
</script>

<div class="col">
	<form>
		<p>Please provide a GitHub Token: {inputValue}</p>
		<input type="text" bind:value={inputValue} on:change={onSubmit} />
	</form>
</div>
