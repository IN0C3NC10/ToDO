<template>
<div>
    <div class="footer row">
        <h5>ToDO - Organizando sua vida</h5>
    </div>
</div>
</template>

<script>
export default {
    name: "Footer",
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

.footer {
    margin: 0;
    margin-top: 50px;
    width: 100%;
    padding: 20px;
    background-color: var(--one);
    border-top: 7px solid var(--two);
    position: relative;
    bottom: 0;
    align-items: center;
}

h5 {
    color:var(--light);
    text-align: center;
    font-weight: bold;
    font-size: 15px;
}

</style>
