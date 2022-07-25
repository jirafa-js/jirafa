import lang from '../i18n/lang.json'

export const languages = lang

export const getLang = (id: string) => languages[id]
