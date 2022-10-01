<script lang="ts">
	import type { PageData } from './$types';
	import { goto, invalidateAll } from '$app/navigation';
	import type { DataItem } from './+page';
	import { Base64 } from 'js-base64';

	export let data: PageData;

	const clickDataItem = async (dataItem: DataItem) => {
		await goto(`/path/${dataItem.path.replaceAll('/', '>')}`);
		await invalidateAll();
	};

	const splitLast = (str: string, sep: string) => {
		const i = str.lastIndexOf(sep);
		return i < 1 ? [str] : [str.substring(0, i), str.substring(i + sep.length)];
	};
</script>

<div class="col">
	<small>{data.path.length > 0 ? data.path : '/'}</small>
	{#if data.dataItems}
		<br />
		{#each data.dataItems as dataItem}
			<div class="data-item" on:click={() => clickDataItem(dataItem)}>
				<span>{splitLast(dataItem.name, '.')[0]}</span>
				<span>{splitLast(dataItem.name, '.')[1] ?? ''}</span>
			</div>
		{/each}
	{/if}
	{#if data.dataItem}
		<h4>{data.dataItem.name}</h4>
		<div class="content">{Base64.atob(data.dataItem.content ?? '')}</div>
	{/if}
</div>

<style>
	.data-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		margin: 0.1em;
		min-width: 200px;

		cursor: pointer;
	}

	.data-item:hover {
		text-decoration: underline;
	}

	.content {
		white-space: pre-wrap;
		background-color: lightgrey;
		padding: 2em;
		border-radius: 0.3em;
		min-width: 400px;
	}
</style>
