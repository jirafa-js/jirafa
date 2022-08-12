import { PREFIX as namespace } from '@jirafa/utils'

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

const _cssVar = (keyGen: (key: string) => string) => {
  return (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      styles[keyGen(key)] = object[key]
    }
    return styles
  }
}

export const useNamespace = (block: string) => {
  const b = (blockSuffix?: string) => _bem({ namespace, block, blockSuffix })
  const e = (element?: string) =>
    element ? _bem({ namespace, block, element }) : ''
  const m = (modifier?: string) =>
    modifier ? _bem({ namespace, block, modifier }) : ''

  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem({ namespace, block, blockSuffix, element })
      : ''

  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem({ namespace, block, blockSuffix, modifier })
      : ''

  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem({ namespace, block, element, modifier }) : ''

  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem({ namespace, block, blockSuffix, element, modifier })
      : ''

  const is = (name: string, state = true) =>
    name && state ? IS_PREFIX + name : ''

  const cssVarName = (name: string) => `--${namespace}${name}`

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
