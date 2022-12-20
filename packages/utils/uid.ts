import { PREFIX } from './constants'

let now = Date.now()
export const uid = (prefix = PREFIX) => {
  return [prefix, 'uid', (now++).toString(32)].filter(Boolean).join('-')
}
