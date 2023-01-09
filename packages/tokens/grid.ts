import type { BreakPoint } from '@jirafa/utils'
import type { InjectionKey } from 'vue'

export const GridContextInjectKey: InjectionKey<GridContext> = Symbol(
  'RowContextInjectKey'
)

export interface GridContext {
  cols: number
  // [rowGap, colGap]
  gaps: [number, number]
  breakpoint: BreakPoint | undefined
}
