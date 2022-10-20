<template>
	<div class="dashboard__notes">
		<div class="dashboard__notes__button-container">
			<input
				type="text"
				placeholder="New note..."
				v-model="newNote"
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
					class="note">
					  {{ note.text }}
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
			localStorage.setItem('Take a Note', JSON.stringify(this.notes))
			this.newNote = ''
		},
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

		li.note {
			width: 100%;
			border: solid 1px $light;
			padding: 6px 10px;
			font-size: 1.3rem;
		}
	}
}


button.add-button {
	margin-left: auto
}

</style>