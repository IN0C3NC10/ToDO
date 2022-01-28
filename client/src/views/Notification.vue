<template>
<div>
    <div class="body">
        <div class="tasks">
            <h4 class="task-title">TAREFAS ATRASADAS</h4>
        </div>
        <div class="container">
            <div class="row">
                <template v-if="this.tasks.length > 0">
                    <TaskCard v-for="t in this.tasks" :key="t.id" :id="t.id" :done="t.done" :title="t.title" :category="t.category" :date="new Date(t.when).toLocaleDateString('pt-BR')" :hour="new Date(t.when).toLocaleString('pt-BR', {hour: 'numeric',minute: 'numeric',hour12: false})" />
                </template>
                <template v-else>
                    <div class="text-center col-12">
                        <h5>Não há tarefas atrasadas!</h5>
                    </div>
                </template>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//============ Componentes ============//
import TaskCard from "../components/TaskCard.vue";
//============ Services ============//
import serviceTask from "../services/tasks.js";

export default {
    name: "Notification",

    //============ Componentes ============//
    components: {
        TaskCard
    },

    //============ Variáveis ============//
    data() {
        return {
            //
        }
    },

    //============ Setup ============//
    setup() {
        // recupera os itens do service
        const {
            tasks,
            getTasks,
        } = serviceTask();

        //.. é definido as funções para serem chamadas a qualquer momento
        //============ All ============//
        const allTasks = async () => {
            await getTasks('late');
        };

        //.. retorna os itens para serem usados pelo vue (funções e variaveis)
        return {
            tasks,
            allTasks,
        };
    },

    //============ Created ============//
    created() {
        this.allTasks();
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
