import { Box, DefaultMantineColor, Sx } from "@mantine/core"
import React from "react"
interface Props {
  color: DefaultMantineColor
  sx?: Sx
}
const DotBadge: React.FC<Props> = ({ color, sx }) => {
  return (
    <Box
      sx={[
        ({ colors }) => ({
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: colors[color][5],
        }),
        sx,
      ]}
    />
  )
}

export default DotBadge
