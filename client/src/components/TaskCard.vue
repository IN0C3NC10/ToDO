<template>
<div class="col">
    <div class="card">
        <div class="card-body">
            <img :src="taskIcons[category]" alt="#" />
            <h5>{{ title }}</h5>
        </div>
        <div class="card-footer">
            <div class="row">
                <strong class="col">{{ date }}</strong>
                <span class="col">{{ hour }}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//============ Utils ============//
import taskIcons from "../utils/taskIcons.js";

export default {
    name: "TaskCard",
    props: ['title', 'date', 'hour', 'category'],

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
