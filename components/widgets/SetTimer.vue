<template>
    <div class="dashboard__timer">
	    <div class="dashboard__timer__button-container">
		    <input
			    type="text"
			    placeholder="New entry..."
			    v-model="newTimer"
			    @keyup.enter="newTimer.length > 0 ? addEntry(newTimer) : null"
		    >
		    <AddButton
			    text="timer"
			    @click="newTimer.length > 0 ? addEntry(newTimer) : null"
		    />
	    </div>
	    <template v-if="timers.length">
		    <ul class="dashboard__timer__row-container">
			    <li
				    v-for="timer in timers"
				    :key="timer.id"
				    class="timer">
				    <p class="timer-entry">{{ timer.text }}</p>
				    <div class="timer__meta">
					    <p
					        class="timer__meta-value"
					    >
					        <input
					            type="number"
					            :id="`timer-${timer.id}-hours`"
					            min="0"
					            max="23"
					            maxlength="2"
					            @keyup="editTimer(timer, 'hours', $event)"
					            @keydown="editTimer(timer, 'hours', $event)"
					            @keyup.enter="updateTimer"
					            v-model="timer.hours"
					        /> <span>h</span>
					        <input
					            type="number"
					            :id="`timer-${timer.id}-minutes`"
					            min="0"
					            max="59"
					            maxlength="2"
					            @keyup="editTimer(timer, 'minutes', $event)"
					            @keydown="editTimer(timer, 'minutes', $event)"
					            @keyup.enter="updateTimer"
					            v-model="timer.minutes"
					        /> <span>min</span>
					        <input
					            type="number"
					            :id="`timer-${timer.id}-secondes`"
					            min="0"
					            max="59"
					            maxlength="2"
					            @keyup="editTimer(timer, 'seconds', $event)"
					            @keydown="editTimer(timer, 'seconds', $event)"
					            @keyup.enter="updateTimer"
					            v-model="timer.seconds"
					        /> <span>s</span>
					    </p>
					    <div
						    class="timer__meta-state"
					    >
						    <div
							    v-if="timer.playing"
							    class="timer__meta-state-play"
							    @click="pauseTimer(timer)"
						    >
							    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 7h3v10H8zm5 0h3v10h-3z"></path></svg>
						    </div>
						    <div
							    v-else
							    class="timer__meta-state-pause"
							    @click="playTimer(timer)"
						    >
							    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 6v12l10-6z"></path></svg>
						    </div>
					    </div>
				    </div>
				    <template v-if="timer.tags.length">
					    <ul class="timer__meta-tags">
						    <li
							    v-for="tag in timer.tags"
							    :key="tag"
							    class="tag">
							    {{ tag }}
						    </li>
					    </ul>
				    </template>
			    </li>
		    </ul>
	    </template>
    </div>
</template>

<script lang="ts">
// format 00:00:00
// split les : + anim ?
// navigation au keyboard -> left/right : si arrivé à l'extrémité, autofocus l'input d'à côté


