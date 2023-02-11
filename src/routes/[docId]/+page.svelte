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

<div
	class="space-y-4 flex flex-col justify-between mt-20 bg-gray-50 rounded-xl shadow-xl p-5 transition-all duration-300 hover:scale-105 cursor-pointer"
>
	<div class="space-y-4">
		<div class="flex justify-between items-center gap-5">
			<h1 class=" font-bold text-lg">{data.docData.problemName}</h1>
			<h4 class="flex items-center gap-5">
				<Select
					items={collection}
					class="min-w-32"
					on:change={() => handleStatusChange()}
					bind:value={data.docData.status}
				/>
			</h4>
		</div>
		<p>
			{data.docData.desc}
		</p>
	</div>
	<table class="table-auto text-lg">
		<tbody>
			<tr>
				<td class="border-b-2">Ticket No :</td>
				<td class="border-b-2">{data.docId}</td>
			</tr>
			<tr>
				<td class="border-b-2">Ward :</td>
				<td class="border-b-2">{data.docData.wardName}</td>
			</tr>
			<tr>
				<td class="border-b-2">Area :</td>
				<td class="border-b-2">{data.docData.area}</td>
			</tr>
			<tr>
				<td class="border-b-2">Tenament No :</td>
				<td class="border-b-2">{data.docData.tenantNo}</td>
			</tr>
			<tr>
				<td class="border-b-2">Date :</td>
				<td class="border-b-2">{data.docData.date}</td>
			</tr>
			<tr>
				<td class="border-b-2">Provided Name :</td>
				<td class="border-b-2">{data.docData.contactName}</td>
			</tr>
			<tr>
				<td class="border-b-2">Provided Phone :</td>
				<td class="border-b-2">{data.docData.contactPhone}</td>
			</tr>
			<tr>
				<td class="border-b-2">Provided Email :</td>
				<td class="border-b-2">{data.docData.email}</td>
			</tr>
			<tr>
				<td class="border-b-2">Provided Address :</td>
				<td class="border-b-2">{data.docData.address}</td>
			</tr>
			<tr>
				<td class="border-b-2">Download Link :</td>
				<td class="border-b-2">
					<a href={data.docData.file} class="text-blue-500" download>Download</a>
				</td>
			</tr>
		</tbody>
	</table>
</div>
