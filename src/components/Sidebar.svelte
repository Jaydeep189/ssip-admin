<script>
	import { LayoutDashboard, AlertCircle, Timer, LogOut, CheckCircle, User } from 'lucide-svelte';
	import AMCLogo from '../assets/amc_logo.jpg';
</script>

<div class="basis-3/12 flex sticky top-0 z-1 h-screen flex-col justify-between border-r bg-white">
	<div class="px-4 py-6">
		<div class="flex gap-5 justify-center items-center">
			<img src={AMCLogo} class="h-16" alt="" />
			<h1 class="font-extrabold text-4xl font-outfit">AMC</h1>
		</div>
		<nav class="mt-20 flex flex-col space-y-1">
			<a href="#" class="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700">
				<LayoutDashboard class="h-8" />
				<span class="ml-3 text-lg font-medium"> Dashboard </span>
			</a>
			<a href="#" class="flex items-center rounded-lg px-4 py-2 text-gray-500">
				<AlertCircle class="h-8" />

				<span class="ml-3 text-lg font-medium"> New Complaint List </span>
			</a>
			<a href="#" class="flex items-center rounded-lg px-4 py-2 text-gray-500">
				<Timer class="h-8" />
				<span class="ml-3 text-lg font-medium"> Currently Processing </span>
			</a>
			<a href="#" class="flex items-center rounded-lg px-4 py-2 text-gray-500">
				<CheckCircle class="h-8" />

				<span class="ml-3 text-lg font-medium"> Completed </span>
			</a>
			<a href="#" class="flex items-center rounded-lg px-4 py-2 text-gray-500">
				<LogOut class="h-8" />

				<span class="ml-3 text-lg font-medium"> Logout </span>
			</a>
		</nav>
	</div>

	<div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
		<a href="#" class="flex shrink-0 items-center justify-evenly bg-white p-4 hover:bg-gray-50">
			<User size={34} />
			<div class="ml-1.5">
				<p class="">
					<strong class="block font-medium">Jaydeep Sharma</strong>

					<span> jaydeep@amc.com </span>
				</p>
			</div>
		</a>
	</div>
</div>
