<template>
  <div id="login">

    <div class="loginArea" v-if="login">
      <h1>Entrar</h1>
      <form>
        <input type="text" placeholder="email@email.com" v-model="email"/>
        <input type="password" placeholder="Sua senha..." v-model="password"/>
        <button type="submit">Acessar</button>
      </form>
      <a @click="toggleBtn">Criar uma conta</a>
    </div>

    <div class="loginArea" v-else>
      <h1>Cadastrar</h1>
      <form>
        <input type="text" placeholder="Nome" v-model="nome"/>
        <input type="text" placeholder="email@email.com" v-model="email"/>
        <input type="password" placeholder="Sua senha..." v-model="password"/>
        <button type="submit">Cadastrar</button>
      </form>
      <a @click="toggleBtn">Já possuo uma conta</a>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Login',
  data(){
    return{
      nome: '',
      email: '',
      password: '',
      login: true,
    }
  },
  methods:{
    toggleBtn(){
      this.login = !this.login;
      this.nome = '';
      this.email = '';
      this.password = '';
    }
  }
}
</script>

<style scoped>
  h1{
    text-align: center;
    color: #FFF;
  }

  .loginArea{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 65px;
    max-width: 600px;
    background: #4c5059;
    border-radius: 5px;
  }

  form{
    display: flex;
    flex-direction: column;
    margin: 0 25px;
  }

  input{
    margin-bottom: 10px;
    height: 30px;
    width: 300px;
    font-size: 18px;
    padding: 10px;
    outline: none;
    border: none;
    background: #f1f1f1;
  }

  button{
    height: 35px;
    border: none;
    background-color: #7289DA;
    color: #FFF;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    transition: .4s all;
  }

  button:hover{
    background-color: #5f71b4;
  }

  .loginArea a{
    margin-top: 20px;
    text-decoration: none;
    color: #FFF;
    cursor: pointer;
    transition: .4s all;
  }

  .loginArea a:hover{
    color: #7289DA;
  }

</style>