export default defineComponent({
	props: {
		'widget': {
			type: Object as () => Widget,
			required: true,
		},
	},
	data: () => ({
		timers: [] as Timer[],
		tags: [] as TimerTags[],
		newTimer: '',
		interval: 0,
		// timers: [
		// 	{
		// 		id: 1,
		// 		text: 'Nuxt Training',
		// 		value: 99584,
		// 		tags: ['nuxt', 'javascript', 'vue'],
		// 	},
		// 	{
		// 		id: 2,
		// 		text: '30JS',
		// 		value: 251,
		// 		tags: ['javascript'],
		// 	},
		// 	{
		// 		id: 3,
		// 		text: 'No minutes',
		// 		value: 42,
		// 		tags: ['kekw'],
		// 	},
		// ],
	}),
	methods: {
		addEntry(text: string): void {
			const addTimer: Timer = {
				id: this.timers.length + 1,
				text: text,
				hours: 0,
				minutes: 0,
				seconds: 0,
				playing: true,
				modify: false,
				tags: [],
			}
			this.stopAllTimers()
			this.timers.unshift(addTimer)
			this.playTimer(addTimer)
			this.newTimer = ''
			this.updateTimer()
		},
		playTimer(timer: Timer): void {
			this.stopAllTimers(timer.id)
			timer.playing = true
			this.interval = window.setInterval(() => {
				if(timer.playing) {
					timer.seconds++

					if(timer.seconds >= 60) {
						timer.seconds = 0
						timer.minutes++

						if (timer.minutes >= 60) {
							timer.minutes = 0
							timer.hours++
						}
					}

					this.updateTimer()
				}
			}, 1000)
		},
		pauseTimer(timer: Timer): void {
			this.stopAllTimers()
			window.clearInterval(this.interval)
			this.interval = 0
			this.updateTimer()
		},
		editTimer(timer: Timer, value:string, event:any):void {
			this.pauseTimer(timer)
			const valideInputs: string[] = ['ArrowUp','ArrowDown','ArrowRight','ArrowLeft','Enter','Tab','Backspace','Delete','Shift','Control']

			console.log(event.target.value)
			// Max length = 2 digits
			if (event.target.value.length < 1 || valideInputs.includes(event.key) ) {

				const limit:number = event.target.getAttribute('max')
				const isANumber:boolean = isFinite(event.key)

				// Add 0 if input is going to be empty
				if(event.key === 'Backspace' && event.target.value.length === 0) {
					console.log('vide')
					event.target.value = '0'
				}

				if (isANumber) {
					// Delete the 0 on the first digit
					if(event.target.value.length === 1 && event.target.value === '0') {
						event.target.value = ''
					}

					// modifier la valeur sans dépasser la limite
					if(event.target.value > limit) {
						event.target.value = limit
					}
				}

				// Si un des cotés rentre dans la range
				// if (event.key + event.target.value < limit || event.target.value + event.key < limit) {
				// 	event.preventDefault()
				//
				// 	if (event.key + event.target.value < limit && event.target.value + event.key >= limit) {
				// 		console.log('ajout à gauche possible')
				// 		event.target.value = event.key + event.target.value
				// 	}
				// 	else if (event.key + event.target.value >= limit && event.target.value + event.key < limit) {
				// 		console.log('ajout à droite possible')
				// 		event.target.value = event.target.value + event.key
				// 	}
				// } else if (!valideInputs.includes(event.key)) {
				// 	event.preventDefault()
				// }

			}
			else {
				event.target.value = String(event.target.value).slice(0, 2)
				console.log('slice')
			}
		},
		stopAllTimers(saveTimerId?: number): void {
			this.timers.map((timer: Timer) => {
				if (timer.id !== saveTimerId) {
					timer.playing = false
				}
			})
		},
		updateTimer(): void {
			localStorage.setItem(this.widget.slug, JSON.stringify(this.timers))
		},
	},

	mounted() {
		const data = JSON.parse(localStorage.getItem(this.widget.slug)!)
		if (data) {
			this.timers = data
			this.timers.map((timer: Timer) => {
				timer.playing = false
			})
		}
		console.log(this.widget)
	},
})
</script>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.dashboard__timer {
	&__button-container {
		@include flex(flex-start, center, $gap: 10px);
		width: 100%;

		input {
			@include fz(1.2);
			background: none;
			border: none;
			font-weight: 200;
			color: $light;

			&:focus {
				outline: none;
			}
		}
	}

	&__row-container {
		@include flex(flex-start, flex-start, column, $gap: clamp(7.5px, .7vw, 12.5px));
		margin-top: 25px;
		width: 100%;

		.timer {
			@include flex(flex-start, flex-start, column, $gap: 2px);
			width: 100%;

			&-entry {
				@include fz(2);
				color: $light;
			}

			&__meta {
				@include flex(space-between, center, $gap: 20px);
				width: 100%;
				position: relative;

				&-state {
					width: 20px;
					height: 20px;

					& > div {
						@include flex(center, center);
						position: relative;
						width: 100%;
						height: 100%;
						cursor: pointer;

						&::before {
							@include position(50%, 50%);
							translate: -50% -50%;
							border-radius: 50px;
							width: 110%;
							height: auto;
							aspect-ratio: 1;
							@include color('background-color', $light, 0);
							z-index: 1;
							transition: .4s;
						}

						svg {
							@include color('fill', $light, .4);
							transition: .2s;
							z-index: 2;
							position: relative;
						}

						&:hover {
							&::before {
								@include color('background-color', $light, .2);
							}
							svg {
								@include color('fill', $light, .8);
							}
						}
					}
				}

				&-value {
					@include flex(center, center, $gap: 7.5px);
					@include fz(1);
					color: $grey;
					transition: .2s;
					cursor: pointer;

					&:hover {
						@include color('color', $light, .8)
					}

					input {
						width: 2ch;
						background: none;
						border: none;
						outline: none;
						text-align: right;

						&::-webkit-outer-spin-button,
						&::-webkit-inner-spin-button {
							-webkit-appearance: none;
							margin: 0;
						}
						&[type=number] {
							-moz-appearance: textfield;
						}
					}
				}

				&-tags {
					@include flex(flex-end, center, row, wrap, $gap: 5px);

					li {
						@include fz(1.25);
						color: $dark;
						padding: 0 10px;
						position: relative;
						z-index: 2;
						background-color: #00E39D;
						border-radius: 50px;
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