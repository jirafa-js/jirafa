import type { Ref } from 'vue'

export type Arrayable<T> = T | T[]

export type MaybeRef<T> = T | Ref<T>
