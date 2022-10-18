<template>
    <button
        class="add-button" 
        type="button"
        @click="addItem"
        :style="[color ? {'--color': color}: {'--color': '#E3D45A'}]"
        >
        <span class="icon">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2.58571H3.43266V0H2.56734V2.58571H0V3.41429H2.56734V6H3.43266V3.41429H6V2.58571Z" fill="#1D1D1D"/>
            </svg>
        </span>
        <span class="content">{{ text }}</span>
    </button>
</template>

<script lang="ts">
export default {
  props: ['text', 'color'],
  data: () => ({
    // get json data en fonction du nom du widget
  }),
  methods: {
    addItem() {
        console.log('ajout dun item')
    }
  }
}

</script>

<style lang="scss" scoped>
@use '@/assets/variables' as *;
    
    $color: $primary;

    button.add-button {
        $color: var(--color);
        @include flex(center, center);
        padding: 0 0 0 13px;
        border: none;
        background: $t;
        border-radius: 50px;
        position: relative;
        transition: .2s;

        span { 
            border-radius: 50px;
            border: solid .5px $t;
            transition: .2s;

            &.icon {
                @include flex(center, center);
                @include position(50%, 0);
                translate: 0 -50%;
                padding: 3px;
                width: 13px;
                height: 13px;
                transition: .2s;

                svg { 
                    width: 100%;
                    height: 100%;
                    transition: .1s;

                    path { 
                        transition: .2s;
                    }
                }
            }

            &.content {
                @include flex(center, center);
                text-align: center;
                height: 15px;
                padding: 0 5px;
                text-transform: uppercase;
                font-size: 10px;
                transition: .2s;
            }
        }

        &:not(.stroke) {
            border: 1px solid $t;

            span { 
                background-color: $color;

                svg {
                    fill: $dark
                }

                &.content {
                    color: $dark
                }
            }
        }

        &.stroke {
            span { 
                background-color: $t;
                border-color: $color;

                svg path {
                    fill: $color
                }

                &.content {
                    color: $color
                }
            }
        }

        &:hover {
            transition: .15s .15s;

            svg {
                translate: 50%;
            }
        }

        &:not(.stroke):hover {
            border-color: $color;

            span { 
                border-color: $t;
                background-color: $t;
                color: $color;

                svg path {
                    fill: $color;
                }
            }
        }

        &.stroke:hover {
            background-color: $color;

            span { 
                color: $dark;

                svg path {
                    fill: $dark;
                }
            }
        }
    }
</style>