import { Box, Flex, Sx, Text, Tooltip } from "@mantine/core"
import React from "react"
import { AiFillInfoCircle } from "react-icons/ai"
interface Props {
  label: string
  info?: string
  withAsterisk?: boolean
  sx?: Sx
}
const Label: React.FC<Props> = ({ info, label, withAsterisk = false, sx }) => {
  return (
    <Flex gap={4} align="center" mb={8} sx={sx}>
      {withAsterisk && (
        <Text sx={({ colors }) => ({ color: colors.red[5] })}>*</Text>
      )}
      {label}
      {info && (
        <Tooltip
          label={info}
          multiline
          width={235}
          withArrow
          sx={({}) => ({
            fontSize: "12px",
            fontWeight: 400,
          })}
        >
          <Flex>
            <Box
              component={AiFillInfoCircle}
              sx={({ colors }) => ({
                color: colors.gray[5],
                fontSize: "16px",
              })}
            />
          </Flex>
        </Tooltip>
      )}
    </Flex>
  )
}

export default Label
