<template>
<div>
    <!-- <Header :lateCount="this.late" v-on:functionLate="lateTasks" /> -->
    <div class="body">
        <div class="container">
            <div class="row">
                <div class="col-12 icons-list text-center">
                    <button class="col" v-for="i in taskIcons" :key="i" v-on:click.stop="this.active=i" type="buttom">
                        <img class="task-icon" :class="active && active != i ? 'inactive' : null" :src="i" alt="Tipo da Tarefa" />
                    </button>
                </div>
            </div>
        </div>
        <div class="container">
            <form class="form">
                <div class="row">
                    <div class="form-group col-12">
                        <label for="title">Título</label>
                        <input type="text" class="form-control" id="title" placeholder="Enter title">
                        <small id="titleHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-12">
                        <label for="text">Descrição</label>
                        <textarea rows="5" class="form-control" id="text" placeholder="Description" />
                        <small id="textHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6 col-sm-12">
                        <label for="date">Data</label>
                        <input type="date" class="form-control" id="date" placeholder="Date">
                        <img src="../assets/calendar.png" alt="Calendário" />
                    </div>
                    <div class="form-group col-md-6 col-sm-12">
                        <label for="hour">Hora</label>
                        <input type="time" class="form-control" id="hour" placeholder="Hour">
                        <img src="../assets/clock.png" alt="Relógio" />
                    </div>
                </div>
                <div class="row options">
                    <div class="form-check col">
                        <input type="checkbox" class="form-check-input" id="done">
                        <label class="form-check-label" for="done">CONCLUÍDO</label>
                    </div>
                    <div class="form-group col">
                        <button type="button">EXCLUIR</button>
                    </div>
                </div>
                <div class="row">
                    <button type="submit" class="btn bck-two">SALVAR</button>
                </div>
            </form>

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
//============ Utils ============//
import taskIcons from "../utils/taskIcons.js";

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
            active: false,
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
            taskIcons,
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

.bck-one {
    background-color: var(--one);
    color: var(--light);
}

.bck-two {
    background-color: var(--two);
    color: var(--light);
}

.body {
    margin-top: 20px;
    margin-bottom: 20px;
}

.container {
    margin-bottom: 20px;
}

button,
a {
    cursor: pointer;
}

button:hover {
    opacity: 0.7;
}

.icons-list {
    width: 100%;
}

.icons-list button {
    background: none;
    border: none;
}

.task-icon {
    margin-right: 20px;
    height: 70px;
    cursor: pointer;
}

.task-icon:hover {
    opacity: 0.5;
}

.inactive {
    opacity: 0.5;
}

.form {
    margin: 0 20% 0 20%;
}

.form label {
    color: var(--three);
    margin-bottom: 5px;
    font-weight: bold;
    margin: 10px 0px;
}

.form .form-control {
    font-size: 16px;
    padding: 12px;
    color: var(--dark);
    border: none;
    border-bottom: 1px solid var(--two);
}

.form img {
    height: 30px;
    position: relative;
    left: 90%;
    bottom: 70px;
}

.options .form-check {
    text-align: start;
}

.options .form-check input {
    border: 1px solid var(--two);
    font-size: 20px;
    margin-left: 5px;
    margin-right: 5px;
}

.form-check-input:checked {
    background-color: var(--two);
    border-color: var(--two);
}

.options .form-check label {
    font-weight: bold;
    color: var(--two);
    margin-top: 2px;
}

.options .form-group {
    text-align: end;
}

.options .form-group button {
    color: var(--one);
    font-weight: bold;
    border: none;
    background: none;
}

.btn {
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    padding: 15px;
    border-radius: 30px;
}

.btn:hover {
    color: var(--light);
}
</style>
