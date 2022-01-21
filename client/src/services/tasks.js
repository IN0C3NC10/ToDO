import axios from 'axios';
import { ref } from 'vue';

export default function serviceTasks(){
    const url = 'http://localhost:3000/';
    const tasks = ref([]);

    //============= GET TASKS =============//
    const getTasks = async(filter)=>{
        let response = await axios.get(url+'task/filter/'+filter+'/00:00:5e:00:53:af');
        tasks.value = response.data;
    }

    return{
        tasks,
        getTasks
    }
}