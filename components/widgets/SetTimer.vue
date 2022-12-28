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
				    <p class="timer-entry">{{ timer.title }}</p>
				    <div class="timer__meta">
					    <p class="timer__meta-value">
					        <input
					            type="number"
					            :id="`timer-${timer.id}-hours`"
					            min="0"
					            max="99"
					            maxlength="2"
					            @keydown="editTimer(timer, 'hours', $event)"
					            @keyup.enter="updateTimer"
					            @blur="checkValidity(timer.hours,23, $event)"
					            v-model="timer.hours"
					        /> <span>h</span>
					        <input
					            type="number"
					            :id="`timer-${timer.id}-minutes`"
					            min="0"
					            max="59"
					            maxlength="2"
					            @keydown="editTimer(timer, 'minutes', $event)"
					            @keyup.enter="updateTimer"
					            @blur="checkValidity(timer.minutes,59, $event)"
					            v-model="timer.minutes"
					        /> <span>min</span>
					        <input
					            type="number"
					            :id="`timer-${timer.id}-secondes`"
					            min="0"
					            max="59"
					            maxlength="2"
					            @keydown="editTimer(timer, 'seconds', $event)"
					            @keyup.enter="updateTimer"
					            @blur="checkValidity(timer.seconds, 59, $event)"
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
		// 		title: 'Nuxt Training',
		// 		value: 99584,
		// 		tags: ['nuxt', 'javascript', 'vue'],
		// 	},
		// 	{
		// 		id: 2,
		// 		title: '30JS',
		// 		value: 251,
		// 		tags: ['javascript'],
		// 	},
		// 	{
		// 		id: 3,
		// 		title: 'No minutes',
		// 		value: 42,
		// 		tags: ['kekw'],
		// 	},
		// ],
	}),
	methods: {
		addEntry(text: string): void {
			const addTimer: Timer = {
				id: this.timers.length + 1,
				title: text,
				hours: 0,
				minutes: 0,
				seconds: 0,
				playing: true,
				tags: [],
			}
			this.playTimer(addTimer)
			this.timers.unshift(addTimer)
			this.newTimer = ''

			//TODO Attribution d'une value brut dans un input = la value Nuxt n'est pas MAJ
		},
		playTimer(timer: Timer): void {
			timer.playing = true
			this.stopAllTimers(timer.id)
			window.clearInterval(this.interval)
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
			const key: string = event.key
			const valideInputs: string[] = ['ArrowUp','ArrowDown','ArrowRight','ArrowLeft','Enter','Tab','Backspace','Delete','Shift','Control']
			const isANumber:boolean = isFinite(parseInt(key))

			// Cancel function if this is not a number / a valideInput
			if (!isANumber && !valideInputs.includes(key) || event.target.value.length === 2 && !valideInputs.includes(key)) {
				event.preventDefault()
				return
			}

			// Add 0 if input is going to be empty
			else if(key === 'Backspace' && event.target.value.length <= 1) {
				event.preventDefault()
				event.target.value = '0'
			}

			// Delete the 0 on the first digit
			else if(event.target.value === '0' && parseInt(key) > 0) {
				event.preventDefault()
				event.target.value = key
			}

			this.updateTimer()
		},

		checkValidity(value:any, limit:number, event:any):void {
			if(event.target.value > limit) {
				event.target.value = limit
				this.updateTimer()
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
@use '@/assets/_variables.scss' as *;

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

					input {
						width: 2ch;
						background: none;
						border: none;
						outline: none;
						overflow: hidden;
						text-overflow: clip;
						text-align: right;
						transition: .2s;

						&:hover, &:focus, &::selection {
							@include color('color', $light, .8);
							background: $t;
							box-shadow: 0 1px 0 0 $light;
						}

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