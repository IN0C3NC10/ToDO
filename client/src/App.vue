<template>
<div>
    <Header :lateCount="this.late" v-on:functionLate="lateTasks" />
    <router-view/>
    <Footer />
</div>
</template>

<script>
//============ Bootstrap ============//
import "bootstrap/dist/css/bootstrap.css";
//============ Componentes ============//
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
//============ Services ============//
import serviceTask from "./services/tasks.js";

export default {
    name: "App",

    //============ Componentes ============//
    components: {
        Header,
        Footer,
    },

    //============ Métodos ============//
    methods: {
        async lateTasks() {
            this.filter = 'late';
            this.allTasks(this.filter);
        }
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
            late,
            lateTasks,
        } = serviceTask();

        //.. é definido as funções para serem chamadas a qualquer momento
        //============ Late Tasks ============//
        const pastTasks = async () => {
           await lateTasks();
        };

        //.. retorna os itens para serem usados pelo vue (funções e variaveis)
        return {
            late,
            pastTasks
        };
    },

    //============ Created ============//
    created() {
        this.pastTasks();
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
