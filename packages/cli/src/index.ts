#!/usr/bin/env node

import { resolve } from 'path'
import { Command, Option } from 'commander'
import { readJsonSync } from 'fs-extra'
import consola from 'consola'
import { DIR_ROOT } from '../shared'
import { changelog } from './commands/changelog'
import { create } from './commands/create'
import { build } from './commands/build'
import { bump } from './commands/bump'
import { genTypes } from './commands/gen-types'

const version = readJsonSync(resolve(DIR_ROOT, 'package.json')).version

const program = new Command()

program.name('jirafa').version(`jirafa ${version}`).usage('<command> [options]')

program
  .command('changelog')
  .option('-rc, --releaseCount <number>', 'release count')
  .option('-f, --file <file>', 'changelog filename')
  .description('generate changelog')
  .action(changelog)

program
  .command('create <file>')
  .option('-h, --hook', 'type hook')
  .description('create a component/composable')
  .action(create)

program
  .command('build')
  .addOption(
    new Option('-t, --type [type]', 'build module')
      .choices(['all', 'theme'])
      .default('all')
  )
  .description('release project')
  .action(build)

program.command('bump').description('bump project version').action(bump)

program
  .command('types')
  .addOption(
    new Option('-t, --type [type]', 'build module')
      .choices(['all', 'volar'])
      .default('all')
  )
  .description('generate project typescrit definitions')
  .action(genTypes)

program.on('command:*', ([cmd]) => {
  program.outputHelp()
  consola.error(`\nUnknown command '${cmd}'.\n`)
  process.exitCode = 1
})

program.parse()
