import { dirname, relative, resolve } from 'path'
import fg from 'fast-glob'
import { ensureDir, readFile, writeFile } from 'fs-extra'
import * as vueCompiler from 'vue/compiler-sfc'
import type { CompilerOptions, SourceFile } from 'ts-morph'
import { Project } from 'ts-morph'

import { PREFIX, pascalCase } from '@jirafa/utils'

import chalk from 'chalk'
import { DIR_COMPS, DIR_OUTPOT, DIR_PKGS, DIR_ROOT } from '../../shared'
import { createLogger } from './logger'
import { formatCode } from './formatCode'

const logger = createLogger()

export const genTypesVolar = async () => {
  logger.info('dts', 'Generating Volar types')
  const comps = await fg('*', { cwd: DIR_COMPS, onlyDirectories: true })

  const genCode = (importPath = 'jirafa') => {
    return formatCode(`
    /**
     * Generated by jirafa type -t volar
     * Types for Volar
     */

    import '@vue/runtime-core'

    declare module '@vue/runtime-core' {
      export interface GlobalComponents {
        ${comps.map((comp) => {
          const compName = pascalCase(`${PREFIX}-${comp}`)
          return `${compName}: typeof import('${importPath}')['${compName}']`
        })}
      }
    }

    export {}
    `)
  }

  await Promise.all([
    writeFile(
      resolve(DIR_ROOT, 'typings/components.d.ts'),
      genCode('../packages/jirafa')
    ),
    writeFile(resolve(DIR_ROOT, 'global.d.ts'), genCode()),
  ])
}

const addSourceFiles = async (project: Project) => {
  const files = await fg('**/*.{js?(x),ts?(x),vue}', {
    cwd: DIR_PKGS,
    ignore: ['**/node_modules', '**/__tests__', '**/examples'],
    onlyFiles: true,
    absolute: true,
  })

  const sourceFiles: SourceFile[] = []

  await Promise.all(
    files.map(async (file) => {
      if (file.endsWith('vue')) {
        const content = await readFile(file, 'utf-8')
        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor

        if (!script || !scriptSetup) {
          let content = ''
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx',
            })
            content += compiled.content
          }

          const lang = scriptSetup?.lang || script?.lang || 'js'

          const sourceFile = project.createSourceFile(
            `${relative(process.cwd(), file)}.${lang}`,
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    })
  )

  return sourceFiles
}

const typeCheck = (project: Project) => {
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length > 0) {
    logger.error(
      'dts',
      project.formatDiagnosticsWithColorAndContext(diagnostics)
    )
    const err = new Error('Failed to generate dts.')
    console.error(err)
    throw err
  }
}

export const genTypesAll = async () => {
  const log = logger.start('dts', 'Generating definition')

  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true,
    outDir: resolve(DIR_OUTPOT, 'types'),
    baseUrl: DIR_ROOT,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false,
  }

  const project = new Project({
    compilerOptions,
    tsConfigFilePath: resolve(DIR_ROOT, 'tsconfig.web.json'),
    skipAddingFilesFromTsConfig: true,
  })

  const sourceFiles = await addSourceFiles(project)
  logger.success('dts', 'Added source files')

  typeCheck(project)
  logger.success('dts', 'Type check success')

  await project.emit({ emitOnlyDtsFiles: true })

  await Promise.all(
    sourceFiles.map(async (sourceFile) => {
      const relativePath = relative(DIR_PKGS, sourceFile.getFilePath())
      const emitOutput = sourceFile.getEmitOutput()
      const emitFiles = emitOutput.getOutputFiles()

      if (emitFiles.length === 0) {
        throw new Error(`Emit no file: '${relativePath}'`)
      }

      await Promise.all(
        emitFiles.map(async (outputFile) => {
          const filePath = outputFile.getFilePath()
          await ensureDir(dirname(filePath))
          await writeFile(filePath, outputFile.getText())

          logger.success(
            'dts',
            chalk.bold(`Definition of ${relativePath} generated`)
          )
        })
      )
    })
  )

  log('Definition generated')
}
