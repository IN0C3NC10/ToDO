<template>
<div class="col">
    <router-link :to="{name: 'task.edit',params:{id:id}}">
        <div class="card" :style="done ? 'opacity:0.5': null">
            <div class="card-body">
                <img :src="taskIcons[category].path" alt="Icone da Tarefa" />
                <h5>{{ title.substr(0,20) }}..</h5>
            </div>
            <div class="card-footer">
                <div class="row">
                    <strong class="col">{{ date }}</strong>
                    <span class="col">{{ hour }}</span>
                </div>
            </div>
        </div>
    </router-link>
</div>
</template>

<script>
//============ Utils ============//
import taskIcons from "../utils/taskIcons.js";

export default {
    name: "TaskCard",
    props: ['id', 'done', 'title', 'date', 'hour', 'category'],

    //============ Setup ============//
    setup() {
        return {
            taskIcons
        }
    }
};
</script>

<style scoped>
:root {
    --light: #fff;
    --dark: #333;
    --one: #1b2c86;
    --two: #f4970b;
    --three: #707070;
}

.col {
    display: flex;
    justify-content: center;
}

.col a:hover {
    color: var(--dark);
}

.card {
    height: 200px;
    width: 250px;
    border-radius: 5px;
    text-align: center;
    margin-top: 20px;
    transition: all 0.3s ease;
}

.card:hover {
    opacity: 0.6;
    cursor: pointer;
}

img {
    width: 100px;
    height: 100px;
}

.card-body {
    flex-direction: column;
    color: var(--dark);
    text-align: center;
    font-weight: bold;
}

.card-footer {
    text-align: center;
    padding: 0;
}

strong {
    color: var(--two);
}
</style>
