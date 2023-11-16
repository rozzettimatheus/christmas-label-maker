import { Optional } from '@/@types/optional'

export class StringUtils {
  static toCapitalCase(value?: string) {
    if (!value) return null
    return value.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())
  }

  static clean(value?: Optional<string>) {
    if (!value) return null
    return value
      .trim()
      .replace(/([\n\t])/g, '')
      .split(' ')
      .filter(Boolean)
      .join(' ')
  }
}
