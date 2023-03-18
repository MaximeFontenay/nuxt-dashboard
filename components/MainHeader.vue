<template>
	<header>
		<nav>
			<ul>
				<li>
					<NuxtLink to="/">Home</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/projects">projects</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/dashboard">dashboard</NuxtLink>
				</li>
				<!--<li><NuxtLink to="/team">team</NuxtLink></li>
				<li><NuxtLink to="/team">reports</NuxtLink></li>
				<li><NuxtLink to="/team">settings</NuxtLink></li>-->
			</ul>
		</nav>

	</header>
</template>

<style lang="scss" scoped>
@use '@/assets/_variables.scss' as *;

nav {
	background-color: $dark;
	padding: clamp(20px, 1.5vw, 50px);
	border-radius: 100px;
	width: fit-content;

	ul {
		@include flex(flex-start, center, $gap: clamp(5px, 1vw, 40px));

		li {
			a {
				color: $grey;
				font-family: $font;
				font-weight: 200;
				text-decoration: none;
				@include fz(2.5);

				&.router-link-active {
					color: $yellow;
				}
			}
		}
	}
}

</style>