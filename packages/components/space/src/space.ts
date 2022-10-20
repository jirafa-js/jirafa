import type { SpaceSizes } from '@jirafa/utils'
import {
  PatchFlags,
  buildProps,
  definePropType,
  formatSpace,
  isArray,
  isFragment,
  isNumber,
  isString,
  isValidElementNode,
  spaceSizes,
} from '@jirafa/utils'
import type { Properties } from 'csstype'
import type {
  CSSProperties,
  ExtractPropTypes,
  StyleValue,
  VNode,
  VNodeArrayChildren,
  VNodeChild,
} from 'vue'
import {
  computed,
  createVNode,
  defineComponent,
  isVNode,
  renderSlot,
} from 'vue'
import { useNamespace } from '@jirafa/hooks'

export const spaceProps = buildProps({
  align: {
    type: definePropType<Properties['alignItems']>(String),
  },
  /**
   * The space direction
   */
  direction: {
    type: String,
    values: ['vertical', 'horizontal'],
    default: 'horizontal',
  },
  gutter: {
    type: definePropType<SpaceSizes | [SpaceSizes, SpaceSizes]>([
      String,
      Number,
      Array,
    ]),
    default: '',
    values: spaceSizes,
    validator: (val: unknown): val is [SpaceSizes, SpaceSizes] | SpaceSizes => {
      return (
        isNumber(val) ||
        (isArray(val) &&
          val.length === 2 &&
          val.every((v) => isNumber(v) || spaceSizes.includes(v)))
      )
    },
  },
  wrap: Boolean,
  fill: Boolean,
  spacer: {
    type: definePropType<VNodeChild>([Object, String, Number, Array]),
    default: null,
    validator: (val: unknown) => isVNode(val) || isString(val) || isNumber(val),
  },
} as const)
export type SpaceProps = ExtractPropTypes<typeof spaceProps>

export default defineComponent({
  name: 'JSpace',
  props: spaceProps,
  setup(props, { slots }) {
    // const { classes, containerStyle, itemStyle } = useSpace(props)

    function extractChildren(
      children: VNodeArrayChildren,
      parentKey = '',
      extractedChildren: VNode[] = []
    ) {
      children.forEach((child) => {
        if (isFragment(child)) {
          if (isArray(child.children)) {
            child.children.forEach((nested, key) => {
              if (isFragment(nested) && isArray(nested.children)) {
                extractChildren(
                  nested.children,
                  parentKey + key,
                  extractedChildren
                )
              } else {
                extractedChildren.push(nested as VNode)
              }
            })
          }
        } else if (isValidElementNode(child)) {
          extractedChildren.push(child)
        }
      })

      return extractedChildren
    }

    const ns = useNamespace('space')

    const style = computed<StyleValue>(() => {
      const styles: CSSProperties = {
        flexDirection: 'row',
        alignItems: props.align ?? 'center',
      }
      if (props.wrap || props.fill) {
        styles.flexWrap = 'wrap'
      }

      if (props.direction === 'vertical') {
        styles.flexDirection = 'column'
        styles.alignItems = props.align ?? 'flex-start'
      }

      if (isArray(props.gutter)) {
        styles.rowGap = formatSpace(props.gutter[1])
        styles.columnGap = formatSpace(props.gutter[0])
      } else {
        styles.rowGap = styles.columnGap = formatSpace(props.gutter)
      }

      return styles
    })

    return () => {
      const { spacer } = props
      const children = renderSlot(slots, 'default', { key: 0 })

      if ((children.children ?? []).length === 0) return null

      if (isArray(children.children)) {
        let extractedChildren = extractChildren(children.children)
        if (spacer) {
          const Spacer = isVNode(spacer)
            ? spacer
            : createVNode('span', { class: ns.e('spacer') }, spacer)

          extractedChildren = extractedChildren.reduceRight<VNode[]>(
            (acc, child, index) => {
              if (index === 0) return [child, ...acc]
              return [Spacer, child, ...acc]
            },
            []
          )
        }
        return createVNode(
          'div',
          {
            class: [ns.b(), ns.m(props.direction), ns.is('fill', props.fill)],
            style: style.value,
          },
          extractedChildren,
          PatchFlags.STYLE | PatchFlags.CLASS
        )
      }

      return children.children
    }
  },
})
