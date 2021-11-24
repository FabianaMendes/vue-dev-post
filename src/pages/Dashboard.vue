<template>
  <div id="dashboard">
    <h1>Dashboard</h1>
    <button @click="logout">Sair</button>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';

export default {
  name: 'Dashboard',
  data(){
    return{

    }
  },
  methods:{
    async logout(){
      const confirm = window.confirm('Você realmente deseja sair?');

      if(confirm){
        await firebase.auth().signOut()
        .then(async ()=>{
          await localStorage.removeItem('devpost');
          this.$router.push('/login');
        })
        .catch((error)=>{
          console.log(error);
        })
      }else{
        return;
      }
    }
  }
}
</script>

<style scoped>

</style>
