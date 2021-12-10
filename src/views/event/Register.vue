<template>
  <p>Register for the event here</p>

  <button @click="register()">Register</button>
</template>

<script>
export default {
  props: ["event"],
  methods: {
    register() {
      // this.$router.push({
      //   name: "EventDetails",
      // });

      this.$router.replace({ name: "EventDetails" });
    },
  },
};
</script>
