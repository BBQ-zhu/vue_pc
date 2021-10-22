import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import("@/views/Index");
const ProductDetail = () => import("@/views/ProductDetail");
const ProOneClass = () => import("@/views/ProOneClass");

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/ProductDetail',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/ProOneClass',
    name: 'ProOneClass',
    component: ProOneClass
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior () {
    return {x:0,y:0}
  }
})

export default router
