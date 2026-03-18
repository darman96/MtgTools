import { defineTokens } from "@chakra-ui/react"

const sansStack = '"Source Sans 3", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
const serifStack = 'Alegreya, Georgia, Cambria, "Times New Roman", Times, serif'
const displayStack = '"Cinzel Decorative", Cinzel, Alegreya, Georgia, Cambria, "Times New Roman", Times, serif'
const fantasyStack = 'MedievalSharp, Alegreya, Georgia, Cambria, "Times New Roman", Times, serif'

export const fonts = defineTokens.fonts({
  heading: {
    value: serifStack,
  },
  body: {
    value: sansStack,
  },
  sans: {
    value: sansStack,
  },
  serif: {
    value: serifStack,
  },
  display: {
    value: displayStack,
  },
  fantasy: {
    value: fantasyStack,
  },
  mono: {
    value: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
  },
})
