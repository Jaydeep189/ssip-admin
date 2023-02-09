<script>
	import { AlertCircle } from 'lucide-svelte';
	import { collection, query, where, doc, limit } from 'firebase/firestore';
	import { FirebaseApp, User, Collection, Doc } from 'sveltefire';
	import { auth, db } from '../../firebase/config';
</script>

<div class="bg-white rounded-lg">
	<FirebaseApp {auth} firestore={db}>
		<User let:user>
			<div class="flex gap-2 items-center p-3 px-5">
				<AlertCircle class="h-8" color="#6366f1" />
				<h2 class="font-bold text-xl">New Complaints</h2>
			</div>
			<Collection let:data ref={query(collection(db, 'Admin'), where('uid', '==', user?.uid))}>
				{#each data as dept}
					<Collection
						let:data={newComplaints}
						ref={query(
							collection(db, 'Complaint-Registration'),
							where('deptId', '==', dept.deptId),
							where('wardId', '==', dept.wardId),
							where('status', '==', 'PENDING'),
							limit(5)
						)}
					>
						{#if newComplaints.length !== 0}
							<div class="flex flex-col justify-between gap-2 w-10/12 mx-auto my-5">
								{#each newComplaints as c}
									<div class="flex items-center gap-3 bg-indigo-500 rounded-lg p-2">
										<AlertCircle class="h-8" color="#ffff" />
										<h3 class="text-white text-lg font-bold">{c.problemName}</h3>
									</div>
								{/each}
								<a
									class="transition-transform w-4/12 mx-auto mt-2 hover:scale-105 text-center duration-500 rounded-lg hover:bg-indigo-700 bg-gray-900 px-5 py-2.5 text-sm font-bold text-white shadow"
									href="/"
								>
									View More
								</a>
							</div>
						{:else}
							<div class="flex items-center justify-center">
								<h3 class="text-gray-500 text-lg font-bold">No New Complaints</h3>
							</div>
						{/if}
					</Collection>
				{/each}
			</Collection>
		</User>
	</FirebaseApp>
</div>
