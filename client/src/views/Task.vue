<template>
<div>
    <!-- <Header :lateCount="this.late" v-on:functionLate="lateTasks" /> -->
    <div class="body">
        <div class="container">
            <div class="row">
                <div class="text-center col-12">
                    <h5>Task!</h5>
                </div>
            </div>
        </div>
    </div>
    <!-- <Footer /> -->
</div>
</template>

<script>
//============ Bootstrap ============//
import "bootstrap/dist/css/bootstrap.css";
//============ Componentes ============//
// import Header from "../components/Header.vue";
// import Footer from "../components/Footer.vue";
//============ Services ============//
import serviceTask from "../services/tasks.js";

export default {
    name: "Task",

    //============ Componentes ============//
    components: {
        // Header,
        // Footer,
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
            lateTasks,
            tasks,
            late
        } = serviceTask();

        //.. é definido as funções para serem chamadas a qualquer momento
        //============ All ============//
        const allTasks = async (params) => {
            await getTasks(params);
        };

        //============ Late Tasks ============//
        const pastTasks = async () => {
            await lateTasks();
        };

        //.. retorna os itens para serem usados pelo vue (funções e variaveis)
        return {
            tasks,
            late,
            allTasks,
            pastTasks
        };
    },

    //============ Created ============//
    created() {
        this.allTasks(this.filter);
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
</style>
