import type { BuiltInParserName } from 'prettier'
import { format } from 'prettier'

export const formatCode = (
  code: string,
  parser: BuiltInParserName = 'typescript'
) => {
  return format(code, { parser, semi: false, singleQuote: true })
}
