<template>
	<teleport to="body">
		<div
			v-if="show"
			class="toaster"
			:class="toasterType"
			:style="{'--color': getColor(toasterType)}"
			@click="closeToaster"
			>
			<p class="toaster__message">{{ text }}</p>
			<span class="toaster__progressbar">
				<span class="toaster__progressbar-inner" :style="{'width': progression + '%'}"></span>
			</span>
		</div>
	</teleport>
</template>

<script lang="ts">
export default defineComponent({
	props: {
		toasterType: {
			type: String,
			default: 'success', // warning, error
		},
		text: {
			type: String,
			required: true
		},
		timer: {
			type: Number,
			default: 5000,
		}
	},
	data: () => ({
		progression: 0,
		show: false,
		timing: null,
	}),
	watch: {
		text(){
			this.newToast()
		}
	},
	methods: {
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
		},

		closeToaster() {
			this.show = false;
			clearInterval(this.timing)
		},

		newToast() {
			console.log('show')
			this.show = true;
			const maxTimer = this.timer / 1000
			let tic = 0

			this.timing = setInterval(() => {
				tic += 1
				this.progression = tic * maxTimer / 100
			}, .01);

			setTimeout(() => {
				this.closeToaster()
			}, this.timer);
		}
	},
	computed: {},
	mounted() {

	}
})

</script>

<style lang="scss" scoped>
@use '@/assets/_variables.scss' as *;

.toaster {
	@include flex(center, center, $gap: 20px);
	@include position($bottom: 2vh, $left: 50%, $position: fixed);
	@include color('background-color', $dark, .2);
	border: solid .2px hsl(var(--color), 50%);
	translate: -50%;
	backdrop-filter: blur(3px);
	border-radius: 4px;
	width: fit-content;
	padding: 5px 20px 7.5px;
	overflow: hidden;
	z-index: 99;

	&__message {
		font-weight: 900;
		font-size: 40px;
		color: hsl(var(--color), 50%);
	}

	&__progressbar {
		@include position($bottom: 0, $left: 0);
		width: 100%;
		height: 5px;
		background-color: hsl(var(--color), 30%);
		border-radius: 0 0 0 4px;
		overflow: hidden;

		&-inner {
			@include position($bottom: 0, $right: 0);
			width: 40%;
			height: 5px;
			background-color: hsl(var(--color), 50%);
			border-radius: 0 0 0 4px;
		}
	}

}
</style>