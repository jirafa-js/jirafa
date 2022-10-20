import type { InjectionKey } from 'vue'

export const RowContextInjectKey: InjectionKey<RowContext> = Symbol(
  'RowContextInjectKey'
)

export interface RowContext {
  gutter?: number
}
