import Vue from "vue"
import Router from "../plugins/router"

Vue.use(Router)

const HelloWorld = () => import("@/components/HelloWorld")
const About = () => import("@/components/about")

const routes = [
  {
    path: "/",
    name: "Index",
    component: HelloWorld
  },
  {
    path: "/about",
    component: About
  }
]

const router = new Router({
  // mode: 'history',
  routes
})

export default router