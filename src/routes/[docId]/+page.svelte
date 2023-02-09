<script lang="ts">
	import { doc, updateDoc } from 'firebase/firestore';
	import Select from 'svelte-select/Select.svelte';
	import { db } from '../../firebase/config';
	import type { PageData } from './$types';
	let collection = [
		{ value: 'PENDING', label: 'PENDING' },
		{ value: 'PROCESSING', label: 'PROCESSING' },
		{ value: 'SOLVED', label: 'SOLVED' },
		{ value: 'FAILED', label: 'FAILED' },
		{ value: 'REJECTED', label: 'REJECTED' }
	];

	const handleStatusChange = async () => {
		const docRef = doc(db, 'Complaint-Registration', data.docId);
		console.log(data.docData.status);
		await updateDoc(docRef, { status: data.docData.status.value });
	};
	export let data: PageData;
</script>

<div class="w-8/12 mx-auto space-y-5 py-20">
	<div class="flex justify-between text-2xl font-bold">
		<h1>Problem : {data.docData.problemName}</h1>
		<h4>{data.docData.date}</h4>
	</div>
	<div class="flex justify-between text-xl  ">
		<h1>Ward : {data.docData.wardName}</h1>
		<h4 class="flex items-center gap-5">
			<span>Status: </span>
			<Select
				items={collection}
				on:change={() => handleStatusChange()}
				bind:value={data.docData.status}
			/>
		</h4>
	</div>
	<div class="flex justify-between text-xl  ">
		<h1>Document : <a href={data.docData.file} class="text-blue-500">Download</a></h1>
	</div>
	<h1 class=" font-bold text-2xl">Personal Details</h1>
	<div class="grid grid-col-2 justify-between text-2xl ">
		<h5>{data.docData.contactName}</h5>
		<h5>{data.docData.contactPhone}</h5>
		<h5>{data.docData.email}</h5>
		<h5>{data.docData.address}</h5>
		<h5>{data.docData.desc}</h5>
	</div>
	<div class="" />
	<!-- <h5>{data.docData.houseNo}</h5> -->
</div>
