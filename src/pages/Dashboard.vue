<template>
  <div id="dashboard">
    <h2>Minha conta</h2>
    <span>Atualize seu perfil</span>

    <form @submit.prevent="updateProfile">
      <label>Nome:</label>
      <input type="text" v-model="nome" :placeholder="user.nome" id="name"/>
      <button class="button" type="submit">Atualizar Perfil</button>
    </form>

    <button class="button logout" @click="logout">Sair</button>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';

export default {
  name: 'Dashboard',
  data(){
    return{
      nome: '',
      user: {},
    }
  },
  created(){
    const user = localStorage.getItem('devpost');
    this.user = JSON.parse(user);
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
    },
    async updateProfile(){
      if(this.nome === ''){
        return;
      }

      //Atualizando nome do usuario
      await firebase.firestore().collection('users')
      .doc(this.user.uid).update({
        nome: this.nome
      })

      //Buscando todos os posts do usuario
      const postDocs = await firebase.firestore().collection('posts')
      .where('userId', '==', this.user.uid).get();

      //Atualizando o nome em todos os posts do usuario
      postDocs.forEach(async(doc) =>{
        await firebase.firestore().collection('posts').doc(doc.id).update({
          autor: this.nome
        })
      })

      //Atualizando localStorage
      localStorage.setItem('devpost', JSON.stringify({
        uid: this.user.uid, 
        nome: this.nome,
      }));

      alert('Perfil atualizado com sucesso!');

    },

  }
}
</script>

<style scoped>
#dashboard{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  padding: 15px 20px;
  widows: 600px;
  max-width: 600px;
  background: #4c5059;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

h2{
  color: #FFF;
}

span{
  color: #FFF;
  margin-bottom: 25px;
}

form{
  width: 500px;
  display: flex;
  flex-direction: column;
}

form label{
  font-size: 18px;
  color: #FFF;
  padding-bottom: 5px;
}

form input{
  height: 30px;
  padding: 5px;
  font-size: 17px;
  border: none;
  outline: none;
  margin-bottom: 5px;
  background: #FAFAFA;
}

button{
  cursor: pointer;
  margin-top: 10px;
  height: 35px;
  border: none;
  background: #7289DA;
  color: #FFF;
  font-size: 17px;
  transition: .4s all;
}

button.logout{
  width: 500px;
  background: #E36D6D;
}

button:hover{
  filter: brightness(1.1);
}
</style>
