import { warn } from 'vue'
import type { PropType } from '@vue/runtime-core'

import { hasOwn, isObject } from '../..'
import type {
  IfJirafaProp,
  IfNativePropType,
  JirafaProp,
  NativePropType,
  PropConvert,
  PropFinalized,
  PropInput,
  PropMergeType,
} from './typescript'

export const JIRAFA_PROP_KEY = '__jirafaPropKey'

export const definePropType = <T>(val: any): PropType<T> => val

export const isJirafaProp = (val: unknown): val is JirafaProp<any, any, any> =>
  isObject(val) && !!(val as any)[JIRAFA_PROP_KEY]

export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Default extends PropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false
>(
  prop: PropInput<Type, Value, Validator, Default, Required>,
  key?: string
): PropFinalized<Type, Value, Validator, Default, Required> => {
  // filter native prop type and nested prop, e.g `null`, `undefined` (from `buildProps`)
  if (!isObject(prop) || isJirafaProp(prop)) return prop as any

  const { values, required, default: defaultValue, type, validator } = prop

  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false
          let allowedValues: unknown[] = []

          if (values) {
            allowedValues = Array.from(values)
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue)
            }
            valid ||= allowedValues.includes(val)
          }
          if (validator) valid ||= validator(val)

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)]
              .map((value) => JSON.stringify(value))
              .join(', ')
            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
                val
              )}.`
            )
          }
          return valid
        }
      : undefined

  const jirafaProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [JIRAFA_PROP_KEY]: true,
  }
  if (hasOwn(prop, 'default')) jirafaProp.default = defaultValue
  return jirafaProp
}

export const buildProps = <
  Props extends Record<
    string,
    NativePropType | PropInput<any, any, any, any, any>
  >
>(
  props: Props
): {
  [K in keyof Props]: IfJirafaProp<
    Props[K],
    Props[K],
    IfNativePropType<Props[K], Props[K], PropConvert<Props[K]>>
  >
} =>
  Object.fromEntries(
    Object.entries(props).map<any[]>(([key, prop]) => {
      return [key, buildProp(prop as any, key)]
    })
  )
