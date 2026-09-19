<script lang="ts">
	import Hideable from './Hideable.svelte';

	let {
		position = '',
		company = '',
		location = '',
		url = '',
		years = [],
		details = []
	}: {
		position?: string;
		company?: string;
		location?: string;
		url?: string;
		years?: string[];
		details?: string[];
	} = $props();
</script>

<div class="work-experience">
	<Hideable>
		<div class="work-header flex flex-col mb-2 print:mb-1 print:text-sm">
			<div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
				<div class="flex-1 text-left font-bold mb-1 sm:mb-0">{position}</div>
				{#if years.length}
					<div class="flex-1 text-left sm:text-right font-normal print:text-sm">
						{years.join(' – ')}
					</div>
				{/if}
			</div>
			<div class="flex flex-col sm:flex-row sm:gap-2 items-start sm:items-center print:text-sm">
				{#if url}
					<a href={url} target="_blank" rel="noreferrer" class="font-semibold">{company}</a>
				{:else}
					<p class="font-semibold">{company}</p>
				{/if}
				{#if location}<p class="font-normal">{location}</p>{/if}
			</div>
		</div>
		<ul class="text-left list-disc pl-8 print:pl-6">
			{#each details as detail (detail)}
				<Hideable>
					<li>
						{detail}
					</li>
				</Hideable>
			{/each}
		</ul>
	</Hideable>
</div>

<style lang="postcss">
	@reference "tailwindcss";

	.work-experience {
		@apply my-4 pl-8;
	}

	a {
		text-decoration: underline;
	}

	@media print {
		.work-experience {
			@apply my-1 pl-6;
		}

		li {
			break-inside: avoid;
		}

		.work-header {
			break-after: avoid;
		}
	}
</style>
