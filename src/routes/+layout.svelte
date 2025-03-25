<script lang="ts">
	import '@/app.css';
	let { children } = $props();
</script>

<div class="flex flex-col app">
	{@render children()}
</div>

<style>
</style>
