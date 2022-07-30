import { resolve } from 'path'
import { writeFile } from 'fs-extra'
import { DIR_JA, getWorkspacePackages } from '../../shared'
import { createLogger } from '../utils/logger'

const logger = createLogger()

export const bump = async () => {
  logger.start('bump', 'Updating version')
  const pkgs = await getWorkspacePackages()
  const pkgsMap = Object.fromEntries(
    pkgs.map((pkg) => [pkg.manifest.name!, pkg])
  )
  const project = pkgsMap['@jirafa/monorepo']
  const jirafa = pkgsMap.jirafa

  const version = project.manifest.version
  await jirafa.writeProjectManifest({
    ...jirafa.manifest,
    version,
  })

  await writeFile(
    resolve(DIR_JA, 'index.ts'),
    `export const version = ${version}\n`,
    'utf-8'
  )
}
