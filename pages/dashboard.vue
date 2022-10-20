<script lang="ts" setup>
definePageMeta({
	layout: 'dashboard'
})
</script>

<template>
	<main>
		<MainHeader />
		<template
			v-for="widget in widgets"
			:key="widget.name"
		>
			<article
				v-if="widget.active"
				class="dashboard-card"
			>
				<h2 class="dashboard-card_title">{{ widget.name }}</h2>

				<h3 @click="resetWidgetData(widget.name)">
					reset
				</h3>

				<component
					v-if="widget.active"
					:is="widget.location"
				/>
			</article>
		</template>
	</main>
</template>


<script lang="ts">
export default {
	layout: 'dashboard',
	data: () => ({
		widgets: [
			{
				name: 'cryptoTracker',
				location: 'WidgetsCryptoTracker',
				active: true,
				order: 1
			},
			{
				name: 'Take a Note',
				location: 'WidgetsTakeNote',
				active: true,
				order: 2
			},
			{
				name: 'setTimer',
				location: 'WidgetsSetTimer',
				active: true,
				order: 3
			},
		],
	}),
	methods: {
		resetWidgetData(widget) {
			localStorage.removeItem(widget)
			console.log('reset "' + widget + '" data')
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

main {
	@include flex(flex-start, flex-start, $wrap: wrap, $gap: 20px);
	min-width: 100%;
}

.dashboard-card {
	@include flex(flex-start, flex-start, column, $gap: 20px);
	background-color: $dark;
	padding: 20px 25px;
	border-radius: 20px;
	min-width: 100px;
	color: $light;

	&_title {
		@include font($font2);
		font-weight: 600;
		font-size: 17px;
		color: $light;
	}
}

</style>