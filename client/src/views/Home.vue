<template>
<div>
    <Header />
    <div class="container body">
        <div class="row">
            <button class="col filter-card" type="button" v-on:click.stop="this.filter='all'">
                <FilterCard title="Todos" :active="this.filter=='all'" />
            </button>
            <button class="col filter-card" type="button" v-on:click.stop="this.filter='today'">
                <FilterCard title="Hoje" :active="filter=='today'" />
            </button>
            <button class="col filter-card" type="button" v-on:click.stop="this.filter='week'">
                <FilterCard title="Semana" :active="filter=='week'" />
            </button>
            <button class="col filter-card" type="button" v-on:click.stop="this.filter='month'">
                <FilterCard title="Mês" :active="filter=='month'" />
            </button>
            <button class="col filter-card" type="button" v-on:click.stop="this.filter='year'">
                <FilterCard title="Ano" :active="filter=='year'" />
            </button>
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import FilterCard from "../components/FilterCard.vue";
export default {
    components: {
        Header,
        Footer,
        FilterCard,
    },

    data() {
        return {
            filter: 'today',
        }
    },
};
</script>

<style>
:root {
    --light: #fff;
    --dark: #333;
    --one: #1b2c86;
    --two: #f4970b;
    --three: #707070;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;
}

.body {
    margin-top: 20px;
    margin-bottom: 20px;
}

.filter-card {
    background: none;
    border: none;
    margin: 0px;
}
</style>
