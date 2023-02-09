<script>
	import { Timer } from 'lucide-svelte';
	import { collection, query, where, doc, limit } from 'firebase/firestore';
	import { FirebaseApp, User, Collection, Doc } from 'sveltefire';
	import { auth, db } from '../../firebase/config';
</script>

<div class="bg-white rounded-lg mt-5">
	<FirebaseApp {auth} firestore={db}>
		<User let:user>
			<div class="flex gap-2 items-center p-3 px-5">
				<Timer class="h-8" color="#6366f1" />
				<h2 class="font-bold text-xl">Processing</h2>
			</div>
			<Collection let:data ref={query(collection(db, 'Admin'), where('uid', '==', user?.uid))}>
				{#each data as dept}
					<Collection
						let:data={newComplaints}
						ref={query(
							collection(db, 'Complaint-Registration'),
							where('deptId', '==', dept.deptId),
							where('wardId', '==', dept.wardId),
							where('status', '==', 'PROCESSING'),
							limit(5)
						)}
					>
						<div class="flex flex-col gap-2 w-10/12 mx-auto my-5">
							<div class="flex items-center gap-3 bg-indigo-500 rounded-lg p-2">
								{#if newComplaints.length !== 0}
									<div class="flex flex-col justify-between gap-2 w-11/12 mx-auto my-5">
										{#each newComplaints as c}
											<div class="flex flex-col w-full">
												<div class="grid grid-cols-2 gap-3">
													<div class="flex justify-start items-center gap-2">
														<Timer class=" shink-0" size={40} color="#ffff" />
														<h3 class="text-white text-lg font-bold">{c.problemName}</h3>
													</div>
													<div>
														<h2 class="text-white text-lg font-semibold text-right pr-2">
															{c.date.toDate().toLocaleDateString()}
														</h2>
													</div>
												</div>
												<div class=" gap-5 p-1 mt-3">
													<Collection
														let:data
														ref={query(collection(db, 'User'), where('uid', '==', c.userId))}
													>
														{#each data as d}
															<div>
																<h4 class="text-white font-medium text-right">User: {d.name}</h4>
															</div>
														{/each}
													</Collection>
												</div>
											</div>
										{/each}
									</div>
								{:else}
									<div class="flex items-center justify-center ">
										<h3 class="text- text-lg font-bold">No Processing Complaints</h3>
									</div>
								{/if}
							</div>

							<a
								class="transition-transform w-4/12 mb-5 mx-auto mt-2 hover:scale-105 text-center duration-500 rounded-lg hover:bg-indigo-700 bg-gray-900 px-5 py-2.5 text-sm font-bold text-white shadow"
								href="/"
							>
								View More
							</a>
						</div>
					</Collection>
				{/each}
			</Collection>
		</User>
	</FirebaseApp>
</div>
