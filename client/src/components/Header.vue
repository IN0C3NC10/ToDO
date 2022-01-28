<template>
<div>
    <div class="navbar row">
        <img class="col-6 logo" src="../assets/logo-bigger.png" />
        <div class="col-6 menu">
            <router-link :to="{name:'home'}">Início</router-link>
            <span class="divider" />
            <router-link :to="{name:'task.create'}">Nova Tarefa</router-link>
            <span class="divider" />
            <template v-if="isConnected">
                <button v-on:click.stop="destroyMac" class="menu-items" type="button">SAIR</button>
            </template>
            <template v-else>
                <router-link :to="{name:'qrcode'}">Sincronizar Celular</router-link>
            </template>
            <span class="divider" />
            <router-link :to="{name:'notify'}" id="bell">
                <img src="../assets/bell.png" />
                <span v-if="lateCount > 0">{{ lateCount }}</span>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import isConnected from '../utils/isConnected.js';

export default {
    name: "Header",
    props: ['lateCount'],

    //============ Métodos ============//
    methods: {
        //..função responsável por desconectar o usuário
        async destroyMac() {
            localStorage.removeItem('@todo/macaddress');
            window.location.reload();
        },
    },

    //============ Setup ============//
    setup() {
        return {
            isConnected
        };
    },
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

button {
    background: none;
    border: none;
}

a:hover,
button:hover {
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
    color: var(--light);
    font-weight: bold;
}

#bell {
    background: none;
    border: none;
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
    font-weight: bold;
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
