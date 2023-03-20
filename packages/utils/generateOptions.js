import { nanoid } from './nanoid'
export const generateOptions = (len) => {
  const result = []
  while (len--) {
    result.push({
      label: 'Option',
      value: nanoid()
    })
  }
  return result
}
