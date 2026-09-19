<script lang="ts">
	let {
		name = 'Foo',
		nickname = '',
		title = '',
		summary = '',
		phone = '',
		email = '',
		github = '',
		linkedin = '',
		location = '',
		website = ''
	}: {
		name?: string;
		nickname?: string;
		title?: string;
		summary?: string;
		phone?: string;
		email?: string;
		github?: string;
		linkedin?: string;
		location?: string;
		website?: string;
	} = $props();
</script>

<div class="flex flex-col items-center justify-center print:flex-col text-sm sm:text-base gap-2">
	<h2
		class="text-3xl sm:text-3xl md:text-4xl lg:text-6xl print:text-4xl text-center print:pt-0 break-words"
	>
		{name}
	</h2>

	{#if nickname || title}
		<div class="text-center font-semibold">
			{#if nickname}({nickname}){/if}
			{#if nickname && title}
				·
			{/if}
			{#if title}{title}{/if}
		</div>
	{/if}

	<div
		class="contacts w-full flex flex-col sm:flex-row print:flex-row flex-wrap justify-center items-center gap-x-2 gap-y-1 text-center print:text-center print:text-xs text-xs sm:text-sm"
	>
		{#if location}<p>{location}</p>{/if}
		{#if phone}<p><a href={`tel:${phone}`}>{phone}</a></p>{/if}
		{#if email}<p><a href={`mailto:${email}`}>{email}</a></p>{/if}
		{#if linkedin}
			<p>
				<a href={`https://www.linkedin.com/in/${linkedin}`} target="_blank" rel="noreferrer"
					>linkedin.com/in/{linkedin}</a
				>
			</p>
		{/if}
		{#if github}
			<p>
				<a href={`https://github.com/${github}`} target="_blank" rel="noreferrer"
					>github.com/{github}</a
				>
			</p>
		{/if}
		{#if website}
			<p><a href={`https://${website}`} target="_blank" rel="noreferrer">{website}</a></p>
		{/if}
	</div>

	{#if summary}
		<p class="w-full text-left text-sm sm:text-base print:text-sm">{summary}</p>
	{/if}
</div>

<style lang="postcss">
	a {
		text-decoration: underline;
	}

	.contacts p:not(:last-child)::after {
		content: '•';
		margin-left: 0.5rem;
	}
</style>
