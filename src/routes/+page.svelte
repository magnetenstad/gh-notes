<script lang="ts">
	import { goto } from '$app/navigation';

	const click = () => goto('/path/root');
</script>

<button on:click={click}>Root</button>
