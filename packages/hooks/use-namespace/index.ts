import { PREFIX } from '@jirafa/utils'
import type { CSSProperties } from '@vue/runtime-dom'
import { useGlobalConfig } from '../use-global-config'

export const COMMON_SEPARATOR = '-'
export const ELEMENT_SEPARATOR = '__'
export const MODIFIER_SEPARATOR = '--'
export const IS_PREFIX = 'is-'

interface BEMParams {
  namespace: string
  block: string
  blockSuffix?: string
  element?: string
  modifier?: string
}

const _bem = ({
  namespace,
  block,
  blockSuffix,
  element,
  modifier,
}: BEMParams) => {
  let className = namespace + COMMON_SEPARATOR + block

  if (blockSuffix) {
    className += COMMON_SEPARATOR + blockSuffix
  }

  if (element) {
    className += ELEMENT_SEPARATOR + element
  }

  if (modifier) {
    className += MODIFIER_SEPARATOR + modifier
  }

  return className
}

const _cssVar = (keyGen: (key: string) => `--${string}`) => {
  return (object: Record<string, string>) => {
    const styles: CSSProperties = {}
    for (const key in object) {
      styles[keyGen(key)] = object[key]
    }
    return styles
  }
}

export const useNamespace = (block: string) => {
  const namespace = useGlobalConfig('namespace', PREFIX)
  const b = (blockSuffix?: string) =>
    _bem({ namespace: namespace.value, block, blockSuffix })
  const e = (element?: string) =>
    element ? _bem({ namespace: namespace.value, block, element }) : ''
  const m = (modifier?: string) =>
    modifier ? _bem({ namespace: namespace.value, block, modifier }) : ''

  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem({ namespace: namespace.value, block, blockSuffix, element })
      : ''

  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem({ namespace: namespace.value, block, blockSuffix, modifier })
      : ''

  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? _bem({ namespace: namespace.value, block, element, modifier })
      : ''

  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem({
          namespace: namespace.value,
          block,
          blockSuffix,
          element,
          modifier,
        })
      : ''

  const is: {
    (name: string, ...args: [boolean | undefined] | []): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length > 0 ? args[0] : true
    return name && state ? IS_PREFIX + name : ''
  }

  const cssVarName = (name: string): `--${string}` =>
    `--${namespace.value}-${name}`

  const cssVarBlockName = (name: string) =>
    cssVarName(block + COMMON_SEPARATOR + name)

  return {
    namespace,
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
    cssVarName,
    cssVarBlockName,
    cssVar: _cssVar(cssVarName),
    cssVarBlock: _cssVar(cssVarBlockName),
  }
}
