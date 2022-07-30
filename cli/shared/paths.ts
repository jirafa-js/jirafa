import { resolve } from 'path'

export const DIR_ROOT = resolve(__dirname, '..', '..')

/** `/packages` */
export const DIR_PKGS = resolve(DIR_ROOT, 'packages')

/** `/packages/docs` */
export const DIR_DOCS = resolve(DIR_ROOT, 'docs')

/** `/packages/components` */
export const DIR_COMPS = resolve(DIR_PKGS, 'components')

/** `/packages/hooks` */
export const DIR_HOOKS = resolve(DIR_PKGS, 'hooks')

/** `/packages/theme` */
export const DIR_THEME = resolve(DIR_PKGS, 'theme')

/** `/packages/jirafa` */
export const DIR_JA = resolve(DIR_PKGS, 'jirafa')

/** `/dist` */
export const DIR_OUTPOT = resolve(DIR_ROOT, 'dist')

/** `/dist/jirafa` */
export const DIR_OUTPOT_JA = resolve(DIR_OUTPOT, 'jirafa')

/** `/dist/jirafa/theme` */
export const DIR_OUTPOT_THEME = resolve(DIR_OUTPOT_JA, 'theme')

const resolvePkg = (pkg: string) => resolve(pkg, 'package.json')

/** `/packages/jirafa/package.json` */
export const PKG_JA = resolvePkg(DIR_JA)

/** `/packages/docs/package.json` */
export const PKG_DOCS = resolvePkg(DIR_DOCS)

/** `/packages/components/package.json` */
export const PKG_COMPS = resolvePkg(DIR_COMPS)

/** `/packages/hooks/package.json` */
export const PKG_HOOKS = resolvePkg(DIR_HOOKS)
