import type { OutputOptions, RollupBuild } from 'rollup'
import { PKG_JA, getPackageDependencies } from '../../shared'

export const generateExternal = (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(PKG_JA)

  return (id: string) => {
    const packages: string[] = peerDependencies
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }

    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}
