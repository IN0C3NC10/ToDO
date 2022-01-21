<template>
<div>
    <div class="card" :style="active ? 'background-color: var(--two);':null">
        <div class="card-header">
            <img src="../assets/filter.png" alt="Filtro" />
        </div>
        <div class="card-body">
            <p class="card-text">
                {{ title }}
            </p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "FilterCard",
    props: ['title', 'active'],
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

.card {
    height: 100px;
    background-color: var(--one);
    border-radius: 5px;
}

.card:hover {
    background-color: var(--two);
    cursor: pointer;
}

img {
    width: 25px;
    height: 25px;
}

.card-header {
    text-align: left;
}

.card-body {
    color: var(--light);
    text-align: right;
    font-weight: bold;
}
</style>
