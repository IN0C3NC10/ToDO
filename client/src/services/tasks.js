import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import mac from '../utils/isConnected.js';

export default function serviceTasks() {
    const url = 'http://localhost:3000/';
    const tasks = ref([]);
    const task = ref([]);
    const late = ref();
    const errors = ref('');
    const router = useRouter();

    //============= GET TASKS =============//
    const getTasks = async (filter) => {
        let response = await axios.get(url + 'task/filter/' + filter + '/' + mac);
        tasks.value = response.data;
    }

    //============= LATE TASKS =============//
    const lateTasks = async () => {
        let response = await axios.get(url + 'task/filter/late/' + mac);
        late.value = response.data.length;
    }

    //============= STORE TASK =============//
    const storeTask = async (data) => {
        errors.value = '';
        try {
            if (data.id != null) {
                // ..Altera os dados
                await axios.put(url + 'task/' + data.id, data);
            } else {
                // ..Insere os dados
                await axios.post(url + 'task', data);
            }
            // ..Redireciona para a rota de listagem
            await router.push({ name: 'home' });
        } catch (e) {
            if (e.response.status === 422) {
                // ..caso algum problema de validação seja encontrado ele percorre os erros e os agrupa noo mesmo item 
                for (let key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    //============= GET TASK =============//
    const getTask = async (id) => {
        let response = await axios.get(url + 'task/' + id);
        task.value = response.data;
    }

    //============= DESTROY TASK =============//
    const destroyTask = async (id) => {
        let response = await axios.delete(url + 'task/' + id);
        // ..caso tenha dado tudo certo
        if (response.status === 200) {
            await router.push({ name: 'home' });
        }
    }

    return {
        errors,
        tasks,
        task,
        late,
        getTasks,
        lateTasks,
        storeTask,
        getTask,
        destroyTask
    }
}