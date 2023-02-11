<script lang="ts">
	import { doc, updateDoc } from 'firebase/firestore';
	import Select from 'svelte-select/Select.svelte';
	import { db } from '../../firebase/config';

	let options = ['PENDING', 'PROCESSING', 'SOLVED', 'REJECTED', 'FAILED'];
	export let docId = '';
	export let status = '';
	const changeStatus = async (e: any) => {
		await updateDoc(doc(db, 'Complaint-Registration', docId), {
			status: status.value
		});
	};
</script>

<Select items={options} bind:value={status} on:change={(e) => changeStatus(e)} />
