<script setup>
    definePageMeta({
      title: 'Nuxt Dashboard'
    })
</script>
<template>

    <header>
        <nav>
            <ul>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
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

        <section class="team">
            <div class="team__container">
                <div class="team__container__heading">
                    <h2>Team</h2>
                    <div class="team__container__heading__sorting">
                        <p>Sort by <span>Activity</span></p>
                    </div>
                </div>
                <div class="team__container__grid">
                    <div class="team__container__grid__row">
                        <div class="team__container__grid__row__user">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
                            <p>Nick Logan</p>
                        </div>
                        <div class="team__container__grid__row__requests">
                            <p class="number">258</p>
                            <p>Requests</p>
                        </div>
                        <div class="team__container__grid__row__transactions">
                            <p class="number">184</p>
                            <p>Transactions</p>
                        </div>
                        <div class="team__container__grid__row__scors">
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main>


</template>