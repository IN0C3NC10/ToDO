<template>
<div>
    <Header />
    <div class="body">
        <div class="container">
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
        <div class="tasks">
            <h4 class="task-title">TAREFAS</h4>
        </div>
        <div class="container">
            <div class="row">
                <TaskCard title="None" date="none" hour="none" />
                <TaskCard title="None" date="none" hour="none" />
                <TaskCard title="None" date="none" hour="none" />
                <TaskCard title="None" date="none" hour="none" />
                <TaskCard title="None" date="none" hour="none" />
                <TaskCard title="None" date="none" hour="none" />
                <TaskCard title="None" date="none" hour="none" />
                <TaskCard title="None" date="none" hour="none" />
                <TaskCard title="None" date="none" hour="none" />
                <TaskCard title="None" date="none" hour="none" />
                <TaskCard title="None" date="none" hour="none" />
                <TaskCard title="None" date="none" hour="none" />
            </div>
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
import TaskCard from "../components/TaskCard.vue";
export default {
    components: {
        Header,
        Footer,
        FilterCard,
        TaskCard
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
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500&display=swap');
    font-family: 'Ubuntu', sans-serif;
    color: var(--dark);
}

.body {
    margin-top: 20px;
    margin-bottom: 20px;
}

.container {
    margin-bottom: 20px;
}

.tasks {
    width: 100%;
    border-bottom: 1px solid var(--three);
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.task-title {
    color: var(--one);
    position: relative;
    top: 23px;
    background-color: var(--light);
    padding: 0 10px;
    font-weight: bold;
}

.filter-card {
    background: none;
    border: none;
    margin: 0px;
}
</style>
