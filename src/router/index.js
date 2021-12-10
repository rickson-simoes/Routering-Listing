import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import EventDetails from "../views/event/Details.vue";
import EventRegister from "../views/event/Register.vue";
import EventEdit from "../views/event/Edit.vue";
import EventLayout from "../views/event/Layout.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => {
      return { page: parseInt(route.query.page) || 1 };
    },
  },
  {
    path: "/event/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
