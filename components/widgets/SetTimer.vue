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
					    <p class="timer__meta-value">{{ timerFormat(timer.value) }}</p>
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
				    </div>
			    </li>
		    </ul>
	    </template>
    </div>
</template>


<script lang="ts">

export default {
	props: {
		widget: {
			type: Object,
			name: String,
			slug: String,
			location: String,
			active: Boolean,
			order: Number,
		}
	},
	data: () => ({
		widgetName: 'Set Timer',
		newTimer: '',
		timers: [
			{
				id: 1,
				text: 'Nuxt Training',
				value: 99584,
				tags: ['nuxt', 'javascript', 'vue'],
			},
			{
				id: 2,
				text: '30JS',
				value: 251,
				tags: ['javascript'],
			},
			{
				id: 3,
				text: 'No minutes',
				value: 42,
				tags: ['kekw'],
			},
		],
		tags: [
			{slug:'javascript', color: 'red'},
			{slug:'vue', color: 'green'},
			{slug:'nuxt', color: 'blue'},
		]
	}),
	methods: {
		addEntry(text:string):void {
			const entry: { id: number; text: string } = {
				id: this.timers.length + 1,
				text: text
			}
			this.timers.unshift(entry)
			localStorage.setItem('setTimer', JSON.stringify(this.timers))
			this.newTimer = ''
		},
		timerFormat(value:number):string {
			const hours:number = Math.floor(value / 3600);
			const minutes:number = Math.floor((value % 3600) / 60);
			const seconds:number = Math.floor((value % 3600) % 60);

			if (hours >= 1) {
				return `${hours} h ${minutes} min ${seconds} s`
			}
			else if (minutes >= 1) {
				return `${minutes} min ${seconds} s`
			}
			else {
				return `${seconds} s`
			}
		}
	},
}
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

				&-value {
					@include fz(1);
					color: $grey;
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