<script lang="ts">
	import GroupComplaints from '../../components/table/GroupComplaints.svelte';
	import { Collection, FirebaseApp, User, Doc } from 'sveltefire';
	import { auth, db } from '../../firebase/config';
	import { collection, doc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
	import { each } from 'svelte/internal';
	import Select from 'svelte-select/Select.svelte';
	let selectStatus: { value: string; label: string } = { value: '', label: '' };
</script>

<FirebaseApp {auth} firestore={db}>
	<User let:user>
		<Collection let:data ref={query(collection(db, 'Admin'), where('uid', '==', user?.uid))}>
			{#each data as d}
				<Collection
					let:data={com}
					ref={query(
						collection(db, 'Complaint-Registration'),
						where('deptId', '==', d.deptId),
						where('wardId', '==', d.wardId),
						where('status', '!=', 'SOLVED'),
						where('isGroup', '==', true)
					)}
				>
					{#each [...new Set(com.map((item) => item.groupId))] as c}
						<Collection
							let:data={groupData}
							ref={query(
								collection(db, 'Complaint-Registration'),
								where('groupId', '==', c),
								where('isGroup', '==', true)
							)}
						>
							<div class=" rounded-xl p-5 text-xl font-bold">
								<Collection
									let:data={name}
									ref={query(
										collection(db, 'Complaint-Registration'),
										where('groupId', '==', c),
										where('isGroup', '==', true),
										limit(1)
									)}
								>
									{#each name as n}
										<div class="flex justify-between">
											<h1 class="py-2">Group : {n.problemName}</h1>
											<h1 class="py-2 text-sm">Group Id : {c}</h1>
										</div>
									{/each}
								</Collection>
								<div class="p-2">
									<GroupComplaints data={groupData} groupId={c} />
								</div>
							</div>
						</Collection>
					{/each}
				</Collection>
				<Collection
					let:data={com}
					ref={query(
						collection(db, 'Complaint-Registration'),
						where('deptId', '==', d.deptId),
						where('wardId', '==', d.wardId),
						where('status', '!=', 'SOLVED'),
						where('isGroup', '==', false)
					)}
				>
					{#each [...new Set(com.map((item) => item.groupId))] as c}
						<Collection
							let:data={groupData}
							ref={query(
								collection(db, 'Complaint-Registration'),
								where('groupId', '==', c),
								where('isGroup', '==', false)
							)}
						>
							<div class=" rounded-xl p-5 text-xl font-bold">
								<Collection
									let:data={name}
									ref={query(
										collection(db, 'Complaint-Registration'),
										where('groupId', '==', c),
										where('isGroup', '==', false),
										limit(1)
									)}
								>
									{#each name as n}
										<div class="flex justify-between">
											<h1 class="py-2">Group : {n.problemName}</h1>
											<h1 class="py-2 text-sm">Group Id : {c}</h1>
										</div>
									{/each}
								</Collection>
								<div class="p-2">
									<GroupComplaints data={groupData} groupId={c} />
								</div>
							</div>
						</Collection>
					{/each}
				</Collection>
			{/each}
		</Collection>
	</User>
</FirebaseApp>
