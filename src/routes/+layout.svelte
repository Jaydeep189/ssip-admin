<script>
	import '../app.css';
	import Sidebar from '../components/Sidebar.svelte';
</script>

<main class="grid grid-cols-24 bg-indigo-50">
	<Sidebar />
	<div class="mx-auto col-span-19">
		<slot />
	</div>
</main>
