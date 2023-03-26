import {
  Accordion,
  Box,
  Flex,
  MultiSelect,
  Radio,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core"
import InfoTooltip from "components/atoms/InfoTooltip"
import Label from "components/molecules/Label"
import SelectItemWithImage from "components/molecules/SelectItemWithImage"
import React, { useState } from "react"
import { AiFillInfoCircle } from "react-icons/ai"

const AddShopeeProductPage = () => {
  const [onSaleShop, setOnSaleShop] = useState<string[]>([])
  const [productName, setProductName] = useState("")
  return (
    <>
      <Box p={16}>
        <Accordion
          variant="separated"
          sx={({ colors }) => ({
            "& .mantine-Accordion-item": {
              backgroundColor: "white",
              borderColor: colors.gray[3],
              "& .mantine-Accordion-control[data-active]": {
                borderBottom: `1px solid ${colors.gray[3]}`,
              },
              "& .mantine-Accordion-content": {
                paddingTop: "1rem",
              },
            },
          })}
        >
          <Accordion.Item value="basic-information">
            <Accordion.Control>Basic Information</Accordion.Control>
            <Accordion.Panel>
              <Flex
                direction={"column"}
                gap={16}
                sx={{
                  width: "100%",
                  "@media (min-width: 1024px)": {
                    width: "50%",
                  },
                }}
              >
                <MultiSelect
                  itemComponent={SelectItemWithImage}
                  data={[
                    {
                      label: "yusep8601",
                      value: "yusep8601",
                      image:
                        "https://cdn-erp.ginee.com/crm/stag/genie_20200108115600831_0236379310.png",
                    },
                  ]}
                  placeholder="On Sale Shop"
                  label={
                    <Label
                      label="On Sale Shop"
                      info="Only support selecting multiple stores in the same country"
                      withAsterisk
                    />
                  }
                  searchable
                  size={"sm"}
                  value={onSaleShop}
                  onChange={(value) => setOnSaleShop(value)}
                />
                {onSaleShop.length > 0 && (
                  <>
                    <TextInput
                      placeholder="Please Enter"
                      label={
                        <Label
                          withAsterisk
                          label="Product Name"
                          info="Limit the maximum range according to API requirement"
                        />
                      }
                      maxLength={255}
                      rightSection={
                        <Text
                          sx={({ colors }) => ({
                            fontSize: "12px",
                            color: colors.gray[6],
                          })}
                        >
                          {productName.length}/255
                        </Text>
                      }
                      rightSectionWidth={64}
                      value={productName}
                      onChange={(e) =>
                        setProductName(e.target.value.trimStart())
                      }
                      size="sm"
                    />
                    <Select
                      data={[]}
                      placeholder="Select Categories"
                      label={<Label label="Category" info="" withAsterisk />}
                      size="sm"
                    />
                    <Textarea
                      placeholder="Long description"
                      size="sm"
                      cols={4}
                      label={
                        <Label
                          label="Long description"
                          withAsterisk
                          info="Limit the maximum range according to API requirement"
                        />
                      }
                      minRows={4}
                    />
                    <Flex direction={"column"} gap={8}>
                      <Flex align={"center"} gap={4}>
                        <Text sx={{ fontSize: "14px", fontWeight: 500 }}>
                          Dangerous Goods
                        </Text>
                        <InfoTooltip info="Please fill in DG accurately. Inaccurate DG may result in additional shipping fee or failed delivery." />
                      </Flex>
                      <Flex gap={16}>
                        <Radio label="No" name="dangerous-goods" />
                        <Radio
                          label="Contains battery/magnet/liquid/flammable materials"
                          name="dangerous-goods"
                        />
                      </Flex>
                    </Flex>
                  </>
                )}
                <Select
                  label={<Label label="Condition" />}
                  data={["New", "Used"]}
                  defaultValue={"New"}
                />
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="product-info">
            <Accordion.Control>Product Info</Accordion.Control>
            <Accordion.Panel>
              <Flex
                direction={"column"}
                gap={16}
                sx={{
                  width: "100%",
                  "@media (min-width: 1024px)": {
                    width: "50%",
                  },
                }}
              >
                {onSaleShop.length > 0 ? (
                  <></>
                ) : (
                  <Text
                    sx={({ colors }) => ({
                      color: colors.gray[8],
                      fontSize: "12px",
                    })}
                  >
                    Please choose the Store first
                  </Text>
                )}
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Box>
    </>
  )
}

export default AddShopeeProductPage
