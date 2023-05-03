import { Box, Card, Flex, Text } from "@mantine/core"
import AuthIllustration from "components/organisms/AuthIllustration"
import Image from "next/image"
import React from "react"
interface Props {
  title: string
  children: React.ReactNode
}
const AuthLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url('/assets/auth-background.svg')`,
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          padding: "0px !important",
          "@media(min-width: 768px)": {
            maxWidth: "560px",
            minHeight: "0px",
            borderRadius: "16px",
            boxShadow: "0 0 16px #606c800f",
          },
          "@media(min-width: 1024px)": {
            maxWidth: "990px",
            minHeight: "600px",
            display: "flex",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: "24px",
            paddingBottom: "56px",
            "@media (min-width: 768px)": {
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              minHeight: "600px",
            },
            "@media (min-width: 1024px)": {
              padding: "24px 60px",
              width: "55%",
            },
          }}
        >
          <Box
            sx={{
              display: "none",
              "@media (min-width: 1024px)": {
                marginBottom: 36,
                display: "block",
              },
            }}
          >
            <Image
              src={"/assets/logo-o2o.png"}
              width={110}
              height={48}
              alt="logo"
            />
          </Box>
          <Text
            component="h1"
            sx={({ colors }) => ({
              fontSize: "1.75rem",
              color: colors.dark[9],
              fontWeight: 600,
              margin: 0,
              marginBottom: 36,
              "@media (min-width: 1024px)": {
                fontSize: "2rem",
              },
            })}
          >
            {title}
          </Text>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 36,
              "@media (min-width: 1024px)": {
                display: "none",
              },
            }}
          >
            <Image src={"/assets/logo-o2o.png"} width={48} height={48} alt="logo" />
          </Box>
          {children}
        </Box>
        <AuthIllustration />
      </Card>
      <Text
        component="p"
        sx={{
          position: "absolute",
          bottom: "24px",
          fontSize: "12px",
          color: "#606c80",
        }}
      >
        ©2023 O2O Technology Pte Ltd
      </Text>
    </Flex>
  )
}

export default AuthLayout
