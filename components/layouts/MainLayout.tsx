import { AppShell, Sx } from "@mantine/core"
import Header from "components/organisms/Header"
import Navbar from "components/organisms/Navbar"
import React from "react"
import useNavbarExpand from "store/navbarExpand"
interface Props {
  children: React.ReactNode
  title: string
  sx?: Sx
  footer?: React.ReactElement
}
const MainLayout: React.FC<Props> = ({ children, title, sx, footer }) => {
  const { expanded } = useNavbarExpand()
  return (
    <AppShell
      sx={[
        {
          "& main": {
            paddingTop: "var(--mantine-header-height, 0px)",
            paddingBottom: "var(--mantine-footer-height, 0px)",
            paddingLeft: expanded ? 0 : "var(--mantine-navbar-width, 0px)",
            paddingRight: "var(--mantine-aside-width, 0px)",

            "@media (min-width: 640px)": {
              paddingLeft: "var(--mantine-navbar-width, 0px)",
            },
          },
        },
        sx,
      ]}
      header={<Header title={title} />}
      navbar={<Navbar />}
      footer={footer}
    >
      {children}
    </AppShell>
  )
}

export default MainLayout
