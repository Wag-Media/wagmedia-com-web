export function stringToColor(str?: string): string {
  if (!str) {
    return "#000000"
  }

  // Hash function
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Convert hash to hex color with modifications for more vibrant colors
  let color = "#"
  const baseIntensity = 128 // Ensuring base brightness to avoid too dark colors
  const colorIntensity = 127 // The range of variation each color component can have

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    // Adjust each color component to be at least baseIntensity + some value
    const adjustedValue = (value % colorIntensity) + baseIntensity
    color += ("00" + adjustedValue.toString(16)).substr(-2)
  }

  return color
}

export function categoryToColor(str?: string) {
  if (!str) {
    return "#000000"
  }

  const catColors = {
    NFT: "text-purple-400",
    Tutorials: "text-orange-400",
    DeFi: "text-indigo-400",
    OpenGov: "text-fuchsia-400",
    Parachain: "text-cyan-400",
    Wallet: "text-blue-400",
    RWA: "text-purple-400",
    Rollup: "text-orange-400",
    Jam: "text-yellow-400",
    Grant: "text-pink-400",
    DV: "text-gray-400",
    DAO: "text-gray-400",
    Coretime: "text-gray-400",
  }

  if (catColors.hasOwnProperty(str)) {
    return catColors[str as keyof typeof catColors] ?? "#e2c488"
  }

  return "#e2c488"
}
