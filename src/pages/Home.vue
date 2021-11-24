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

    <div class="postarea loading" v-if="loading">
      <h1>Buscando posts...</h1>
    </div>

    <div class="postarea" v-else>
      <article class="post" v-for="post in posts" :key="post.id">
        <!-- <h1>{{post.autor}}</h1> -->
        <router-link tag="h1" :to="`/perfil/${post.userId}`">
          {{post.autor}}
        </router-link>
        <p>
          {{post.content | postLength}}
        </p>

        <div class="action-post">
          <button @click="likePost(post.id, post.likes)">
            {{post.likes === 0 ? 'Curtir' : post.likes + ' Curtidas'}}
          </button>
          <button @click="togglePostModal(post)">Veja post completo</button>
        </div>
      </article>
    </div>

    <Modal 
      v-if="showPostModal"
      :post="fullPost"
      @close="togglePostModal()"
    />
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';
import Modal from '../components/Modal';

export default {
  name: 'Home',
  components:{
    Modal,
  },
  data(){
    return{
      input: '',
      user: {},
      loading: true,
      posts: [],
      showPostModal: false,
      fullPost: {},
    }
  },
  async created(){
    const user = localStorage.getItem('devpost');
    this.user = JSON.parse(user);
    
    await firebase.firestore().collection('posts')
      .orderBy('created', 'desc')
      .onSnapshot((doc)=>{
        this.posts = [];

        doc.forEach((item)=>{
          this.posts.push({
            id: item.id,
            autor: item.data().autor,
            content: item.data().content,
            likes: item.data().likes,
            created: item.data().created,
            userId: item.data().userId
          });
        })

        this.loading = false;
      })
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
    },

    async likePost(id, likes){
      const userId = this.user.uid;
      const docId = `${userId}_${id}`;
      //checando se o post já foi curtido
      const doc = await firebase.firestore().collection('likes')
      .doc(docId).get()
      //Se já foi curtido:
      if(doc.exists){
        await firebase.firestore().collection('posts')
        .doc(id).update({
          likes: likes - 1
        })

        await firebase.firestore().collection('likes')
        .doc(docId).delete();
        return;
      }
      //Se ainda não foi curtido
      await firebase.firestore().collection('likes')
      .doc(docId).set({
        postId: id,
        userId: userId,
      });

      await firebase.firestore().collection('posts')
      .doc(id).update({
        likes: likes + 1
      })
    },

    togglePostModal(post){
      this.showPostModal = !this.showPostModal;

      if(this.showPostModal){
        this.fullPost = post;
      }else{
        this.fullPost = {};
      }
    },
  },
  filters:{
    postLength(valor){
      if(valor.length < 200){
        return valor;
      }
      return `${valor.substring(0, 200)}...`
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
