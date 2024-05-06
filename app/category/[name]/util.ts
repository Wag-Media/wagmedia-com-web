import { code, countries, name } from "country-emoji"

export function isCategoryNameLanguage(name: string): boolean {
  return (
    Object.values(countries)
      .map((countryArray) => countryArray[countryArray.length - 1])
      .find((countryName) => countryName.toLowerCase() === name) !== undefined
  )
}

export function NonAngloCategoryTitle(n: string): string {
  if (!isCategoryNameLanguage(n)) {
    return n
  }

  const countryCode = code(n)
  return countryCode ? `${capitalizeFirstLetter(n)} Polkadot Articles` : n
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
