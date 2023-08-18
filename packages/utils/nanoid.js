import { nanoid as nanoidAlias } from 'nanoid'
const nanoid = () => import.meta.env.MODE === 'test' && import.meta.env.TESTIDTYPE !== 'nanoid' ? '{{test-id-nanoid}}' : nanoidAlias()
export {
  nanoid
}
