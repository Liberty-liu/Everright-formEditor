import _ from 'lodash-es'
const importModules = import.meta.glob('./*/index.js', { eager: true })
const modules = {}
_.forIn(importModules, (func, path) => {
  // console.log(func)
  // const key = _.head(Object.keys(func))
  Object.keys(func).forEach(key => {
    if (/^use[A-Z]\w/.test(key)) {
      modules[key] = func[key]
    }
  })
})
export default {
  ...modules
}
