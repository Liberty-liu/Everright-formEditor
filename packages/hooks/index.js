import _ from 'lodash-es'
const importModules = import.meta.glob('./*/index.js', { eager: true })
const modules = {}
_.forIn(importModules, (func, path) => {
  const key = _.head(Object.keys(func))
  modules[key] = func[key]
})
export default {
  ...modules
}
