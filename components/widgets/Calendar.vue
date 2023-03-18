<template>
	<div class="dashboard__calendar">
		<div class="dashboard__calendar__button-container">
			<ol>
				<li v-for="month in months" :key="month.name">
					<button
						type="button"
						:class="selectedMonth === month.id ? 'active' : ''"
						@click.self="initCalendar(month.id)">
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
							day.events?.length ? 'has-event' : '',
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
		widget: {
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
			this.$toaster({ text: 'Button clicked!', alertType: 'warning', timer: 5000 })
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
				const random = Math.random() < 0.2
				const daySquare: Day = {
					id: dayNumber,
					slug: `m${month}d${dayNumber - paddingDays}`,
					contentType: '',
					content: '',
					events: random ? [{id: dayNumber, content: 'Lorem ipsum'}] :[]
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
	position: relative;

	&__button-container {
		@include flex(center, center);
		@include position(0, 0);

		&::before, &::after {
			content: '';
			width: 20px;
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
			@include flex(flex-start, stretch, $gap: 5px);
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
					padding: 3px 6px;
					line-height: 1;

					&.active {
						color: $dark;
						background-color: $yellow;
						padding: 3px 6px;
					}

					&:not(.active):hover {
						color: $yellow;
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
		@include flex(flex-start, flex-start, column, $gap: .5ch);
		width: fit-content;
		margin-top: calc(25px + 1ch);

		ol li {
			@include flex(center, center);
			line-height: 1;
			flex: 1;
			padding: 3px;
			width: 2.5ch;
			//height: calc(2ch + 6px);
			color: $grey;
			text-align: center;
			text-transform: uppercase;
			user-select: none;
			pointer-events: none;
		}

		&__header {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			gap: 10px;
			place-content: center;
			place-items: center;
			text-align: center;

			.weekday {
				width: 100%;
				height: auto;
			}
		}

		&__body {
			width: fit-content;
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			gap: 10px;
			place-content: center;
			place-items: center;
			text-align: center;

			:deep(li) {
				&.day:not(.space) {
					@include fz(1.4);
					outline: solid .5px $grey;
					cursor: pointer;
					transition: all .2s;
					will-change: outline;
					background-color: $t;
					pointer-events: all;
					position: relative;
					border-radius: 10%;
					aspect-ratio: 1;

					&:hover {
						background-color: $yellow;
						color: $dark;
						outline-color: $yellow;
						outline-offset: 1.5px;
					}

					&.has-event {
						color: $yellow;

						&:after {
							@include position(0, $right: 0);
							color: $dark;
							font-size: 9px;
							translate: 35% -35%;
							border-radius: 50px;
							width: 5px;
							aspect-ratio: 1;
							background-color: $yellow;
						}
						&:hover {
							color: $dark;
							font-weight: 400;
						}
					}

					&.today {
						outline-color: $yellow;
						color: $yellow;

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