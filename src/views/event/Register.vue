<template>
  <p>Register for the event here</p>

  <button @click="register()">Register</button>
</template>

<script>
export default {
  props: ["event"],
  inject: ["GStore"],
  methods: {
    register() {
      // this.$router.replace({ name: "EventDetails" });

      this.GStore.flashMessage = "You have registered for:" + this.event.title;

      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 4000);

      this.$router.push({
        name: "EventDetails",
      });
    },
  },
};
</script>
