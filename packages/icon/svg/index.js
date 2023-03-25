import _ from 'lodash-es'
const importModules = import.meta.glob('./*.svg', { eager: true })
const modules = {}
_.forIn(importModules, (func, path) => {
  const re = /[a-zA-Z0-9_-]*(?=\.svg)/g
  modules[path.match(re)[0]] = func
})
export default modules
