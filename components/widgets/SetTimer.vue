<template>
    <div class="dashboard__timer">
	    <div class="dashboard__timer__button-container">
		    <input
			    type="text"
			    placeholder="New entry..."
			    v-model="newTimer"
		    >
		    <AddButton
			    text="timer"
			    @click="newTimer.length > 0 ? addTimer(newTimer) : null"
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
					    <p class="timer__meta-value">{{ timer.value }}</p>
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
	data: () => ({
		newTimer: '',
		timers: [
			{
				id: 1,
				text: 'Nuxt Training',
				value: 4865,
				tags: ['nuxt', 'javascript', 'vue'],
			},
			{
				id: 2,
				text: '30JS',
				value: 251,
				tags: ['javascript'],
			},
		],
		tags: [
			{slug:'javascript', color: 'red'},
			{slug:'vue', color: 'green'},
			{slug:'nuxt', color: 'blue'},
		]
	}),
	methods: {
		addTimer() {
			const note = {
				id: this.notes.length + 1,
				text: this.newNote
			}
			this.notes.unshift(newTimer)
			localStorage.setItem('Take a Note', JSON.stringify(this.notes))
			this.newTimer = ''
		},
	},
	mounted() {
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.dashboard__timer {
	&__button-container {
		@include flex(flex-start, center, $gap: 10px);
		width: 100%;

		input {
			background: none;
			border: none;
			font-size: 1rem;
			font-weight: 200;
			color: $light;

			&:focus {
				outline: none;
			}
		}
	}

	&__row-container {
		@include flex(flex-start, flex-start, column, $gap: 5px);
		margin-top: 25px;
		width: 100%;

		.timer {
			@include flex(flex-start, flex-start, column);
			width: 100%;
			font-size: 1.3rem;

			&-entry {
				color: $grey;
			}

			&__meta {
				@include flex(space-between, center, $gap: 20px);

				&-value {
					color: $grey;
				}

				&-tags {
					@include flex(space-between, center, $gap: 2px);

					li {
						color: $dark;
						padding: 0 5px;
						border-radius: 10px;
						font-size: 1.3rem;
						background-color: #00E39D;
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