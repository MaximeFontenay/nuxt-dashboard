<template>
	<teleport to="body">
		<div class="alert" :class="alertType" :style="{'--color': getColor(alertType)}" @click="showAlert(timer, )">
			<p class="alert__message">{{ text }}</p>
			<span class="alert__progressbar">
				<span class="alert__progressbar-inner"></span>
			</span>
		</div>
	</teleport>
</template>

<script lang="ts">
export default {
	props: {
		'text': {
			type: String,
			required: true,
		},
		'alertType': {
			type: String,
			required: true,
			default: 'success' // warning, error
		},
		'timer': {
			type: Number,
			default: 3000 // ms
		},
	},
	data: () => ({
		// get json data en fonction du nom du widget
	}),
	methods: {
		showAlert(timer: number) {
			console.log(this.timer)
			setTimeout(() => {
				console.log('show')

			}, timer)
		},
		hideAlert() {
			console.log('hide')
		},
		getColor(type:string):string {
			switch (type) {
				case 'error':
					return '12, 57%'
				case 'warning':
					return '53, 60%'
				case 'info':
					return '251, 34%'
				default:
					return '134, 51%'
			}
		}
	},
	computed: {

	}
}

</script>

<style lang="scss" scoped>
@use '@/assets/_variables.scss' as *;

.alert {
	@include flex(center, center, $gap: 20px);
	@include position($bottom: 2vh, $left: 50%, $position: fixed);
	@include color('background-color', $dark, .2);
	border: solid .2px hsl(var(--color), 50%);
	translate: -50%;
	backdrop-filter: blur(3px);
	border-radius: 0 4px 4px 4px;
	width: fit-content;
	padding: 5px 20px 7.5px;
	overflow: hidden;
	z-index: 99;

	&__message {
		font-weight: 900;
		font-size: 17px;
		color: hsl(var(--color), 50%);
	}

	&__progressbar {
		@include position($bottom: 0, $left: 0);
		width: 100%;
		height: 2px;
		background-color: hsl(var(--color), 10%);
		border-radius: 0 0 0 4px;
		overflow: hidden;

		&-inner {
			@include position($bottom: 0, $right: 0);
			width: 40%;
			height: 2px;
			background-color: hsl(var(--color), 50%);
			border-radius: 0 0 0 4px;
		}
	}

}
</style>