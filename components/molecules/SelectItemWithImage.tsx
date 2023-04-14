import { Box } from "@mantine/core"
import Image from "next/image"
import React from "react"

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  value: string | ""
  label: string | ""
  image: string | ""
  slug: string | ""
}

const SelectItemWithImage = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ value, image, label, slug, ...others }: ItemProps, ref) => (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        gap: "4px",
        alignItems: "center",
      }}
      {...others}
    >
      <Image src={image} alt={`shop icon`} width={16} height={16} unoptimized />
      {label}
    </Box>
  )
)
export default SelectItemWithImage
