<template>
    <div>
      <h1>dashboard</h1>
      <section class="card-container">
        <template 
          v-for="widget in widgets"
          :key="widget.name"
        >        
          <article 
            v-if="widget.active"
            class="dashboard-card"
          >
            <h2 class="dashboard-card_title">{{ widget.name }}</h2>
            
            <component 
              v-if="widget.active" 
              :is="widget.location" 
            />
          </article>
        </template>
      </section>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    widgets: [
        {
          name: 'cryptoTracker', 
          location:'WidgetsCryptoTracker', 
          active: true, 
          order: 1
        },
        {
          name: 'Take a Note', 
          location:'WidgetsTakeNote', 
          active: true, 
          order: 2
        },
        {
          name: 'setTimer', 
          location:'WidgetsSetTimer', 
          active: true, 
          order: 3
        },
    ],
  }),
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.card-container {
  @include flex(flex-start, flex-start, $wrap: wrap, $gap: 20px);
}

.dashboard-card {
    @include flex(flex-start, flex-start, column, $gap: 20px);
    background-color: $dark;
    padding: 20px 25px;
    border-radius: 20px;
    min-width: 100px;
    color: $light;

    &_title {
        font-weight: 700;
        font-size: 17px;
        color: $light;
    }
}

</style>