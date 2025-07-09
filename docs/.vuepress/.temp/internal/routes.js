export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/DOCUMENTATION_SETUP.html", { loader: () => import(/* webpackChunkName: "DOCUMENTATION_SETUP.html" */"/Users/laywoo/no-budget/docs/.vuepress/.temp/pages/DOCUMENTATION_SETUP.html.js"), meta: {"title":"No Budget API Documentation Configuration"} }],
  ["/README.docs.html", { loader: () => import(/* webpackChunkName: "README.docs.html" */"/Users/laywoo/no-budget/docs/.vuepress/.temp/pages/README.docs.html.js"), meta: {"title":"Documentation"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/laywoo/no-budget/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/deployment/", { loader: () => import(/* webpackChunkName: "deployment_index.html" */"/Users/laywoo/no-budget/docs/.vuepress/.temp/pages/deployment/index.html.js"), meta: {"title":"Deployment Guide"} }],
  ["/api/", { loader: () => import(/* webpackChunkName: "api_index.html" */"/Users/laywoo/no-budget/docs/.vuepress/.temp/pages/api/index.html.js"), meta: {"title":"API Reference"} }],
  ["/api/bills.html", { loader: () => import(/* webpackChunkName: "api_bills.html" */"/Users/laywoo/no-budget/docs/.vuepress/.temp/pages/api/bills.html.js"), meta: {"title":"Bills API"} }],
  ["/examples/", { loader: () => import(/* webpackChunkName: "examples_index.html" */"/Users/laywoo/no-budget/docs/.vuepress/.temp/pages/examples/index.html.js"), meta: {"title":"Examples"} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "guide_index.html" */"/Users/laywoo/no-budget/docs/.vuepress/.temp/pages/guide/index.html.js"), meta: {"title":"Getting Started"} }],
  ["/guide/installation.html", { loader: () => import(/* webpackChunkName: "guide_installation.html" */"/Users/laywoo/no-budget/docs/.vuepress/.temp/pages/guide/installation.html.js"), meta: {"title":"Installation"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/laywoo/no-budget/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
