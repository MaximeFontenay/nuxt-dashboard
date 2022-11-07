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
					:class="[note.bgColor === false ? 'stroked' : '']"
					:style="`background-color: ${note.bgColor}20;` +
						[note.modify ? 'align-items: initial;' : 'align-items: flex-start;'] +
						[note.bgColor === false ? `--color: #E3D45A; --color50: #E3D45A22;` : `--color: ${note.bgColor}; --color50: ${note.bgColor}22;`]
					"
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
							<details class="note-text">
								<summary>
									{{ note.text.substring(0, 50) }} <span :style="`color: ${note.bgColor}`">...</span>
								</summary>
								<p>{{ note.text }}</p>
							</details>
						</div>
					</template>

					<textarea
						class="note-text"
						v-model="note.text"
						:id="`note-${note.id}`"
						:style="note.modify ? 'display: block' : 'display: none'"/>

					<div class="note-buttons-container">
						<button
							class="button note-button-edit"
							@click="editNote(note)"
							v-if="!note.modify"
						>
							<iconsPen />
						</button>

						<div class="note-buttons-container-top">
							<button
								class="button note-button-validation"
								@click="updateNotes(); note.modify = false"
								v-if="note.modify"
							>
								<iconsCheck />
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
										:style="`background-color: transparent`"
										@click="setNoteColor(note)"
									>
									</li>
									<li
										v-for="color in dashboard.colors"
										:key="color.value"
										:style="`background-color: ${color.value}`"
										@click="setNoteColor(note, color.value)"
									>
									</li>
								</ul>

							</details>
						</div>

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
				bgColor: false
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
		setNoteColor(note: Note, color?:string):void {
			if (color) {
				note.bgColor = color
			}
			else {
				note.bgColor = false
			}
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

		// Close note color selector on click
		document.addEventListener('click' , (e):void => {
			const noteButtonColor = [...document.querySelectorAll('details.button.note-button-color')]
			noteButtonColor.map(details => {
				if (!details.contains(e.target)) {
					details.removeAttribute("open")
				}
			})
		})
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
			$color: var(--color);
			$color50: var(--color50);
			@include flex(space-between, unset);
			width: 100%;
			padding: 10px;
			position: relative;
			border-radius: 10px;

			&.stroked {
				outline: dotted 0.5px $light;
				outline-offset: -0.5px;

				.note-text-container {
					@include scrollbar(5px, $yellow);
				}
				textarea {
					@include scrollbar(5px, $yellow);
				}
			}

			&-text {
				@include fz(1.25);
				padding-right: .75rem;
				background: none;
				outline: none;
				border: none;
				opacity: 1;
				color: $light;
				cursor: default;
				line-height: 1.7;
				overflow-wrap: break-word;
			}

			textarea { // &-text
				@include scrollbar(5px, $color);
				padding: .75rem;
				cursor: text;
				min-height: 110.5px; // Line-height * lines
				max-height: 250px; // same as details content
				width: calc(100% - 2.75rem);

				&::-webkit-resizer {
					background: rgba(0,0,0,0);
					border-bottom: 1px dotted $color;
				}
			}

			p.note-text {
				padding: .75rem;
			}

			&-text-container {
				@include scrollbar(5px, $color);
				overflow-y: scroll;
				overflow-x: hidden;
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
						@include glassMorphism($color50);
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

			&-buttons-container {
				@include flex(flex-end, center, row, wrap, $gap: 3px);
				flex: 0 0 2.75rem;
				padding-left: .5rem;

				&-top {
					@include flex(flex-end, center, column, nowrap, $gap: 3px);
					margin-bottom: auto;
				}

				.button {
					@include flex(center, center);
					@include fixed-size(2.25rem);
					background: none;
					border: none;
					padding: .5rem;
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

				.note-button-validation {
					opacity: 1 !important;
				}

				.note-button-delete {
					margin-top: auto;
				}

				&:hover button, &:hover details {
					opacity: .7;
					pointer-events: all;
					transition: .4s;
				}

				// Colors Note
				details.note-button-color {
					position: relative;
					padding: 0;

					&[open] {
						opacity: 1;
						pointer-events: all;
					}

					summary {
						padding: 0.5rem;
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

							&:first-child {
								border: solid 1px $light;
							}

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