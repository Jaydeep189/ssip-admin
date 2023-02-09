<script>
	import Sidebar from '../components/Sidebar.svelte';
	import NewComplaints from '../components/dashboard/NewComplaints.svelte';
	import Done from '../components/dashboard/Done.svelte';
	import Proccessing from '../components/dashboard/Proccessing.svelte';
</script>

<div class="mx-auto w-full p-20">
	<div class="grid grid-cols-2 gap-5">
		<NewComplaints />
		<Done />
	</div>
	<Proccessing />
</div>
