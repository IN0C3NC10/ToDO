import axios from 'axios';
import { ref } from 'vue';

export default function serviceTasks() {
    const url = 'http://localhost:3000/';
    const tasks = ref([]);
    const late = ref();
    const errors = ref('');

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
        let response = await axios.get(url + 'task/filter/late/00:00:5e:00:53:af');
        late.value = response.data.length;

        try {
            await axios.post(url + 'task', data);
        } catch (e) {
            if (e.response.status === 422) {
                // ..caso algum problema de validação seja encontrado ele percorre os erros e os agrupa noo mesmo item 
                for (let key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    return {
        errors,
        tasks,
        late,
        getTasks,
        lateTasks,
        storeTask
    }
}