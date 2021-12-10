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
    alias: "/about-us",
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
    path: "/events/:id",
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
  // {
  //   path: "/event/:id",
  //   redirect: () => ({ name: "EventDetails" }),
  //   children: [
  //     {
  //       path: "register",
  //       redirect: () => ({ name: "EventRegister" }),
  //     },
  //     {
  //       path: "edit",
  //       redirect: () => ({ name: "EventEdit" }),
  //     },
  //   ],
  // },
  {
    path: "/event/:afterEvent(.*)",
    redirect: (to) => {
      return { path: "/events/" + to.params.afterEvent };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
