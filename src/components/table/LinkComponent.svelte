<script>
	export let link = '';
	export let data = '';
	export let isDownload = false;
</script>

<a class="hover:text-blue-500" href={isDownload ? link : `/${link}`}>
	{data}
</a>
