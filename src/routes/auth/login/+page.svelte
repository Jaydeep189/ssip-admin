<script lang="ts">
	import { browser } from '$app/environment';
	import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
	import type { ApplicationVerifier } from 'firebase/auth';
	import Loading from '../../../components/Loading.svelte';
	import AMCLogo from '../../../assets/amc_logo.jpg';
	import { collectionStore } from 'sveltefire';
	import { auth, db } from '../../../firebase/config';
	import { onMount, prevent_default } from 'svelte/internal';
	import Register from '../../../functions/Register';
	import Select from 'svelte-select';
	import { collection, getDocs, query, where } from 'firebase/firestore';
	auth.useDeviceLanguage();
	let appVerifier: ApplicationVerifier;
	onMount(() => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			'sign-in-button',
			{
				size: 'invisible',
				callback: (response: any) => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					sendOTP();
					handleSignIn();
				}
			},
			auth
		);
		appVerifier = window.recaptchaVerifier;
	});
	let phoneError = '';
	const sendOTP = async () => {
		const q = query(collection(db, 'User'));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
		});

		console.log(phoneNumber);
		isLoading = true;
		signInWithPhoneNumber(auth, '+91' + phoneNumber, appVerifier).then((confirmationResult) => {
			window.confirmationResult = confirmationResult;
			console.log(window.confirmationResult);
			isCode = true;
			isLoading = false;
			// ...
		});
	};
	const handleSignIn = async () => {
		isLoading = true;
		window.confirmationResult.confirm(code).then((result: any) => {
			const user = result.user;
			localStorage.setItem('uid', user.uid);
			Register(user.uid, name, address, email, aadhar, age, ward.value, department.value);
			isLoading = false;
			window.location.replace('/');
		});
		isLoading = false;
	};
	let phoneNumber = '';
	let code = '';
	let isLoading = false;
	let isCode = false;
	let name = '';
	let aadhar = '';
	let email = '';
	let address = '';
	interface Select {
		value: string;
		label: string;
	}
	let department: Select;
	let ward: Select;
	let age = '';
</script>

<section class="max-w-8xl mx-auto">
	<div class="flex justify-center my-24 items-center">
		<!-- <form class="bg-white shadow-xl rounded-lg grid grid-rows-1" action="">
			{#if isCode}
				<label class="text-xl font-outfit font-medium" for="code">Enter OTP Code</label>
				<input name="code" type="text" class="form-input rounded-lg w-96" bind:value={code} />
			{:else}
				<label class="text-xl font-outfit font-medium" for="phone">Enter Phone Number</label>
				<input name="phone" type="text" class="form-input rounded-lg" bind:value={phoneNumber} />
			{/if}

			<button id="sign-in-button" on:click={() => (isCode ? handleSignIn() : sendOTP())}
				>Send Code</button
			>
		</form> -->
		<form
			on:submit={prevent_default}
			action="#"
			class="mt-8 grid grid-cols-6 gap-6 bg-gray-50 shadow-xl p-10 rounded-lg"
		>
			<div class="col-span-12 flex items-center justify-center gap-5">
				<img src={AMCLogo} alt="logo" class="w-20 h-20" />
				<h1 class="font-black text-6xl">AMC</h1>
			</div>
			<h1 class="text-2xl text-center font-medium text-indigo-500 col-span-12">
				Login to Admin Account
			</h1>
			{#if isCode}
				<div class="col-span-12">
					<label for="code" class="block text-sm font-medium text-gray-700"> Enter Code </label>

					<input
						type="text"
						name="code"
						bind:value={code}
						class="mt-1 w-full  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
					/>
				</div>
			{:else}
				<div class="col-span-12">
					<label for="phone" class="block text-sm font-medium text-gray-700"> Phone Number </label>
					<input
						type="text"
						name="phone"
						maxlength="10"
						minlength="10"
						bind:value={phoneNumber}
						class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
					/>
				</div>
			{/if}

			<div class="col-span-12 sm:flex sm:items-center sm:gap-4">
				<button
					id="sign-in-button"
					type="submit"
					on:click={() => (isCode ? handleSignIn() : sendOTP())}
					class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
				>
					{#if isLoading}
						<Loading />
					{:else}
						{isCode ? 'CONFIRM OTP' : 'GET OTP'}
					{/if}
				</button>
				<p class="flex justify-center text-lg text-red-500">
					{phoneError}
				</p>

				<p class="mt-4 text-sm text-gray-500 sm:mt-0">
					create account?
					<a href="/auth/register" class="text-gray-700 underline">Register</a>.
				</p>
			</div>
		</form>
	</div>
</section>
