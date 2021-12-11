<template>
  <p>Edit the event here</p>
</template>

<script>
export default {
  props: ["event"],
  data() {
    return {
      unsavedChanges: true,
    };
  },
  beforeRouteLeave() {
    if (this.unsavedChanges) {
      return confirm(
        "You have unsaved changes. Are you sure you want to leave?",
      );
    }
  },
};
</script>
