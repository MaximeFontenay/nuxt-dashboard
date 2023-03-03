<template>
    <button
        class="add-button" 
        type="button"
        @click="addItem"
        :style="[color ? {'--color': color}: {'--color': '#E3D45A'}]"
        >
        <span class="icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M20 10C20 9.23732 19.3817 8.61905 18.619 8.61905H11.4422V1.44219C11.4422 0.645692 10.7965 0 10 0V0C9.2035 0 8.55781 0.645692 8.55781 1.44219V8.61905H1.38095C0.618274 8.61905 0 9.23732 0 10V10C0 10.7627 0.618273 11.381 1.38095 11.381H8.55781V18.5578C8.55781 19.3543 9.2035 20 10 20V20C10.7965 20 11.4422 19.3543 11.4422 18.5578V11.381H18.619C19.3817 11.381 20 10.7627 20 10V10Z" />
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
        console.log("ajout d'un item")
    }
  }
}

</script>

<style lang="scss" scoped>
@use '@/assets/_variables.scss' as *;
    
    $color: $primary;

    button.add-button {
        $color: var(--color);
        @include flex(center, stretch);
        padding-left: 15px;
        border: none;
        outline: none;
        background: $t;
        border-radius: 50px;
        position: relative;
        transition: .2s;

        span { 
            border-radius: 50px;
	        outline: solid .5px $t;
            transition: .2s;

            &.icon {
                @include flex(center, center);
                @include position(50%, 0);
                translate: -3px -50%;
                padding: 5%;
                aspect-ratio: 1;
                width: auto;
	            max-width: 20px;
	            height: 100%;
	            max-height: 20px;
                transition: .5s translate, .25s background-color;
	            will-change: translate;

                svg { 
                    width: 1rem;
	                min-width: 1rem;
	                max-width: 1rem;
                    height: 1rem;
                    transition: .5s;
                    will-change: translate;

	                path {
                        fill: $dark;
                        transition: .2s;
                    }
                }
            }

            &.content {
                @include font();
	            @include fz(1);
	            @include flex(center, center);
                text-align: center;
                padding: 0 .5rem;
                text-transform: uppercase;
	            font-variation-settings: 'wght' 600;
                transition: .175s color .175s, .2s background-color;
            }
        }

        &:not(.stroke) {
            outline: 1px solid $t;

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
	            outline-color: $color;

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

	        .icon {
		        translate: calc(100% + 2px) -50%;
	        }

            svg {
                translate: -200%;
            }
        }

        &:not(.stroke):hover {
            outline-color: $color;

            span {
	            outline-color: $t;
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