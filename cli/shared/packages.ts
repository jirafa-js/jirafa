import findWorkspacePackages from '@pnpm/find-workspace-packages'
import type { PackageManifest } from '@pnpm/types'
import { DIR_ROOT } from './paths'

export const getWorkspacePackages = () => findWorkspacePackages(DIR_ROOT)

export const getWorkspaceNames = async () => {
  const pkgs = await getWorkspacePackages()
  return pkgs
    .map((pkg) => pkg.manifest.name)
    .filter((name): name is string => !!name)
}

export const getPackageManifest = (pkg: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkg) as PackageManifest
}

export const getPackageDependencies = (pkg: string) => {
  const { dependencies = {}, peerDependencies = {} } = getPackageManifest(pkg)
  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'dist']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}
