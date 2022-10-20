<template>
	<div class="dashboard__notes">
		<div class="dashboard__notes__button-container">
			<input
				type="text"
				placeholder="New note..."
				v-model="newNote"
				@keyup.enter="newNote.length > 0 ? addNote(newNote) : null"
			>
			<AddButton
				text="note"
				@click="newNote.length > 0 ? addNote(newNote) : null"
			/>
		</div>
		<template v-if="notes.length">
			<ul class="dashboard__notes__row-container">
				<li
					v-for="note in notes"
					:key="note.id"
					class="note"
				>
					<p class="note-text">{{ note.text }}</p>

					<div class="note-button">
						<button
							class="note-button-edit"
							@click="editNote(note.id)"
						>
							<iconsPen />
						</button>

						<button
							class="note-button-delete"
							@click="removeNote(note.id)"
						>
							<iconsTrash />
						</button>
					</div>

				</li>
			</ul>
		</template>
	</div>
</template>


<script lang="ts">

export default {
	data: () => ({
		notes: [],
		newNote: '',
	}),
	methods: {
		addNote() {
			const note = {
				id: this.notes.length + 1,
				text: this.newNote
			}
			this.notes.unshift(note)
			this.newNote = ''
			this.updateNotes()
		},
		removeNote(noteId) {
			this.notes.map((note, index) => {
				if (note.id === noteId) {
					if(confirm(`Supprimer ${this.notes[index].text} ?`)) {
						this.notes.splice(index, 1)
					}
				}
			})
			this.updateNotes()
		},
		editNote(noteId) {
			this.notes.map((note, index) => {
				if (note.id === noteId) {
					note.
						this.notes.splice(index, 1)
				}
			})
			this.updateNotes()
		},
		updateNotes() {
			localStorage.setItem('Take a Note', JSON.stringify(this.notes))
		}
	},

	mounted() {
		const data = JSON.parse(localStorage.getItem('Take a Note'))
		data ? this.notes = data : this.notes = []
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
			background: none;
			border: none;
			font-size: 1.6rem;
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

		.note {
			@include flex(space-between, center);
			width: 100%;
			border: solid 1px $light;
			padding: 6px 10px;
			position: relative;

			&-text {
				font-size: 1.8rem;
				padding-right: 1rem;
			}

			&-button {
				@include flex(center, center, $gap: 3px);
				padding: 0 .5rem;

				button {
					@include flex(center, center);
					background: none;
					border: none;
					padding: .5rem;
					width: 2.25rem;
					min-width: 2.25rem;
					max-width: 2.25rem;
					pointer-events: none;
					opacity: 0;
					transition: .2s;

					svg {
						width: 100%;
					}

					&:hover {
						opacity: 1 !important;
					}
				}

				&:hover button {
					opacity: .7;
					pointer-events: all;
					transition: .4s;
				}
			}
		}
	}
}


button.add-button {
	margin-left: auto
}

</style>