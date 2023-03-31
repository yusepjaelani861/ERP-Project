import { Box, DefaultMantineColor, Flex, Text } from "@mantine/core"
import React from "react"
import { AiFillInfoCircle } from "react-icons/ai"
interface Props {
  title: string
  description: string
  color: DefaultMantineColor
  children?: React.ReactNode
}
const SettingInfo: React.FC<Props> = ({
  color,
  description,
  title,
  children,
}) => {
  return (
    <Flex
      direction={"column"}
      gap={20}
      sx={({ colors }) => ({
        backgroundColor: "white",
        border: `1px solid ${colors.gray[3]}`,
        padding: "24px",
        borderRadius: "4px",
        borderLeft: `4px solid ${colors[color][5]}`,
      })}
    >
      <Text
        component="h2"
        sx={({ colors }) => ({
          fontSize: "18px",
          color: colors.gray[8],
          fontWeight: 500,
        })}
      >
        {title}
      </Text>
      <Text
        component="p"
        sx={({ colors }) => ({
          color: colors.gray[8],
          fontSize: "12px",
        })}
      >
        <Box
          component="span"
          sx={({ colors }) => ({
            color: colors.violet[5],
            marginRight: "2px",
          })}
        >
          <AiFillInfoCircle />
        </Box>
        {description}
      </Text>
      {children}
    </Flex>
  )
}

export default SettingInfo
