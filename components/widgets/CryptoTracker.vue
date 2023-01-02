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
				<li class="crypto__name" :style="{order: crypto.order}">
					<h3>{{ crypto.name }}</h3>
				</li>
				<li class="crypto__chart" :style="{order: crypto.order}">
				</li>
				<li class="crypto__value" :style="{order: crypto.order}">
					<p>{{ crypto.value }}$</p>
				</li>
			</template>
		</ol>

		<button class="button" @click="getCryptoData('bitcoin')">test</button>
	</div>
</template>

<script lang="ts">
import {useFetch} from "nuxt/app";

export default {

	data: () => ({
		temporality: ['daily', 'weekly', 'monthly', 'yearly'],
		currentTemporality: 'weekly',
		currencyConversion: 'eur',
		cryptos: [
			{name: 'Bitcoin', value: 18309, chart: null, order: 1},
			{name: 'Ethereum', value: 1290, chart: null, order: 2},
			{name: 'Shiba Inu', value: 0.00001053, chart: null, order: 3},
		]
	}),
	methods: {
		changeTemporality(temporality: string):void {
			this.currentTemporality = temporality

			for(const crypto of this.cryptos) {
				this.getCryptoData(crypto.name)
			}
		},

		getCryptoData(coin:number|string):object {
			const coinId:string = coin.toString().toLowerCase().trim().replace(' ','-')
			const date = new Date()
			const unixTimestampNow = Math.floor(date.getTime() / 1000);
			let unixTimestampTemporality:number

			switch (this.currentTemporality) {
				case ('daily') :
					// 5 minutes interval = 288 values
					unixTimestampTemporality = Math.floor(date.setDate(date.getDate() - 1) / 1000)
					break

				case ('weekly') :
					// 1 hour interval = 169 values
					unixTimestampTemporality = Math.floor(date.setDate(date.getDate() - 7) / 1000)
					break

				case ('monthly') :
					// 1 hour interval ≈ 730 values
					unixTimestampTemporality = Math.floor(date.setMonth(date.getMonth() - 1) / 1000)
					break

				default : // Yearly
					// 1 day interval = 365 values
					unixTimestampTemporality = Math.floor(date.setFullYear(date.getFullYear() - 1) / 1000)
			}

			const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=${this.currencyConversion}&from=${unixTimestampTemporality}&to=${unixTimestampNow}`
			console.log(useFetch(url).data)
			return useFetch(url)
		},
	},
	mounted() {

	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.dashboard__crypto {
	&__button-container {
		@include flex(flex-start, stretch, $gap: 10px);

		button:not(.add-button) {
			background-color: $t;
			border: none;
			color: $light;
			border-radius: 50px;
			@include fz(1);
			padding: 2px 6px;

			&:first-child {
				padding-left: 0;
			}
			&:last-child {
				padding-right: 0;
			}

			&.active {
				color: $dark;
				background-color: $yellow;
				padding: 2px 6px;
			}
		}
	}

	&__row-container {
		display: grid;
		grid-template-columns: 1fr 1.5fr 1fr;
		grid-column-gap: 15px;
		grid-row-gap: 5px;
		width: 100%;
		margin-top: 25px;

		li {
			min-width: 70px;
			flex: 1;

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