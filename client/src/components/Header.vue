<template>
<div>
    <div class="navbar row">
        <img class="col-6 logo" src="../assets/logo-bigger.png" />
        <div class="col-6 menu">
            <a class="menu-items" href="#">Inicio</a>
            <span class="divider" />
            <a class="menu-items" href="#">Nova Tarefa</a>
            <span class="divider" />
            <a class="menu-items" href="#">Sincronizar Celular</a>
            <span class="divider" />
            <a class="menu-items" href="#" id="bell">
                <img src="../assets/bell.png" />
                <span>5</span>
            </a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Header",
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

a {
    text-decoration: none;
    color: white;
}

a:hover {
    cursor: pointer;
    color: var(--two);
}

.navbar {
    margin: 0;
    width: 100%;
    background-color: var(--one);
    border-bottom: 7px solid var(--two);
}

.logo {
    height: 60px;
    width: 160px;
}

.menu {
    font-weight: bold;
    text-align: right;
    text-transform: uppercase;
}

.menu-items {
    margin: 0 10px;
}

#bell img {
    height: 30px;
    width: 25px;
}

#bell span {
    background-color: var(--light);
    color: var(--two);
    padding: 3px 7px;
    border-radius: 50%;
    position: relative;
    top: -5px;
    right: 15px;
}

#bell img:hover {
    opacity: 0.7;
}

.divider::after {
    content: "|";
    margin: 0 10px;
    color: var(--light);
}
</style>
