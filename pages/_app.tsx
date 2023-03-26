import { MantineProvider } from "@mantine/core"
import type { AppProps } from "next/app"
import mantineTheme from "styles/mantine-theme"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
      <Component {...pageProps} />
    </MantineProvider>
  )
}
