<template>
<div>
    <div class="body">
        <div class="container">
            <div class="row">
                <div class="col-12 icons-list text-center">
                    <button class="col" v-for="i in taskIcons" :key="i.id" v-on:click.stop="this.changeType(i.id)" type="buttom">
                        <template v-if="i.id>0">
                            <img class="task-icon" :class="form.category!= '' && form.category != i.id ? 'inactive' : null" :src="i.path" alt="Tipo da Tarefa" />
                        </template>
                    </button>
                    <br /><br />
                    <small class="form-text validation">{{ validation.category }}</small>
                </div>
            </div>
        </div>
        <div class="container">
            <form class="form" @submit.prevent="checkForm">
                <div class="row">
                    <div class="form-group col-12">
                        <label for="title">Título</label>
                        <input v-model="form.title" type="text" class="form-control" id="title" placeholder="Enter title">
                        <input v-model="task.title" v-if="task.title!=null" type="text" hidden>
                        <small class="form-text validation">{{ validation.title }}</small>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-12">
                        <label for="text">Descrição</label>
                        <textarea v-model="form.description" rows="5" class="form-control" id="text" placeholder="Description" />
                        <small class="form-text validation">{{ validation.description }}</small>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6 col-sm-12">
                        <label for="date">Data</label>
                        <input v-model="form.date" type="date" class="form-control" id="date">
                        <img src="../assets/calendar.png" alt="Calendário" />
                        <small class="form-text validation">{{ validation.date }}</small>
                    </div>
                    <div class="form-group col-md-6 col-sm-12">
                        <label for="hour">Hora</label>
                        <input v-model="form.hour" type="time" class="form-control" id="hour">

                        <img src="../assets/clock.png" alt="Relógio" />
                        <small class="form-text validation">{{ validation.hour }}</small>
                    </div>
                </div>
                <div class="row options">
                    <div class="form-check col">
                        <input v-model="form.done" type="checkbox" class="form-check-input" id="done">
                        <label class="form-check-label" for="done">CONCLUÍDO</label>
                    </div>
                    <div class="form-group col" v-if="form.id!=null">
                        <button type="button" v-on:click.stop="this.deleteTask(form.id)">EXCLUIR</button>
                    </div>
                </div>
                <div class="row">
                    <button type="submit" class="btn bck-two">SALVAR</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
//============ Services ============//
import serviceTask from "../services/tasks.js";
//============ Utils ============//
import taskIcons from "../utils/taskIcons.js";
import mac from '../utils/isConnected.js';
//============ Features ============//
import {
    reactive
} from '@vue/reactivity';
import {
    format
} from 'date-fns';

export default {
    name: "Task",

    //============ Propriedades Enviadas ============//
    props: {
        id: {
            required: false,
            type: String,
        },
    },

    //============ Métodos ============//
    methods: {
        // ..alterar as categorias
        async changeType(params) {
            this.form.category = params;
        },

        // ..verificar itens em branco do form
        checkForm() {
            this.validation.title = '';
            this.validation.category = '';
            this.validation.description = '';
            this.validation.date = '';
            this.validation.hour = '';
            if (!this.form.title) {
                return this.validation.title = 'Informe o título!';
            } else if (!this.form.description) {
                return this.validation.description = 'Informe a descrição!';
            } else if (!this.form.date) {
                return this.validation.date = 'Defina uma data!';
            } else if (!this.form.hour) {
                return this.validation.hour = 'Defina uma hora!';
            } else if (!this.form.category) {
                return this.validation.category = 'Selecione uma categoria!';
            } else {
                this.saveTask();
            }
        },
    },

    //============ Variáveis ============//
    data() {
        return {
            filter: 'today',
            validation: {
                title: '',
                category: '',
                description: '',
                date: '',
                hour: '',
            }
        }
    },

    //============ Setup ============//
    setup(props) {
        // recupera os itens do service
        const {
            task,
            getTask,
            storeTask,
            destroyTask
        } = serviceTask();

        //..dados do formulário, e adicionais que precisam ser salvos
        const form = reactive({
            macaddress: '',
            id: null,
            title: '',
            category: '',
            description: '',
            when: '',
            done: false,
            date: '',
            hour: '',
        });

        // ..recupera a tarefa pelo id
        if (props.id != null) {
            getTask(props.id);
        }

        //.. é definido as funções para serem chamadas a qualquer momento
        //============ Get Task ============//
        const setTask = async (params) => {
            await getTask(params);
        };

        //============ Save Task ============//
        const saveTask = async () => {
            form.macaddress = mac;
            form.when = form.date + ' ' + form.hour;
            await storeTask({
                ...form
            });
        };

        //============ Delete Task ============//
        const deleteTask = async (id) => {
            if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
                await destroyTask(id);
            }
        };

        //.. retorna os itens para serem usados pelo vue (funções e variaveis)
        return {
            form,
            taskIcons,
            task,
            setTask,
            saveTask,
            deleteTask
        };
    },

    //============ Updated ============//
    updated() {
        //  recupera os dados e os atribui de forma separada (somente quando existir uma Task)
        // lembrando que não é a maneira + adequada devido as requisições constantes
        if (this.task.macaddress != this.form.macaddress && this.task.macaddress != null) {
            this.form.macaddress = this.task.macaddress;
            this.form.id = this.task.id;
            this.form.title = this.task.title;
            this.form.category = this.task.category;
            this.form.description = this.task.description;
            this.form.done = this.task.done;
            this.form.date = format(new Date(this.task.when), 'yyyy-MM-dd');
            this.form.hour = format(new Date(this.task.when), 'HH:mm');
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

.icons-list {
    width: 100%;
}

.icons-list button {
    background: none;
    border: none;
    align-content: center;
    margin: 0 10px;
}

.task-icon {
    height: 70px;
    cursor: pointer;
}

.task-icon:hover {
    opacity: 0.8;
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

.options {
    text-align: start;
    margin-top: 20px;
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

.validation {
    color: red;
}
</style>
