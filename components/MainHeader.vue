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
@use 'assets/variables' as *;

nav {
	background-color: $dark;
	padding: 20px;
	border-radius: 100px;

	ul {
		@include flex(flex-start, center, $gap: 20px);

		li {
			a {
				color: $grey;
				font-family: $font;
				font-weight: 200;
				text-decoration: none;
				font-size: 2rem;

				&.router-link-active {
					color: $yellow;
				}
			}
		}
	}
}

</style>