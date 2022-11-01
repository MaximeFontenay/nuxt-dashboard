<script lang="ts" setup>
	defineProps({
		color:String
	})
</script>
<template>
	<svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			:style="[color ? 'stroke:' + color : 'stroke: #E6E6E6']"
			stroke-width="2.85714" stroke-linecap="round" stroke-linejoin="round"
			d="M2 7.12761L9.33426 14.5437C9.61946 14.8321 10.0873 14.8255 10.3641 14.5291L22 2.07214" />
	</svg>
</template>

<script lang="ts">
export default {
	props: ['color'],
}
</script>

<style scoped>

</style>