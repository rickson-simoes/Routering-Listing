<template>
  <div class="events">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <nav style="display: flex; justify-content: space-between; width: 250px">
      <router-link
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="Previous"
        v-if="page !== 1"
      >
        « Previous
      </router-link>
      <div v-else>« Previous</div>

      <span v-for="num in totalPages" :key="num">
        <router-link
          :to="{ name: 'EventList', query: { page: num } }"
          rel="Previous"
          v-if="page !== num"
        >
          {{ num }}
        </router-link>

        <div v-else>{{ num }}</div>
      </span>

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
// import { watchEffect } from "vue";

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
    totalPages() {
      return Math.ceil(this.totalEvents / this.perPage);
    },
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.events = response.data;
          comp.totalEvents = response.headers["x-total-count"];
        });
      })
      .catch(() => {
        next({
          name: "NetworkError",
        });
      });
  },
  beforeRouteUpdate(routeTo) {
    return EventService.getEvents(
      this.perPage,
      parseInt(routeTo.query.page) || 1,
    )
      .then((response) => {
        this.events = response.data;
        this.totalEvents = response.headers["x-total-count"];
      })
      .catch(() => {
        return {
          name: "NetworkError",
        };
      });
  },
  // mounted() {
  //   // quando objetos reativos são usados dentro do watchEffect, essa função é executada novamente
  //   watchEffect(() => {
  //     this.events = null;
  //     EventService.getEvents(this.perPage, this.page)
  //       .then((response) => {
  //         this.events = response.data;
  //         this.totalEvents = response.headers["x-total-count"];
  //       })
  //       .catch(() => {
  //         this.$router.push({
  //           name: "NetworkError",
  //         });
  //       });
  //   });
  // },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
