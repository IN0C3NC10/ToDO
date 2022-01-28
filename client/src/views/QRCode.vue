<template>
<div>
    <div class="body">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <h1 class="title">Capture o QRCode</h1>
                    <Qrcode class="qrcode" value="macaddress" size="350" />
                    <h5 class="subtitle">suas atividades serão sincronizadas com o seu celular</h5>
                </div>
            </div>
        </div>
        <div class="container">
            <form class="form" @submit.prevent="saveMac">
                <div class="row">
                    <div class="form-group col-12">
                        <Cleave v-model="this.macaddress" type="text" class="form-control" id="macaddress" placeholder="Digite os números que apareceram" :options="{  blocks: [2, 2, 2, 2, 2, 2], delimiter: ':' }" />
                        <small v-if="macaddressValidation!=''" class="form-text validation">{{ macaddressValidation }}</small>
                    </div>
                </div>
                <div class="row">
                    <button type="submit" class="btn bck-two">SINCRONIZAR</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
//============ Bootstrap ============//
import "bootstrap/dist/css/bootstrap.css";
//============ Features ============//
import Qrcode from 'qrcode.vue';
import Cleave from 'vue-cleave-component';

export default {
    name: "QRCode",

    //============ Componentes ============//
    components: {
        Qrcode,
        Cleave
    },

    //============ Métodos ============//
    methods: {
        // ..verificar itens em branco do form
        async saveMac() {
            this.macaddressValidation = '';
            if (!this.macaddress) {
                return this.macaddressValidation = 'Informe os números que apareceram no seu celular!';
            } else {
                //.. registra o macaddress localmente e recarrega a página p/ 'liberar' o usuário
                await localStorage.setItem('@todo/macaddress',this.macaddress);
                window.location.reload();
            }
        },
    },

    //============ Variáveis ============//
    data() {
        return {
            macaddress: '',
            macaddressValidation: '',
        }
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

.body {
    margin-top: 20px;
    margin-bottom: 20px;
}

.container {
    margin-bottom: 20px;
}

button,
a {
    cursor: pointer;
}

button:hover {
    opacity: 0.7;
}

.title {
    color: var(--two);
    text-transform: uppercase;
    font-weight: bold;
}

.qrcode {
    margin: 20px;
}

.subtitle {
    color: var(--one);
    font-weight: bold;
}

.form {
    margin-left: 35%;
    margin-right: 35%;
}

.form input {
    text-align: center;
}

.btn:hover {
    opacity: 1;
    background-color: var(--one);
}
</style>
