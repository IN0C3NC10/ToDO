<template>
<div>
    <router-view />
    <div class="body">
        <div class="container">
            <div class="row">
                <button class="col filter-card" type="button" v-on:click.stop="this.changeFilter('all')">
                    <FilterCard title="TODOS" :active="filter=='all'" />
                </button>
                <button class="col filter-card" type="button" v-on:click.stop="this.changeFilter('today')">
                    <FilterCard title="HOJE" :active="filter=='today'" />
                </button>
                <button class="col filter-card" type="button" v-on:click.stop="this.changeFilter('week')">
                    <FilterCard title="SEMANA" :active="filter=='week'" />
                </button>
                <button class="col filter-card" type="button" v-on:click.stop="this.changeFilter('month')">
                    <FilterCard title="MÊS" :active="filter=='month'" />
                </button>
                <button class="col filter-card" type="button" v-on:click.stop="this.changeFilter('year')">
                    <FilterCard title="ANO" :active="filter=='year'" />
                </button>
            </div>
        </div>
        <div class="tasks">
            <h4 class="task-title">{{ this.filter=='late' ? 'TAREFAS ATRASADAS' : 'TAREFAS' }}</h4>
        </div>
        <div class="container">
            <div class="row">
                <template v-if="this.tasks.length > 0">
                    <TaskCard v-for="t in this.tasks" :key="t.id" :id="t.id" :done="t.done" :title="t.title" :category="t.category" :date="new Date(t.when).toLocaleDateString('pt-BR')" :hour="new Date(t.when).toLocaleString('pt-BR', {hour: 'numeric',minute: 'numeric',hour12: false})" />
                </template>
                <template v-else>
                    <div class="text-center col-12">
                        <h5>Não há tarefas registradas!</h5>
                    </div>
                </template>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//============ Bootstrap ============//
import "bootstrap/dist/css/bootstrap.css";
//============ Componentes ============//
import FilterCard from "../components/FilterCard.vue";
import TaskCard from "../components/TaskCard.vue";
//============ Services ============//
import serviceTask from "../services/tasks.js";

export default {
    name: "Home",

    //============ Componentes ============//
    components: {
        FilterCard,
        TaskCard
    },

    //============ Métodos ============//
    methods: {
        async changeFilter(params) {
            this.filter = params;
            this.allTasks(params);
        },
    },

    //============ Variáveis ============//
    data() {
        return {
            filter: 'today',
        }
    },

    //============ Setup ============//
    setup() {
        // recupera os itens do service
        const {
            getTasks,
            tasks,
        } = serviceTask();

        //.. é definido as funções para serem chamadas a qualquer momento
        //============ All ============//
        const allTasks = async (params) => {
            await getTasks(params);
        };

        //.. retorna os itens para serem usados pelo vue (funções e variaveis)
        return {
            tasks,
            allTasks,
        };
    },

    //============ Created ============//
    created() {
        this.allTasks(this.filter);
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

a {
    text-decoration: none;
    color: var(--dark)
}

.body {
    margin-top: 20px;
    margin-bottom: 20px;
}

.container {
    margin-bottom: 20px;
}

.filter-card {
    background: none;
    border: none;
    margin: 0px;
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
</style>
