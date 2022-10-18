
<script lang="ts" setup>
const takeNote = resolveComponent('WidgetsTakeNote')
const cryptoTracker = resolveComponent('WidgetsCryptoTracker')
</script>

<template>
    <article class="dashboard-card">
        <h2 class="dashboard-card_title">{{ widget.name }}</h2>
        <component :is="takeNote"></component>
    </article>
</template>


<script lang="ts">

export default {
  props: ['widget'],
  data: () => ({

    // get json data en fonction du nom du widget
  }),
  computed: {
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.dashboard-card {
    @include flex(flex-start, flex-start, column, $gap: 20px);
    background-color: $dark;
    padding: 20px 25px;
    min-width: 100px;
    color: $light;

    &_title {
        font-weight: 700;
        font-size: 17px;
        color: $light;
    }

    
}

</style>