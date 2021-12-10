<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>

  <div id="nav">
    <router-link :to="{ name: 'EventList' }">Events</router-link>
    |
    <router-link :to="{ name: 'About' }">About</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  inject: ["GStore"],
};
</script>

<style>
@keyframes yellowFade {
  from {
    background: yellow;
    color: black;
  }
  to {
    background: transparent;
    opacity: 0;
  }
}

#flashMessage {
  padding: 5px;
  border-radius: 10px;
  animation-name: yellowFade;
  animation-duration: 5s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h4 {
  font-size: 20px;
}
</style>
