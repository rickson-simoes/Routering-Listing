import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";

import EventList from "../views/EventList.vue";
import About from "../views/About.vue";

import EventLayout from "../views/event/Layout.vue";
import EventDetails from "../views/event/Details.vue";
import EventRegister from "../views/event/Register.vue";
import EventEdit from "../views/event/Edit.vue";

import NotFound from "../views/NotFound.vue";
import NetworkError from "../views/NetworkError.vue";

import EventService from "@/services/EventService.js";
import GStore from "@/store";

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
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((response) => {
          GStore.eventData = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: "404Resource",
              params: {
                resource: "event",
              },
            };
          } else {
            return {
              name: "NetworkError",
            };
          }
        });
    },
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
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
