<script lang="ts" setup>
	import Dashboard from "~/pages/dashboard.vue";

	definePageMeta({
		layout: 'dashboard'
	})
</script>

<template>
	<main>
		<MainHeader/>

		<p @click="resetWidgetData('all')" style="font-size: 18px; cursor: pointer">
			reset all storage
		</p>
		<p @click="checkStorage()" style="font-size: 18px; cursor: pointer">
			check storage
		</p>

		<div class="dashboard__widgets__controls">
			<template
				v-for="widget in widgets"
				:key="widget.slug"
			>
				<label
					:for="widget.slug + '-toggle'">
					{{ widget.name }}
				</label>

				<input
					type="checkbox"
					:id="widget.slug + '-toggle'"
					:name="widget.name"
					:checked="widget.active"
					@change="widget.active = !widget.active"
				>
			</template>
		</div>

		<template
			v-for="widget in widgets"
			:key="widget.slug"
		>
			<article
				v-if="widget.active"
				class="dashboard__card"
				:style="{'order': widget.order}"
			>
				<h2 class="dashboard__card-title">{{ widget.name }}</h2>

				<h3 @click="resetWidgetData(widget.slug)">
					reset
				</h3>

				<component
					v-if="widget.active"
					:is="widget.location"
					:widget="widget"
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
				slug: 'cryptotracker',
				location: 'WidgetsCryptoTracker',
				active: true,
				order: 1
			},
			{
				name: 'Take a Note',
				slug: 'takeanote',
				location: 'WidgetsTakeNote',
				active: false,
				order: 2
			},
			{
				name: 'setTimer',
				slug: 'settimer',
				location: 'WidgetsSetTimer',
				active: false,
				order: 3
			},
		],
	}),
	methods: {
		resetWidgetData(widgetSlug:string) {
			if(widgetSlug === 'all') {
				localStorage.clear()
			}

			localStorage.removeItem(widgetSlug)
			console.log('reset "' + widgetSlug + '" data')
		},
		checkStorage():void {
			console.log(localStorage)
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

.dashboard__widgets__controls {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: repeat(2, 1fr);
	gap: clamp(10px, 1vw, 20px);
	@include fz(1.5);
	color: $light;
	background-color: $dark;
	padding: 20px 25px;
	border-radius: 20px;

	input {
		justify-content: flex-end;
		justify-self: flex-end;
	}
}

.dashboard__card {
	@include flex(flex-start, flex-start, column, $gap: 20px);
	width: clamp(310px, 25vw, 400px);
	background-color: $dark;
	padding: 20px 25px;
	border-radius: 20px;
	color: $light;
	position: relative;

	&-title {
		@include font($font2);
		@include fz(3);
		color: $light;
	}

	h3 {
		@include fz(1);
		color: $grey;
		font-weight: 200;
		cursor: pointer;
		@include position($right: 25px, $top: 20px);
	}
}

</style>