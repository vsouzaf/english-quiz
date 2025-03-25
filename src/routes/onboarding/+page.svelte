<script lang="ts">
	import Carousel from '@/routes/onboarding/Carousel.svelte';

	let carouselItens = [
		{
			title: 'Welcome to Aladin',
			description:
				'Get access to the tools you need to invest, spend, and put your money in motion.',
			imageSrc: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4'
		},
		{
			title: 'Invista com Segurança',
			description:
				'Explore nossas ferramentas avançadas de investimento com proteção garantida para seu patrimônio.',
			imageSrc: 'https://images.unsplash.com/photo-1565372910293-1a1e1f1f1f1f'
		},
		{
			title: 'Pagamentos Simplificados',
			description:
				'Realize transferências e pagamentos de forma rápida e segura, sem complicações.',
			imageSrc: 'https://images.unsplash.com/photo-1581091870621-1a1e1f1f1f1f'
		},
		{
			title: 'Controle Total',
			description:
				'Acompanhe seus gastos e investimentos em tempo real com nossa interface intuitiva.',
			imageSrc: 'https://images.unsplash.com/photo-1573164574393-1a1e1f1f1f1f'
		},
		{
			title: 'Suporte 24/7',
			description: 'Conte com nossa equipe especializada para ajudar você em qualquer momento.',
			imageSrc: 'https://images.unsplash.com/photo-1593642532973-1a1e1f1f1f1f'
		}
	];
</script>

<svelte:head>
	<title>Onboarding</title>
	<meta name="description" content="Index" />
</svelte:head>

<div class="self-center bg-white md:size-1/2 lg:size-1/3">
	<Carousel>
		{#each carouselItens as carouselItem, index (index)}
			<div>
				<div>
					<div class="px-4 py-3">
						<div
							class="flex min-h-80 w-full flex-col justify-end overflow-hidden bg-white bg-cover bg-center bg-no-repeat @[480px]:rounded-xl"
							style='background-image: url("{carouselItem.imageSrc}");'
						></div>
					</div>
				</div>
				<h2
					class="tracking-light px-4 pt-5 pb-3 text-center text-[28px] leading-tight font-bold text-[#111418]"
				>
					{carouselItem.title}
				</h2>
				<p class="px-4 pt-1 pb-3 text-center text-base leading-normal font-normal text-[#111418]">
					{carouselItem.description}
				</p>
			</div>
		{/each}
	</Carousel>
	<div class="flex justify-stretch">
		<div class="flex flex-1 flex-wrap justify-between gap-3 px-4 py-3">
			<button
				class="flex h-12 max-w-[480px] min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#f0f2f4] px-5 text-base leading-normal font-bold tracking-[0.015em] text-[#111418] hover:bg-[#e0e2e4]"
			>
				<span class="truncate">Log in</span>
			</button>
			<button
				class="flex h-12 max-w-[480px] min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#1980e6] px-5 text-base leading-normal font-bold tracking-[0.015em] text-white hover:bg-[#1670c6]"
			>
				<span class="truncate">Sign up</span>
			</button>
		</div>
	</div>
	<div class="h-5 bg-white"></div>
</div>
