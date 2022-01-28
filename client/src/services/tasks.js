import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default function serviceTasks() {
    const url = 'http://localhost:3000/';
    const tasks = ref([]);
    const task = ref([]);
    const late = ref();
    const errors = ref('');
    const router = useRouter();

    //============= GET TASKS =============//
    const getTasks = async (filter) => {
        let response = await axios.get(url + 'task/filter/' + filter + '/00:00:5e:00:53:af');
        tasks.value = response.data;
    }

    //============= LATE TASKS =============//
    const lateTasks = async () => {
        let response = await axios.get(url + 'task/filter/late/00:00:5e:00:53:af');
        late.value = response.data.length;
    }

    //============= STORE TASK =============//
    const storeTask = async (data) => {
        errors.value = '';
        try {
            if (data.id != null) {
                // ..Altera os dados e redireciona para a rota de listagem
                await axios.put(url + 'task/' + data.id, data);
                await router.push({ name: 'home' });
            } else {
                await axios.post(url + 'task', data);
            }
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

    return {
        errors,
        tasks,
        task,
        late,
        getTasks,
        lateTasks,
        storeTask,
        getTask,
    }
}