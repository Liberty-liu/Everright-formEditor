import { nanoid as nanoidAlias } from 'nanoid'
const nanoid = () => import.meta.env.MODE === 'test' ? '{{test-id-nanoid}}' : nanoidAlias()
export {
  nanoid
}
