import { Flex, Sx } from "@mantine/core"
import React from "react"
interface Props extends React.ComponentPropsWithoutRef<"div"> {
  sx?: Sx
}
const InputGroup: React.FC<Props> = ({ sx, ...restProps }) => {
  return (
    <Flex
    // firstchild input bordertoright 0px, bordertobottom 0px, then lastchild input bordertoleft 0px, bordertobottom 0px
    sx={[
      // {
      //   "& > :first-child input": {
      //     borderTopRightRadius: "0px",
      //     borderBottomRightRadius: "0px",
      //   },

      //   "& > :last-child input": {
      //     borderTopLeftRadius: "0px",
      //     borderBottomLeftRadius: "0px",
      //   },
      // },
      sx,
    ]}
      align="end"
      {...restProps}
    />
  )
}

export default InputGroup
