<template>
	<main>
		<MainHeader />

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
					:for="widget.slug + '-toggle'"
					:class="widget.active ? 'active' : ''"
					>
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
		<Toaster :text="toastMessage" />

		<button @click="newAlert">alert</button>
	</main>
</template>


<script lang="ts">
export default defineComponent({
	data: () => ({
		widgets: [
			{
				name: 'cryptoTracker',
				slug: 'cryptotracker',
				location: 'WidgetsCryptoTracker',
				active: false,
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
			{
				name: 'Calendar',
				slug: 'calendar',
				location: 'WidgetsCalendar',
				active: false,
				order: 4
			},
		],
		toastMessage: ''
	}),
	methods: {
		newAlert():void {
			this.toastMessage = Math.random().toString()
			//this.$toaster('Hello world!', 5000, 'success')
		},

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
})
</script>

<style lang="scss" scoped>
@use '@/assets/_variables.scss' as *;

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
	width: fit-content;
	place-content: center;
	background-color: $dark;
	padding: 20px 25px;
	border-radius: 20px;

	label {
		color: $light;
		cursor: pointer;
		transition: .3s;

		&:hover {
			color: $yellow;
		}

		&.active {
			color: $yellow;
			text-decoration: underline;
		}
	}

	input {
		display: none;
	}
}

.dashboard__card {
	@include flex(flex-start, flex-start, column, $gap: 20px);
	width: fit-content;
	max-width: 90vw;
	background-color: $dark;
	padding: 20px 25px;
	border-radius: 20px;
	color: $light;
	position: relative;

	&-title {
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