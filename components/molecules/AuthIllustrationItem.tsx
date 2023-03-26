import { Flex, Text } from "@mantine/core"
import Image from "next/image"
import React from "react"
interface Props {
  illustrationSrc: string
  title: string
  description: string
}
const AuthIllustrationItem: React.FC<Props> = ({
  description,
  illustrationSrc,
  title,
}) => {
  return (
    <Flex
      direction={"column"}
      align="center"
      gap={"4px"}
      sx={{ paddingBottom: "44px" }}
    >
      <Image src={illustrationSrc} alt={title} width={320} height={260} unoptimized />
      <Flex direction={"column"} align="center" gap={"20px"}>
        <Text
          component="h2"
          sx={({colors}) => ({
            fontSize: "18px",
            color: colors.dark[9],
            margin: 0,
          })}
        >
          {title}
        </Text>
        <Text
          component="p"
          sx={({colors}) => ({
            fontSize: "14px",
            color: colors.dark[6],
            margin: 0,
            textAlign: "center",
          })}
        >
          {description}
        </Text>
      </Flex>
    </Flex>
  )
}

export default AuthIllustrationItem
