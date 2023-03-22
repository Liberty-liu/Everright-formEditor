import _ from 'lodash-es'
// const importModules = import.meta.glob('./*.js', { import: 'setup' })
const importModules = import.meta.glob('./*.js', { import: 'default', eager: true })
const modules = {}
_.forIn(importModules, (func, path) => {
  const re = /[a-zA-Z0-9_-]*(?=\.js)/g
  modules[path.match(re)[0]] = func
})
export default modules
