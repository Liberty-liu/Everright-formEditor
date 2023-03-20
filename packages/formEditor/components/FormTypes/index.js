import _ from 'lodash'
const importModules = import.meta.glob('./*/*.vue', { eager: true })
const modules = {}
_.forIn(importModules, (func, path) => {
  modules[_.split(path, '/')[1]] = func.default
})
const year = 1958
export {
  year
}
