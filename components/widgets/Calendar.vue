<template>
	<div class="dashboard__calendar">
		<div class="dashboard__calendar__button-container">
			<ol>
				<li v-for="month in months" :key="month.name">
					<button
						type="button"
						:class="selectedMonth === month.id ? 'active' : ''"
						@click="initCalendar(month.id)">
						{{ month.name }}
					</button>
				</li>
			</ol>
		</div>
		<div class="calendar">
			<ol class="calendar__header">
				<li v-for="day in weekdays" :key="day" class="weekday">
					{{ day.slice(0, 1) }}
				</li>
			</ol>
			<ol class="calendar__body">
				<template v-for="month in months" :key="month.id">
					<li
						class="day"
						v-for="day in month.days"
						:key="day.id"
						:class="[
							day.contentType === 'daySpace' ? 'space' : '',
							selectedYear === getCurrenYear && month.id === getCurrentMonth && parseInt(day.content) === getCurrentDay ? 'today' : '',
						]"
						@click="getDay(day)"
					>
						{{ day.content }}
					</li>

				</template>
			</ol>
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	props: {
		'widget': {
			type: Object as () => Widget,
			required: true,
		}
	},
	data: () => ({
		months:  [
			{id: 1, name: 'janvier', days: [] as Day[]},
			{id: 2, name: 'février', days: [] as Day[]},
			{id: 3, name: 'mars', days: [] as Day[]},
			{id: 4, name: 'avril', days: [] as Day[]},
			{id: 5, name: 'mai', days: [] as Day[]},
			{id: 6, name: 'juin', days: [] as Day[]},
			{id: 7, name: 'juillet', days: [] as Day[]},
			{id: 8, name: 'août', days: [] as Day[]},
			{id: 9, name: 'septembre', days: [] as Day[]},
			{id: 10, name: 'octobre', days: [] as Day[]},
			{id: 11, name: 'novembre', days: [] as Day[]},
			{id: 12, name: 'décembre', days: [] as Day[]},
		],
		weekdays: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
		today: parseInt(new Date().toLocaleDateString("fr-FR").split('/')[0]),
		selectedMonth: parseInt(new Date().toLocaleDateString("fr-FR").split('/')[1]),
		selectedYear: parseInt(new Date().toLocaleDateString("fr-FR").split('/')[2]),
	}),
	methods: {
		getDay(day: object) {
			console.log(day)
		},
		initCalendar(selectedMonth: number) {
			// Clear previous month data
			this.months[this.selectedMonth - 1].days = []

			// Find the selected month then update
			const newMonth = this.months.find(month => month.id === selectedMonth)
			newMonth ? this.selectedMonth = newMonth.id : this.selectedMonth

			const date: Date = new Date()
			const day: number = this.today
			const month: number = this.selectedMonth
			const year: number = date.getFullYear()
			const firstDayOfMonth: Date = new Date(year, this.selectedMonth - 1, 1)
			const daysInMonth: number = new Date(year, month, 0).getDate()
			const dateString: string = firstDayOfMonth.toLocaleDateString('fr-FR', {
				weekday: 'long',
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
			})
			const paddingDays: number = this.weekdays.indexOf(dateString.split(' ')[0])

			// Push days in the selectedMonth array
			for (let dayNumber: number = 1; dayNumber <= paddingDays + daysInMonth; dayNumber++) {
				const daySquare: Day = {
					id: dayNumber,
					slug: `m${month}d${dayNumber - paddingDays}`,
					contentType: '',
					content: '',
				}
				if (dayNumber > paddingDays) {
					daySquare.contentType = 'dayNumber'
					daySquare.content = (dayNumber - paddingDays).toString()
				} else {
					daySquare.contentType = 'daySpace'
				}

				this.months[this.selectedMonth - 1].days.push(daySquare)
			}
		}
	},
	computed: {
		getCurrentDay() {
			return parseInt(new Date().toLocaleDateString("fr-FR").split('/')[0])
		},
		getCurrentMonth() {
			return parseInt(new Date().toLocaleDateString("fr-FR").split('/')[1])
		},
		getCurrenYear() {
			return parseInt(new Date().toLocaleDateString("fr-FR").split('/')[2])
		},
	},
	mounted() {
		this.initCalendar(this.selectedMonth)

		// Scroll through months (horizontal)
		const slider = document.querySelector('.dashboard__calendar__button-container ol') as HTMLElement
		let isDown = false
		let startX: number
		let scrollLeft: number

		if (slider) {
			slider.addEventListener('mousedown', (e) => {
				e.preventDefault()
				isDown = true
				startX = e.pageX - slider.offsetLeft
				scrollLeft = slider.scrollLeft
			});
			slider.addEventListener('mouseleave', () => {
				isDown = false
			});
			slider.addEventListener('mouseup', () => {
				isDown = false
			});
			slider.addEventListener('mousemove', (e) => {
				if (!isDown) return
				const x = e.pageX - slider.offsetLeft
				const walk = (x - startX)
				slider.scrollLeft = scrollLeft - walk
			});
		}
	},
})
</script>

<style lang="scss" scoped>
@use '@/assets/_variables.scss' as *;

.dashboard__calendar {
	max-width: 100%;

	&__button-container {
		@include flex(center, center);
		position: relative;
		max-width: calc((2.5ch * 7) + (6px * 7) + (7px * 6) + 4.5px);
		// (item-width + item-padding + item-gap + fix)

		&::before, &::after {
			content: '';
			width: calc(1ch + 5px);
			height: 100%;
			position: relative;
			z-index: 10;
			pointer-events: none;
		}

		&::before {
			@include position(0, 0);
			background: linear-gradient(90deg, rgba(29, 29, 29, 1) 0%, rgba(29, 29, 29, 0) 100%);
		}

		&::after {
			@include position(0, $right: 0);
			background: linear-gradient(-90deg, rgba(29, 29, 29, 1) 0%, rgba(29, 29, 29, 0) 100%);
		}

		ol {
			@include flex(flex-start, stretch, $gap: 10px);
			width: 100%;
			position: relative;
			padding: 0 1ch;
			z-index: 1;
			overflow: hidden;
			text-overflow: clip;
			overflow-x: auto;
			@include scrollbar(0px, $t);

			li {
				flex: 1;
				position: relative;

				button:not(.add-button) {
					@include fz(1);
					background-color: $t;
					border: none;
					color: $light;
					border-radius: 50px;
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
		}

		input {
			@include fz(2);
			background: none;
			border: none;
			font-weight: 200;
			color: $light;

			&:focus {
				outline: none;
			}
		}
	}

	.calendar {
		@include flex(flex-start, flex-start, column);
		margin-top: 25px;

		:deep(ol li) {
			@include flex(center, center);
			line-height: 1;
			flex: 1;
			padding: 3px;
			width: 100%;
			height: calc(2ch + 6px);
			border-radius: 10%;
			aspect-ratio: 1;
			color: $grey;
			text-align: center;
			text-transform: uppercase;
			user-select: none;
			pointer-events: none;
		}

		&__header {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			gap: 7px;
			width: 100%;
		}

		&__body {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			text-align: center;
			gap: 7px;

			:deep(li) {
				&.day:not(.space) {
					@include fz(1);
					outline: solid .5px $grey;
					cursor: pointer;
					transition: .2s;
					background-color: $t;
					pointer-events: all;

					&:hover {
						background-color: $yellow;
						outline-color: $yellow;
						color: $dark;
					}

					&.today {
						color: $yellow;
						outline-color: $yellow;
						&:hover {
							color: $dark;
						}
					}
				}
			}
		}
	}
}

button.add-button {
	margin-left: auto
}

</style>