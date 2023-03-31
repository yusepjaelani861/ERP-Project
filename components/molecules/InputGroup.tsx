import { Flex, Sx } from "@mantine/core"
import React from "react"
interface Props extends React.ComponentPropsWithoutRef<"div"> {
  sx?: Sx
}
const InputGroup: React.FC<Props> = ({ sx, ...restProps }) => {
  return (
    <Flex
      sx={[
        {
          "& > :first-child input": {
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
          },

          "& > :last-child input": {
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
          },
        },
        sx,
      ]}
      align="end"
      {...restProps}
    />
  )
}

export default InputGroup
