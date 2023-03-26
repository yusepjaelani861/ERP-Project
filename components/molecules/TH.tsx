import { Box, Flex, Sx, Tooltip } from "@mantine/core"
import React from "react"
import { AiFillInfoCircle } from "react-icons/ai"
interface Props extends React.ComponentPropsWithoutRef<"th"> {
  label: string
  info?: string
  sx?: Sx
}
const TH: React.FC<Props> = ({
  label,
  info,
  sx,
  ...restProps
}) => {
  return (
    <Box component="th" sx={[{width: '180px', padding: '12px 16px !important'}, sx]} {...restProps}>
      {info ? (
        <Flex gap={4} align="center">
          {label}
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
        </Flex>
      ) : (
        label
      )}
    </Box>
  )
}

export default TH
