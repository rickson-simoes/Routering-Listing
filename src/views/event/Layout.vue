<template>
  <div v-if="GStore.eventData">
    <h1>{{ GStore.eventData.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="GStore.eventData" />
  </div>
</template>

<script>
export default {
  inject: ["GStore"],
};
</script>
