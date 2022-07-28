import { getWorkspacePackages } from '@jirafa/cli/shared'
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

  await jirafa.writeProjectManifest({
    ...jirafa.manifest,
    version: project.manifest.version,
  })
}
