import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Money from "@/views/Money.vue";
import Statistics from "@/views/Statistics.vue";
import Account from "@/views/Account.vue";
import NotFound from "@/views/NotFound.vue";
import EditLabel from "@/views/EditLabel.vue";
import Labels from "@/views/Labels.vue";

Vue.use(VueRouter);

const routes = [
  {
    //重定向默认路径
    path: "/",
    redirect: "/account",
  },
  {
    path: "/money",
    component: Money,
  },
  {
    path: "/account",
    component: Account,
  },
  {
    path: "/statistics",
    component: Statistics,
  },
  {
    path: "/labels",
    component: Labels,
  },
  {
    path: "/labels/edit/:id",
    component: EditLabel,
  },
  //其他路径为404页面
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
