<template>
  <div>
    <Header/>
    <Footer/>
  </div>
  
</template>
<script>
import "bootstrap/dist/css/bootstrap.css";
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
export default {
  components:{
    Header,
    Footer
  }
}
</script>
<style>
:root{
    --light:#fff;
    --dark:#333;
    --one:#1B2C86;
    --two:#F4970B;
    --three:#707070;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}
</style>
