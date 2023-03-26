import { Box, Flex, Text } from "@mantine/core"
import React from "react"
import { FiX } from "react-icons/fi"
interface Props {
  label: string
  value: string
  dismissible?: boolean
  onDismiss?: () => void
}
const FilterItem: React.FC<Props> = ({
  label,
  value,
  dismissible = false,
  onDismiss,
}) => {
  return (
    <Flex gap={4} align="center">
      <Text
        component="p"
        sx={({ colors }) => ({
          color: colors.gray[6],
          fontSize: "12px",
        })}
      >
        {label} :
      </Text>
      <Flex
        gap={2}
        align="center"
        sx={({ colors }) => ({
          backgroundColor: colors.gray[2],
          padding: "2px 8px",
          borderRadius: "4px",
        })}
      >
        <Text
          component="p"
          sx={({ colors }) => ({
            color: colors.gray[6],
            fontSize: "12px",
          })}
        >
          {value}
        </Text>
        {dismissible && (
          <Box
            component={FiX}
            sx={({ colors }) => ({
              fontSize: "12px",
              color: colors.gray[6],
              cursor: 'pointer'
            })}
            onClick={onDismiss}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default FilterItem
