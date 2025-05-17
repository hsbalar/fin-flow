import { useTheme } from '@/components/theme-provider'

const baseColorsLight = ['173 58% 39%', '12 76% 61%', '197 37% 24%', '43 74% 66%', '27 87% 67%']
const baseColorsDark = ['220 70% 50%', '160 60% 45%', '30 80% 55%', '280 65% 60%', '340 75% 55%']
const baseParams = {
  light: {
    baseHue: 30,
    hueFactor: 137.508,
    saturationBase: 60,
    saturationVariance: 15,
    lightnessBase: 50,
    lightnessVariance: 15,
  },
  dark: {
    baseHue: 210,
    hueFactor: 137.508,
    saturationBase: 50,
    saturationVariance: 20,
    lightnessBase: 40,
    lightnessVariance: 10,
  },
}
const getColor = (seed: number, dataLength: number) => {
  const { theme } = useTheme()
  const colors = theme === 'light' ? baseColorsLight : baseColorsDark
  if (seed < 5 && seed < dataLength) {
    return colors[seed]
  }

  const params = baseParams[theme === 'dark' ? 'dark' : 'light']
  const hue = (seed * params.hueFactor + params.baseHue) % 360
  const saturation = params.saturationBase + Math.sin(seed) * params.saturationVariance
  const lightness = params.lightnessBase + Math.cos(seed) * params.lightnessVariance

  return `${Math.round(hue)} ${Math.round(saturation)}% ${Math.round(lightness)}%`
}

export default getColor
