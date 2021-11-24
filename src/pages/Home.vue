<template>
  <div id="home">

    <div class="newpost">
      <h2>Bem vindo de volta!</h2>
      <span>Compartilhe seu dia</span>
      <textarea
        placeholder="O que está fazendo hoje?"
        rows="15"
      ></textarea>
      <button>Compartilhar</button>
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

export default {
  name: 'Home',
  components: {
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
