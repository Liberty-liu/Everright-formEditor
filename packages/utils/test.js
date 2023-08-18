const addTestId = (id, type = 'attr') => {
  let result = ''
  if (import.meta.env.MODE === 'test') {
    if (type === 'attr') {
      result = { 'data-test-id': `er-formEditor-${id}` }
    }
    if (type === 'id') {
      result = `er-filter-${id}`
    }
  }
  return result
}
const getTestId = (id, type = 'attr') => type === 'attr' ? `[data-test-id="er-formEditor-${id}"]` : `.er-filter-${id}`
const addAttrs = (obj) => {
  return import.meta.env.MODE === 'test' ? { 'data-test-attrs': JSON.stringify(obj) } : {}
}
const getAttrs = (el) => JSON.parse(el.getAttribute('data-test-attrs'))
export {
  addTestId,
  getTestId,
  addAttrs,
  getAttrs
}
