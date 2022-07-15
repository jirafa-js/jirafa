#!/usr/bin/env node

import { resolve } from 'path'
import { Command } from 'commander'
import { readJsonSync } from 'fs-extra'

import { changelog } from './commands/changelog'

import { DIR_ROOT } from './shared/paths'

const version = readJsonSync(resolve(DIR_ROOT, 'package.json')).version

const program = new Command()

program.name('jirafa').version(`jirafa ${version}`).usage('<command> [options]')

program
  .command('changelog')
  .option('-rc, --releaseCount <number>', 'release count')
  .option('-f, --file <file>', 'changelog filename')
  .description('generate changelog')
  .action(changelog)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
program.on('command:*', ([cmd]) => {
  program.outputHelp()
  // logger.error(`\nUnknown command '${cmd}'.\n`)
  process.exitCode = 1
})

program.parse()
