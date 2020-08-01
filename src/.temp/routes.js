const c1 = () => import(/* webpackChunkName: "page--src--templates--markdown-page-vue" */ "/Users/hyun/Development/projects/nestybirds/src/templates/MarkdownPage.vue")
const c2 = () => import(/* webpackChunkName: "page--src--pages--404-vue" */ "/Users/hyun/Development/projects/nestybirds/src/pages/404.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/hyun/Development/projects/nestybirds/src/pages/Index.vue")

export default [
  {
    path: "/zero2sold/introduction/",
    component: c1
  },
  {
    path: "/zero2sold/feedbackpanda/",
    component: c1
  },
  {
    path: "/nestjs/overview/",
    component: c1
  },
  {
    path: "/docs/writing-content/",
    component: c1
  },
  {
    path: "/zero2sold/bootstrapping/",
    component: c1
  },
  {
    path: "/docs/settings/",
    component: c1
  },
  {
    path: "/docs/sidebar/",
    component: c1
  },
  {
    path: "/nestjs/first-step/",
    component: c1
  },
  {
    path: "/nestjs/fundmental/",
    component: c1
  },
  {
    path: "/nestjs/controllers/",
    component: c1
  },
  {
    path: "/docs/installation/",
    component: c1
  },
  {
    path: "/docs/deploying/",
    component: c1
  },
  {
    path: "/zero2sold/",
    component: c1
  },
  {
    path: "/nestjs/",
    component: c1
  },
  {
    path: "/docs/",
    component: c1
  },
  {
    name: "404",
    path: "/404/",
    component: c2
  },
  {
    name: "home",
    path: "/",
    component: c3
  },
  {
    name: "*",
    path: "*",
    component: c2
  }
]
