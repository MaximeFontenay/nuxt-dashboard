<template>
	<div class="dashboard__notes">
		<div class="dashboard__notes__button-container">
			<input
				type="text"
				placeholder="New note..."
				v-model="newNote"
				@keyup.enter="newNote.length > 0 ? addNote() : null"
			>
			<AddButton
				text="note"
				@click="newNote.length > 0 ? addNote() : null"
			/>
		</div>
		<template v-if="notes.length">
			<ul class="dashboard__notes__row-container">
				<li
					v-for="note in notes"
					:key="note.id"
					class="note"
					:style="`
						--color: ${note.bgColor};
						background-color: ${note.bgColor}1A
					`"
				>
					<template v-if="!note.modify">
						<p
							class="note-text"
							v-if="note.text.length < 50"
						>
							{{ note.text }}
						</p>
						<div class="note-text-container"
						     v-if="note.text.length > 50"
						     >
							<details
								class="note-text"
							>
								<summary>
									{{ note.text.substring(0, 50) }} <span>...</span>
								</summary>
								<p>
									{{ note.text }}
								</p>
							</details>
						</div>

					</template>

					<textarea
						class="note-text"
						v-model="note.text"
						:id="`note-${note.id}`"
						:style="note.modify ? 'display: block' : 'display: none'"
					/>

					<div class="button note-button">
						<button
							class="button note-button-edit"
							@click="editNote(note)"
							v-if="!note.modify"
						>
							<iconsPen />
						</button>

						<details
							class="button note-button-color"
							v-if="note.modify"
						>
							<summary>
								<iconsPalette />
							</summary>

							<ul class="note-color-container">
								<li
									v-for="color in dashboard.colors"
									:key="color.value"
									:style="`background-color: ${color.value}`"
									@click="setNoteColor(note, color.value)"
								>
								</li>
							</ul>

						</details>


						<button
							class="button note-button-validation"
							@click="updateNotes(); note.modify = false"
							v-if="note.modify"
						>
							<iconsCheck />
						</button>

						<button
							class="button note-button-delete"
							@click="removeNote(note.id)"
							v-if="note.modify"
						>
							<iconsTrash />
						</button>
					</div>
				</li>
			</ul>
		</template>
	</div>
</template>

<script lang="ts" setup>
	const widget = ref<Widget>;
	const note = ref<Note>;
</script>

<script lang="ts">

export default {
	data: () => ({
		notes: [],
		newNote: '',
		dashboard: {
			colors: [
				{name: 'blue', value: '#3377FE'},
				{name: 'red', value: '#DB785E'},
				{name: 'green', value: '#5DBE74'},
				{name: 'yellow', value: '#E3D45A'},
				{name: 'purple', value: '#A798E8'},
			]

		}
	}),
	methods: {
		addNote():void {
			const note: Note = {
				id: this.notes.length + 1,
				text: this.newNote,
				modify: false,
				bgColor: 'red'
			}
			this.notes.unshift(note)
			this.newNote = ''
			this.updateNotes()
		},
		removeNote: function(noteId:number):void {
			this.notes.map((note: Note, index:number) => {
				if (note.id === noteId) {
					if(confirm(`Supprimer ${this.notes[index].text} ?`)) {
						this.notes.splice(index, 1)
					}
				}
			})
			this.updateNotes()
		},
		editNote(note: Note):void {
			note.modify = true

			const textarea: HTMLTextAreaElement = document.querySelector('#note-' + note.id) as HTMLTextAreaElement

			setTimeout(() => {
				textarea.focus()
				textarea.scrollTop = 0
			}, 100)

			this.updateNotes()
		},

		setNoteColor(note: Note, color:string):void {
			note.bgColor = color
		},

		updateNotes():void {
			localStorage.setItem(this.widget.slug, JSON.stringify(this.notes))
		}
	},

	mounted() {
		const data = JSON.parse(localStorage.getItem(this.widget.slug))
		if (data) {
			this.notes = data
			this.notes.map((note: Note) => {
				note.modify = false
			})
		}

		console.log(localStorage)
	},
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.dashboard__notes {

	&__button-container {
		@include flex(flex-start, center, $gap: 10px);
		width: 100%;

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

	&__row-container {
		@include flex(flex-start, flex-start, column, $gap: clamp(5px, .5vw, 10px));
		margin-top: 25px;
		width: 100%;

		.note {
			$color: var(--color, #E3D45AFF);
			@include flex(space-between, flex-start);
			width: 100%;
			border: solid 1px $light;
			padding: 10px;
			position: relative;
			border-radius: 10px;

			&-text {
				@include fz(1.25);
				padding-right: .75rem;
				margin-right: .25rem;
				background: none;
				outline: none;
				border: none;
				opacity: 1;
				color: $light;
				cursor: default;
				line-height: 1.7;
				max-width: 20vw;
				width: 100%;
				overflow-wrap: break-word;
			}

			textarea { // &-text
				@include scrollbar(5px, $yellow);
				padding: .75rem;
				cursor: text;
				min-height: 110.5px; // Line-height * lines
				max-height: 200px; // same as details content
				width: 100%;
			}

			p.note-text {
				padding: .75rem;
			}

			&-text-container {
				@include scrollbar(5px, $yellow);
				overflow-y: scroll;
				text-overflow: clip;
				max-height: 200px;
			}

			details.note-text { // &-text
				display: block;
				transition: 0s;
				position: relative;

				&[open] {
					transition: .3s .005s max-height;
					padding: .75rem;

					summary {
						@include position(0,0);
						color: $t;
						width: 100%;
						height: 100%;
						span {
							display: none;
						}
					}
				}

				summary {
					padding: .75rem;
					cursor: pointer;
					color: $light;
					transition: .1s background-color;
					position: relative;
					z-index: 1;

					&::before {
						@include position(0,0);
						width: calc(100% - .5rem);
						height: calc(100% - .5rem);
						background-color: $t;
						z-index: -1;
					}

					&:hover::before{
						@include glassMorphism;
						border-radius: 8.5px;
					}

					span {
						color: $yellow;
					}
				}

				p {
					pointer-events: none;
					position: relative;
					z-index: 2;
				}
			}

			&-button {
				@include flex(flex-end, center, row, wrap, $gap: 3px);
				padding: 0 .5rem;

				.button {
					@include flex(center, center);
					flex: 0 0 calc(50% - 1.5px);
					background: none;
					border: none;
					padding: .5rem;
					width: 2.25rem;
					min-width: 2.25rem;
					max-width: 2.25rem;
					pointer-events: none;
					opacity: 0.1;
					transition: .2s;

					svg {
						width: 100%;
						height: 100%;
					}

					&:hover {
						opacity: 1 !important;
					}
				}

				&-validation {
					opacity: 1 !important;
				}

				&:hover button, &:hover details {
					opacity: .7;
					pointer-events: all;
					transition: .4s;
				}

				// Colors Note
				details.note-button-color {
					position: relative;

					&[open] {
						opacity: 1;
						pointer-events: all;
					}

					ul.note-color-container {
						@include flex(center, center, $gap: 7.5px);
						@include position(calc(-100% - 7.5px), 50%);
						translate: -50%;
						background: $black;
						max-width: unset;
						padding: 7.5px 10px;
						border-radius: 50px;
						z-index: 5;

						li {
							width: 15px;
							height: 15px;
							border-radius: 10px;
							cursor: pointer;
							transition: .2s;

							&:hover {
								opacity: .5;
							}
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