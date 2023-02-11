<script>
	import '../app.css';
	import Sidebar from '../components/Sidebar.svelte';
</script>

<main class="flex bg-indigo-50">
	<Sidebar />
	<div class="mx-auto w-full ">
		<slot />
	</div>
</main>
