<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="w-screen h-full bg-black">
{@render children()}
</div>