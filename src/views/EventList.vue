<template>
  <div class="events">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <!-- eslint-disable-next-line prettier/prettier -->
    <nav style="display: flex; justify-content: space-around; width: 200px">
      <router-link
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="Previous"
        v-if="page !== 1"
      >
        « Previous
      </router-link>
      <div v-else>« Previous</div>

      <router-link
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="Next"
        v-if="hasNextPage"
      >
        Next »
      </router-link>
      <div v-else>Next »</div>
    </nav>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";
import { watchEffect } from "vue";

export default {
  props: ["page"],
  name: "EventList",
  components: {
    EventCard,
  },
  data() {
    return {
      events: "",
      perPage: 2,
      totalEvents: 0,
    };
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / this.perPage);

      return this.page < totalPages;
    },
  },
  mounted() {
    // quando objetos reativos são usados dentro do watchEffect, essa função é executada novamente
    watchEffect(() => {
      this.events = null;
      EventService.getEvents(this.perPage, this.page)
        .then((response) => {
          this.events = response.data;
          this.totalEvents = response.headers["x-total-count"];
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
