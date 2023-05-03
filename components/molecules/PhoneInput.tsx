import { Box, Select, TextInput, TextInputProps } from "@mantine/core"
import phoneCodeList from "data/phoneCodeList"
import Image from "next/image"
import React, { useMemo } from "react"
interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  value: string
  countryName: string
  countryFlag: string
}

const SelectItem = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ value, countryFlag, countryName, ...others }: ItemProps, ref) => (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        gap: "4px",
        alignItems: "center",
      }}
      {...others}
    >
      <Image
        src={countryFlag}
        alt={`${countryName} flag`}
        width={24}
        height={13.5}
        unoptimized
      />
      {countryName}
    </Box>
  )
)

interface Phone {
  number: string
  code: string
}
interface Props extends Omit<TextInputProps, "value" | "onChange"> {
  value: Phone
  onChange: (value: Phone) => void
}
const PhoneInput: React.FC<Props> = ({
  placeholder = "Please Enter Phone Number",
  onChange,
  value,
  ...restProps
}) => {
  const selectedPhoneCode = useMemo(() => {
    return phoneCodeList.find((phoneCode) => phoneCode.dialCode === value.code)
  }, [value.code, phoneCodeList])
  return (
    <TextInput
      icon={
        <Select
          itemComponent={SelectItem}
          data={phoneCodeList.map((phoneCode) => ({
            value: phoneCode.dialCode,
            label: phoneCode.dialCode,
            countryName: phoneCode.name,
            countryFlag: phoneCode.flag,
          }))}
          value={value.code}
          onChange={(selectedValue) => {
            onChange({ ...value, code: selectedValue ?? "+62" })
          }}
          icon={
            selectedPhoneCode ? (
              <Image
                src={selectedPhoneCode.flag}
                alt={selectedPhoneCode.name}
                width={24}
                height={14}
                unoptimized
              />
            ) : undefined
          }
          dropdownPosition={"bottom"}
          variant="unstyled"
          sx={{
            border: "none",
            "& .mantine-Select-dropdown": {
              width: "375px !important",
              left: "0px !important",
            },
          }}
        />
      }
      iconWidth="102"
      placeholder={placeholder}
      sx={{
        "& .mantine-TextInput-input": {
          paddingLeft: "100px !important",
        },
        "& .mantine-TextInput-icon": {
          pointerEvents: "all",
        },
      }}
      {...restProps}
    />
  )
}

export default PhoneInput
