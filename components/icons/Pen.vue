<script lang="ts" setup>
	defineProps({
		color:String
	})
</script>
<template>
	<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			:style="[color ? 'fill:' + color : 'fill: white']"
			d="M18.5529 6.3501C18.997 5.90595 19.2414 5.3161 19.2414 4.68865C19.2414 4.0612 18.997 3.47135 18.5529 3.0272L16.6893 1.16365C16.2452 0.719498 15.6553 0.475098 15.0279 0.475098C14.4004 0.475098 13.8106 0.719498 13.3676 1.16247L0.875 13.6163V18.8039H6.06027L18.5529 6.3501ZM15.0279 2.8251L16.8926 4.68747L15.0243 6.54867L13.1608 4.6863L15.0279 2.8251ZM3.225 16.4539V14.5915L11.497 6.3454L13.3605 8.20895L5.08972 16.4539H3.225ZM0.875 21.1539H19.675V23.5039H0.875V21.1539Z"/>
	</svg>
</template>

<script lang="ts">
export default {
	props: ['color'],
}
</script>

<style scoped>

</style>