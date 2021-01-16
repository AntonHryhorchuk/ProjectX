import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/AboutUs.vue";
import Delivery from "../components/Delivery.vue";
import CardContainer from "../components/Catalogue.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "Home",
    component: Home
  },
  {
    path: "/catalogue",
    name: "Catalogue",
    component: CardContainer
  },
  {
    path: "/delivery",
    name: "Delivery",
    component: Delivery
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
