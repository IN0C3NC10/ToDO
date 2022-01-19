<template>
  <div>
    <Header/>
    <h1>Welcome Friend!</h1>
  </div>
  
</template>
<script>
import "bootstrap/dist/css/bootstrap.css";
import Header from '../components/Header.vue';
export default {
  components:{
    Header,
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}
</style>
