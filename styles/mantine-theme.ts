import { MantineThemeOverride } from "@mantine/core"

const mantineTheme: MantineThemeOverride = {
  fontFamily: "Inter, sans-serif",
  primaryColor: "violet",
  globalStyles: ({ colors }) => ({
    body: {
      backgroundColor: colors.gray[0]
    },
    "p, h1, h2, h3, h4": {
      margin: 0,
    },
    ".mantine-Input-wrapper input[data-invalid]": {
      color: colors.dark[9],
      "&::placeholder": {
        color: colors.dark[0],
      },
    },
    ".mantine-Tabs-tab": {
      paddingTop: 12,
      paddingBottom: 12,
      "&:hover": {
        backgroundColor: "unset",
        color: colors.violet[6],
      },
      "&[data-active]": {
        color: colors.violet[7],
        fontWeight: 500,
      },
    },
    '.mantine-Table-root tbody tr td': {
      padding: '12px 16px',
      fontSize: 12,
      color: colors.gray[8]
    },
    '.mantine-Table-root[data-hover] tbody tr:hover': {
      backgroundColor: colors.gray[0]
    }
  }),
}
export default mantineTheme
