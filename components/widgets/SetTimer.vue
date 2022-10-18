<template>
    <div class="dashboard__crypto">
      Timer
    </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    
  }),
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.dashboard__crypto {
  &__button-container {
      @include flex(flex-start, center, $gap: 10px);

      button:not(.add-button) {
          background-color: $t;
          border: none;
          color: $light;
          padding: 2px 6px;
          border-radius: 50px;

          &.active {
              color: $dark;
              background-color: $yellow;
          }
      }
  }

  &__row-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr .3fr;
      grid-column-gap: 15px;
      grid-row-gap: 5px;
      width: 100%;
      margin-top: 25px;

      li {
          min-width: 70px;

          h3, p {
            font-weight: light;
            font-size: 15px;
          }
          &.crypto__value {
              justify-self: center;
              text-align: center;
          }

          &.crypto__chart {
              @include color('background-color', $green, .5);
              width: 100%;
              justify-self: center;
          }
          &.crypto__order {
              justify-self: end;
              min-width: unset;  
          }
      }
  }
}

button.add-button {
  margin-left: auto
}

</style>