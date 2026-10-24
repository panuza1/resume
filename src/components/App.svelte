<script lang="ts">
	import type { IProfileResp } from '../types';
	import Hideable from './Hideable.svelte';
	import Intro from './Intro.svelte';
	import Work from './Work.svelte';

	let { profile }: { profile: IProfileResp } = $props();

	const {
		intro = {} as IProfileResp['intro'],
		projects = [],
		achievements = [],
		technologies = [],
		workExperiences = [],
		educations = [],
		interests = [],
		resumeUrl: { sourceLink = '', fullVersionLink = '' } = {}
	} = $derived(profile || {});

	// sourceLink is empty until the profile loads; keep dataLink empty too so it
	// never becomes a bogus relative URL.
	const dataLink = $derived(sourceLink ? `${sourceLink}/blob/main/static/data/profile.json` : '');
</script>

<header class="web-only text-center px-4 py-3 sm:p-6 bg-green-400 text-white w-full">
	<h1 class="text-2xl sm:text-4xl">Resumette</h1>

	<div class="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-1">
		<button onclick={() => window.print()} class="underline text-base sm:text-lg py-1"
			>[Print]</button
		>
		<a href={sourceLink} target="_blank" rel="noopener" class="py-1">[Source]</a>
		<a href={dataLink} target="_blank" rel="noopener" class="py-1">[Data]</a>
	</div>

	<p class="text-xs sm:text-base mt-1 sm:mt-2">
		Printer-friendly standard résumé, any HTML tags with <code>web-only</code> CSS class will be hidden
		on print.
	</p>
	<p class="text-xs sm:text-base">
		You can click at any sections or lines hide some information before printing.
	</p>
</header>

<main class="text-center px-3 py-4 m-0 sm:p-4 md:m-8 xl:mx-auto max-w-7xl">
	<Intro {...intro} />

	{#if educations.length}
		<section>
			<Hideable>
				<h2 class="text-xl sm:text-2xl uppercase text-left">Education</h2>
				<hr />

				<ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 break-words">
					{#each educations as edu (edu)}
						<Hideable>
							<li>
								<strong>{edu.head}</strong>, {edu.details}
							</li>
						</Hideable>
					{/each}
				</ul>
			</Hideable>
		</section>
	{/if}

	{#if workExperiences.length}
		<section>
			<Hideable>
				<h2 class="text-xl sm:text-2xl uppercase text-left">Work Experience</h2>
				<hr />

				{#each workExperiences as exp (exp)}
					<Work {...exp} />
				{/each}
			</Hideable>
		</section>
	{/if}

	{#if technologies.length}
		<section>
			<Hideable>
				<h2 class="text-xl sm:text-2xl uppercase text-left">Technologies and Languages</h2>
				<hr />
				<ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 break-words">
					{#each technologies as tech (tech)}
						<Hideable>
							<li>
								<div class="flex flex-col sm:flex-row print:flex-row">
									<span
										class="w-40 flex-none whitespace-nowrap font-semibold sm:font-normal print:font-normal"
										>{tech.section}</span
									>
									<span class="flex-1">{tech.details}</span>
								</div>
							</li>
						</Hideable>
					{/each}
				</ul>
			</Hideable>
		</section>
	{/if}

	{#if projects.length}
		<section>
			<Hideable>
				<h2 class="text-xl sm:text-2xl uppercase text-left">Projects</h2>
				<hr />

				<ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 break-words">
					{#each projects as project (project)}
						<Hideable hide={project.hide}>
							<li>
								{#if project.url}
									<a href="https://{project.url}" target="_blank" rel="noreferrer"
										><strong>{project.name}</strong></a
									>
								{:else}
									<strong>{project.name}</strong>
								{/if}
								- {project.details}
							</li>
						</Hideable>
					{/each}
				</ul>
			</Hideable>
		</section>
	{/if}

	{#if achievements.length}
		<section>
			<Hideable>
				<h2 class="text-xl sm:text-2xl uppercase text-left">Achievements &amp; Certifications</h2>
				<hr />

				<ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 break-words">
					{#each achievements as achievement (achievement)}
						<Hideable hide={achievement.hide}>
							<li><strong>{achievement.name}</strong> - {achievement.details}</li>
						</Hideable>
					{/each}
				</ul>
			</Hideable>
		</section>
	{/if}

	{#if interests.length}
		<section>
			<Hideable>
				<h2 class="text-xl sm:text-2xl uppercase text-left">Other</h2>
				<hr />

				<ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 break-words">
					{#each interests as interest (interest)}
						<Hideable>
							<li>
								{interest}
							</li>
						</Hideable>
					{/each}
				</ul>
			</Hideable>
		</section>
	{/if}

	<footer class="print-only">
		(See <a href={fullVersionLink} target="_blank" rel="noopener">full version</a>
		or <a href={sourceLink} target="_blank" rel="noopener">source</a>)
	</footer>
</main>

<style lang="postcss">
	@reference "tailwindcss";

	main {
		overflow-x: hidden;
	}

	a {
		text-decoration: underline;
	}

	section {
		@apply my-4;
	}

	section h2 {
		@apply font-semibold;
	}

	section hr {
		@apply mt-0 mb-2;
		border-color: darkgrey;
	}

	:global(.print-only) {
		display: none;
	}

	@media print {
		* {
			@apply text-xs;
		}

		:global(.print-only) {
			display: inherit;
		}

		:global(.web-only) {
			display: none;
		}

		ul {
			@apply pl-6;
		}

		li {
			break-inside: avoid;
		}

		section {
			@apply my-2;
		}

		section h2 {
			@apply text-sm;
			break-after: avoid;
		}

		section hr {
			@apply mt-0 mb-1;
			break-after: avoid;
		}

		a {
			text-decoration: none !important;
		}

		main {
			margin: 0 0;
			padding: 0;
		}
	}
</style>
