<script setup>
    definePageMeta({
      title: 'Nuxt Dashboard'
    })
</script>
<template>

    <header>
        <nav>
            <ul>
                <li><a href="#">home</a></li>
                <li><a href="#">store</a></li>
                <li><a href="#">analytics</a></li>
            </ul>
        </nav>
    </header>

    <main>

        <h1>Dashboard</h1>

        <section class="main-card__container">
            <article class="main-card red">
                <h2 class="main-card__title">Sales</h2>
                <p class="main-card__number">198</p>
                <div class="main-card__chart red"></div>
            </article>
            <article class="main-card yellow">
                <h2 class="main-card__title">Orders</h2>
                <p class="main-card__number"><span>+</span>21%</p>
                <div class="main-card__chart yellow"></div>
            </article>
            <article class="main-card blue">
                <h2 class="main-card__title">Visits</h2>
                <p class="main-card__number"><span>+</span>37%</p>
                <div class="main-card__chart blue"></div>
            </article>
        </section>

    </main>


</template>