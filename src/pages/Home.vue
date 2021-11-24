<template>
  <div id="home">

    <div class="newpost">
      <h2>Bem vindo de volta!</h2>
      <span>Compartilhe seu dia</span>
      <textarea
        placeholder="O que está fazendo hoje?"
        rows="15"
        v-model="input"
      ></textarea>
      <button @click="createPost">Compartilhar</button>
    </div>

    <div class="postarea">
      <article class="post">
        <h1>Matheus</h1>
        <p>
          Olá, este é meu primeiro post
        </p>

        <div class="action-post">
          <button>20 curtidas</button>
          <button>Veja post completo</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';

export default {
  name: 'Home',
  data(){
    return{
      input: '',
      user: {},
    }
  },
  created(){
    const user = localStorage.getItem('devpost');
    this.user = JSON.parse(user);
  },
  methods:{
    async createPost(){
      if(this.input === ''){
        return;
      }

      await firebase.firestore().collection('posts')
      .add({
        created: new Date(),
        content: this.input,
        autor: this.user.nome,
        userId: this.user.uid,
        likes: 0,
      })
      .then(()=>{
        this.input = '';
        alert('Publicado com sucesso!');
      })
      .catch((error)=>{
        alert('Erro ao publicar o post: ', error);
      })
    }
  }
}
</script>

<style scoped>
#home{
  display: flex;
  flex-direction: row;
  margin: 25px;
}

@import './home.css';

</style>
