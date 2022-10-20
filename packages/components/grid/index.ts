import { withInstall, withNoopInstall } from '@jirafa/utils'
import Row from './src/row.vue'
import Col from './src/col.vue'
import Grid from './src/grid.vue'
import GridItem from './src/grid-item.vue'

export * from './src/row'
export * from './src/col'
export * from './src/grid'
export * from './src/grid-item'

export const JRow = withInstall(Row)

export const JCol = withInstall(Col)

export const JGrid = withInstall(Grid, { GridItem })

export const JGridItem = withNoopInstall(GridItem)
