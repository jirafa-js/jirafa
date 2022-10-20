import type { Plugin } from 'vue'

import { JButton, JButtonGroup } from '@jirafa/components/button'
import { JIcon } from '@jirafa/components/icon'
import { JTag } from '@jirafa/components/tag'
import { JSpace } from '@jirafa/components/space'
import { JCol, JGrid, JGridItem, JRow } from '@jirafa/components/grid'
import { JDivider } from '@jirafa/components/divider'

export default [
  JButton,
  JButtonGroup,
  JIcon,
  JTag,
  JSpace,
  JRow,
  JCol,
  JGrid,
  JGridItem,
  JDivider,
] as Plugin[]
