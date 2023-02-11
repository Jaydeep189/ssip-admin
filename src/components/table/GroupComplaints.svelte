<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		createSvelteTable,
		getSortedRowModel,
		getPaginationRowModel,
		getFilteredRowModel,
		flexRender,
		getCoreRowModel,
		renderComponent
	} from '@tanstack/svelte-table';

	import type { ColumnDef, TableOptions } from '@tanstack/svelte-table';
	import Select from 'svelte-select/Select.svelte';
	let selectStatus: { value: string; label: string } = { value: '', label: '' };
	import { auth, db } from '../../firebase/config';
	import { onMount } from 'svelte/internal';
	import { userStore } from 'sveltefire';
	import LinkComponent from '../../components/table/LinkComponent.svelte';
	import getCompletedComplaints from '../../functions/CompletedComplaints';
	import ChangeStatus from './ChangeStatus.svelte';
	import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
	type Complaints = {
		problemName: string;
		wardName: string;
		status: string;
		date: string;
	};

	const defaultColumns: ColumnDef<Complaints>[] = [
		{
			accessorKey: 'id',
			header: () => 'Ticket No',
			cell: (info) =>
				renderComponent(LinkComponent, {
					link: info.getValue(),
					data: info.getValue(),
					isDownload: false
				})
		},
		{
			accessorKey: 'date',
			header: () => 'DATE',
			footer: (info) => info.column.id,
			cell: (info) =>
				renderComponent(LinkComponent, {
					link: info.cell.row.getValue('id'),
					data: info.getValue().toDate().toDateString(),
					isDownload: false
				})
		},
		{
			accessorKey: 'tenantNo',
			header: () => 'TENANT NO',
			footer: (info) => info.column.id,
			cell: (info) =>
				renderComponent(LinkComponent, {
					link: info.cell.row.getValue('id'),
					data: info.getValue(),
					isDownload: false
				})
		},
		{
			accessorKey: 'file',
			header: () => 'DOCUMENT',
			cell: (info) =>
				renderComponent(LinkComponent, {
					link: info.getValue() !== '' ? info.getValue() : info.cell.row.getValue('id'),
					data: info.getValue() !== '' ? 'Download' : 'No File',
					isDownload: true
				}),
			footer: (info) => info.column.id
		},
		{
			accessorKey: 'status',
			header: () => 'STATUS',
			cell: (info) =>
				renderComponent(ChangeStatus, {
					docId: info.cell.row.getValue('id'),
					status: info.getValue()
				}),
			footer: (info) => info.column.id
		}
	];
	export let data;
	onMount(async () => {
		setTimeout(() => {
			options.update((options) => ({
				...options,
				data: data
			}));
		}, 200);
	});

	const options = writable<TableOptions<Complaints>>({
		data: [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});
	const table = createSvelteTable(options);
	import { where } from 'firebase/firestore';

	const UpdateStatusAll = async () => {
		const q = query(
			collection(db, 'Complaint-Registration'),
			where('groupId', '==', groupId),
			where('isGroup', '==', true)
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(async (document) => {
			await updateDoc(doc(db, 'Complaint-Registration', document.id), {
				status: selectStatus.value
			}).then(() => {
				window.location.reload();
			});
		});
	};
	const handleMerge = async () => {
		const q = query(collection(db, 'Complaint-Registration'), where('groupId', '==', mergeGroupId));
		const querySnapshot = await getDocs(q);
		querySnapshot.docs.forEach(async (document) => {
			const q = query(collection(db, 'Complaint-Registration'), where('groupId', '==', groupId));
			const querySnapshot = await getDocs(q);
			if (document.data().isGroup) {
				querySnapshot.docs.forEach(async (document) => {
					if (document.data().isGroup) {
						alert("Can't merge be Merged");
					} else {
						await updateDoc(doc(db, 'Complaint-Registration', document.id), {
							groupId: mergeGroupId,
							isGroup: true
						}).then(() => {
							window.location.reload();
						});
					}
				});
			} else {
				const q = query(collection(db, 'Complaint-Registration'), where('groupId', '==', groupId));
				const querySnapshot = await getDocs(q);
				querySnapshot.docs.forEach(async (document) => {
					await updateDoc(doc(db, 'Complaint-Registration', document.id), {
						isGroup: true
					});
				});
				await updateDoc(doc(db, 'Complaint-Registration', document.id), {
					groupId: groupId,
					isGroup: true
				}).then(() => {
					window.location.reload();
				});
			}
		});
	};
	export let groupId = '';
	export let mergeGroupId = '';
</script>

<div class="relative flex flex-col border-b-2 border-gray-400 pb-10">
	<div class="overflow-x-auto shadow-md max-sm:py-10">
		<div class="inline-block  min-w-full align-middle">
			<div class="divide-y divide-gray-200 rounded-lg border bg-white p-2 shadow-md ">
				<div class="overflow-hidden">
					<table class="min-w-full divide-y divide-gray-200 bg-white ">
						<thead class="bg-white ">
							{#each $table.getHeaderGroups() as headerGroup}
								<tr class="py-3 px-4 pr-0">
									{#each headerGroup.headers as header}
										<th
											class="py-3 pl-6 pt-3 text-left text-xs font-medium uppercase text-gray-500"
											class:select-none={header.column.getCanSort()}
											on:click={header.column.getToggleSortingHandler()}
										>
											<div class="flex flex-col items-start gap-5">
												<div class="flex shrink-0 items-center gap-2">
													{#if !header.isPlaceholder}
														<svelte:component
															this={flexRender(header.column.columnDef.header, header.getContext())}
														/>
														{{
															asc: ' 🔼',
															desc: ' 🔽'
														}[header.column.getIsSorted().toString()] ?? ''}
													{/if}
												</div>
												{#if header.column.getCanFilter()}
													<div class="relative max-w-xs">
														<input
															title="name-search"
															value={header.column.getFilterValue() || ''}
															on:change={(e) => {
																header.column.setFilterValue(e.target.value);
															}}
															type="text"
															class="block rounded-md border-gray-200 py-2 pl-8 text-xs focus:border-blue-500 focus:ring-blue-500"
															placeholder=""
														/>
														<div
															class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2"
														>
															<svg
																class="h-3.5 w-3.5 text-gray-400"
																xmlns="http://www.w3.org/2000/svg"
																width={16}
																height={16}
																fill="currentColor"
																viewBox="0 0 16 16"
															>
																<path
																	d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
																/>
															</svg>
														</div>
													</div>
												{/if}
											</div>
										</th>
									{/each}
								</tr>
							{/each}
						</thead>
						<tbody class="divide-y divide-gray-200 ">
							{#each $table.getRowModel().rows as row}
								<tr>
									{#each row.getVisibleCells() as cell}
										<td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 ">
											<svelte:component
												this={flexRender(cell.column.columnDef.cell, cell.getContext())}
											/>
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div class="py-1 px-4">
					<nav class="flex items-center space-x-2">
						<button
							on:click={() => $table.previousPage()}
							disabled={!$table.getCanPreviousPage()}
							class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-4 text-lg font-medium transition-colors duration-500 hover:bg-blue-500 hover:text-white"
						>
							<span aria-hidden="true" on:click={() => $table.previousPage()}>«</span>
							<span class="sr-only">Previous</span>
						</button>
						<button
							on:click={() => $table.nextPage()}
							disabled={!$table.getCanNextPage()}
							class="flex h-10 w-10 items-center justify-center rounded-full p-2 text-center text-lg font-medium transition-colors duration-500 hover:bg-blue-500 hover:text-white"
						>
							<span class="sr-only">Next</span>
							<span aria-hidden="true">»</span>
						</button>
						<span class="text-sm">
							Page{' '}
							<span class="font-semibold">
								<span>{$table.getState().pagination.pageIndex + 1}</span> / {$table.getPageCount()}
							</span>{' '}
						</span>
					</nav>
				</div>
			</div>
		</div>
	</div>
	<div class="flex justify-center items-center gap-2 mt-5">
		<div>
			<h1>Update All Group Status</h1>
		</div>
		<div class="basis-1/2">
			<Select
				items={['PENDING', 'PROCESSING', 'SOLVED', 'REJECTED', 'FAILED']}
				bind:value={selectStatus}
				on:change={(e) => UpdateStatusAll()}
			/>
		</div>
	</div>
	<div class="flex justify-center items-center gap-5 mt-5">
		<div>
			<h1>Enter GroupId to Merge</h1>
		</div>
		<div class="basis-1/2">
			<input type="text" bind:value={mergeGroupId} class=" form-input rounded-lg" />
			<button
				id="sign-in-button"
				on:click={() => handleMerge()}
				class="inline-block shrink-0 rounded-md border border-orange-600 bg-orange-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-orange-600 focus:outline-none focus:ring active:text-orange-500"
			>
				MERGER
			</button>
		</div>
	</div>
</div>
