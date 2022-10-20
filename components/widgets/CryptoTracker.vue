<template>
	<div class="dashboard__crypto">
		<div class="dashboard__crypto__button-container">
			<button
				type="button"
				v-for="tempo in temporality"
				:class="currentTemporality === tempo ? 'active' : ''"
				@click="changeTemporality(tempo)"
			>
				{{ tempo }}
			</button>

			<AddButton text="crypto"/>
		</div>

		<ol class="dashboard__crypto__row-container">
			<template v-for="crypto in cryptos">
				<li class="crypto__name">
					<h3>{{ crypto.name }}</h3>
				</li>
				<li class="crypto__value">
					<p>{{ crypto.value }}$</p>
				</li>
				<li class="crypto__chart">
					<div>{{ crypto.chart }}</div>
				</li>
				<li class="crypto__order">
					<p>{{ crypto.order }}</p>
				</li>
			</template>
		</ol>
	</div>
</template>

<script lang="ts">
export default {
	data: () => ({
		temporality: ['daily', 'weekly', 'monthly', 'yearly'],
		currentTemporality: null,
		cryptos: [
			{name: 'Bitcoin', value: 18309, chart: null, order: 1},
			{name: 'Ethereum', value: 1290, chart: null, order: 2},
			{name: 'Shiba Inu', value: 0.00001053, chart: null, order: 3},
		]
	}),
	methods: {
		changeTemporality(temporality: string) {
			this.currentTemporality = temporality
			console.log('crypto view : ' + temporality)
		}
	},
	mounted() {
		this.currentTemporality = 'weekly'
	},
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.dashboard__crypto {
	&__button-container {
		@include flex(flex-start, center, $gap: 10px);

		button:not(.add-button) {
			background-color: $t;
			border: none;
			color: $light;
			padding: 2px 6px;
			border-radius: 50px;

			&.active {
				color: $dark;
				background-color: $yellow;
			}
		}
	}

	&__row-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr .3fr;
		grid-column-gap: 15px;
		grid-row-gap: 5px;
		width: 100%;
		margin-top: 25px;

		li {
			min-width: 70px;

			h3, p {
				font-variation-settings: 'wght' 100;
				font-size: 15px;
			}

			&.crypto__value {
				justify-self: center;
				text-align: center;
			}

			&.crypto__chart {
				@include color('background-color', $green, .5);
				width: 100%;
				justify-self: center;
			}

			&.crypto__order {
				justify-self: end;
				min-width: unset;
			}
		}
	}
}

button.add-button {
	margin-left: auto
}

</style>