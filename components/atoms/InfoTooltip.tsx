import { Box, Flex, Tooltip } from "@mantine/core"
import React from "react"
import { AiFillInfoCircle } from "react-icons/ai"
interface Props {
  info: string
}
const InfoTooltip: React.FC<Props> = ({ info }) => {
  return (
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
  )
}

export default InfoTooltip
