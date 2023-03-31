import {
  Alert, Box,
  Button,
  Checkbox,
  Flex, LoadingOverlay,
  Menu,
  Select,
  Table,
  Tabs, TextInput
} from "@mantine/core"
import MainLayout from "components/layouts/MainLayout"
import FilterItem from "components/molecules/FilterItem"
import SelectItemWithImage from "components/molecules/SelectItemWithImage"
import TH from "components/molecules/TH"
import TableNoData from "components/organisms/TableNoData"
import { useCallback, useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FiFilter, FiRefreshCw, FiSearch } from "react-icons/fi"
import { useUpdateEffect } from "usehooks-ts"
const MasterPriceManagementPage = () => {
  const [filter, setFilter] = useState("Master Product Name")
  const [keyword, setKeyword] = useState("")
  const [storeName, setStoreName] = useState("")

  const resetFilterHandler = useCallback(() => {
    setFilter("Master Product Name")
    setKeyword("")
    setStoreName("")
  }, [])

  const [activeTab, setActiveTab] = useState("price-list")
  const [isLoading, setIsLoading] = useState(false)

  /** Simulation */
  const fetchData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  useUpdateEffect(() => {
    fetchData()
  }, [activeTab])
  const [showAlert, setShowAlert] = useState(true)
  return (
    <MainLayout title="Price Management">
      <Flex direction={"column"} p={16} gap={16}>
        {showAlert && (
          <Alert
            color={"violet"}
            sx={({ colors }) => ({
              borderTop: `3px solid ${colors.violet[6]}`,
              "& .mantine-Alert-message": {
                color: colors.violet[7],
                fontWeight: 500,
              },
            })}
            withCloseButton
            onClose={() => setShowAlert(false)}
          >
            When the Blibli/Zalora API is updated, the price of the store
            product will take effect after 2-3 minutes.
          </Alert>
        )}
        <Flex justify={"space-between"} gap={12} align="center" wrap="wrap">
          <Flex wrap="wrap" align={"center"} gap={12}>
            <Flex wrap="wrap">
              <Select
                data={["Master Product Name", "MSKU"]}
                defaultValue={"Master Product Name"}
                onChange={(value) => setFilter(value!)}
                value={filter}
                w={180}
                size="xs"
                sx={{
                  "& input": {
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  },
                }}
              />
              <TextInput
                placeholder="Please Enter"
                rightSection={
                  <Box
                    component={FiSearch}
                    sx={({ colors }) => ({ color: colors.gray[5] })}
                  />
                }
                size={"xs"}
                sx={{
                  "& input": {
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  },
                }}
                w={280}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value.trimStart())}
              />
            </Flex>
            <Select
              placeholder="Store name"
              itemComponent={SelectItemWithImage}
              data={[
                {
                  label: "yusep8601",
                  value: "yusep8601",
                  image:
                    "https://cdn-erp.ginee.com/crm/stag/genie_20200108115600831_0236379310.png",
                },
              ]}
              size="xs"
              clearable
              value={storeName}
              onChange={(value) => setStoreName(value!)}
            />
            <Button variant={"filled"} color={"violet"} size="xs">
              Search
            </Button>
            <Button variant={"default"} size="xs" leftIcon={<FiFilter />}>
              Filter
            </Button>
          </Flex>
          <Flex wrap="wrap" align={"center"} gap={12}>
            <Menu trigger="hover" position="bottom-start">
              <Menu.Target>
                <Button
                  variant={"default"}
                  size={"xs"}
                  rightIcon={<AiFillCaretDown />}
                >
                  Import/Export
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Import</Menu.Label>
                <Menu.Item>Import update price</Menu.Item>
                <Menu.Label>Export</Menu.Label>
                <Menu.Item>Export Selected</Menu.Item>
                <Menu.Item>Export by page</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Button
              variant={"filled"}
              color="violet"
              leftIcon={<FiRefreshCw />}
              size="xs"
            >
              Sync Promotion
            </Button>
          </Flex>
        </Flex>

        <Flex wrap="wrap" align={"center"} gap={12}>
          <FilterItem label="Filter" value={filter} />
          {keyword && (
            <FilterItem
              label="Keyword"
              value={keyword}
              dismissible
              onDismiss={() => setKeyword("")}
            />
          )}
          {storeName && (
            <FilterItem
              label="Store without sales"
              value={storeName}
              dismissible
              onDismiss={() => setStoreName("")}
            />
          )}
          <Button
            variant={"subtle"}
            color="violet"
            size={"xs"}
            leftIcon={<FiRefreshCw />}
            onClick={resetFilterHandler}
          >
            Reset
          </Button>
        </Flex>
      </Flex>
      <Tabs value={activeTab} onTabChange={(value) => setActiveTab(value!)}>
        <Box
          sx={{
            backgroundColor: "white",
            paddingLeft: "16px",
            borderBottom: "2px solid #dfe3e8",
          }}
        >
          <Tabs.List
            sx={{
              borderBottom: "none",
              "& .mantine-Tabs-tab": {
                paddingTop: "20px",
                paddingBottom: "20px",
              },
            }}
          >
            <Tabs.Tab value="price-list">Price List</Tabs.Tab>
            <Tabs.Tab value="update-failed">Update Failed</Tabs.Tab>
          </Tabs.List>
        </Box>
        <Tabs.Panel value="price-list">
          <Box pos={"relative"} sx={{ backgroundColor: "white" }}>
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <Table sx={{ width: "100%", minWidth: '1440px' }}>
                <Box
                  component="thead"
                  sx={({ colors }) => ({ backgroundColor: colors.gray[1] })}
                >
                  <tr>
                    <Box component="th" w={40}>
                      <Checkbox />
                    </Box>
                    <TH
                      label="Master Product & Image"
                      sx={{ width: "360px" }}
                    />
                    <TH label="MSKU" />
                    <TH
                      label="Default price"
                      info="Price of Master Product, Edit this price will not affect the Store Price"
                    />
                    <TH label="Store Name" />
                    <TH label="Channel SKU" />
                    <TH
                      label="Price"
                      info="The actual selling price of the product in Store, this price is consistent with product price under Product Management"
                    />

                    <TH label="Created Time" />
                  </tr>
                </Box>
              </Table>
              <TableNoData />
            </Box>
            <LoadingOverlay visible={isLoading} />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="update-failed">
          <Box pos={"relative"} sx={{ backgroundColor: "white" }}>
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <Table sx={{ width: "100%", minWidth: '1440px' }}>
                <Box
                  component="thead"
                  sx={({ colors }) => ({ backgroundColor: colors.gray[1] })}
                >
                  <tr>
                    <Box component="th" w={40}>
                      <Checkbox />
                    </Box>
                    <TH
                      label="Master Product & Image"
                      sx={{ width: "360px" }}
                    />
                    <TH label="MSKU" />
                    <TH label="Store Name" />
                    <TH label="Price" />
                    <TH label="Failed Reason" />
                    <TH label="Created Time" />
                    <TH label="Action" />
                  </tr>
                </Box>
              </Table>
              <TableNoData />
            </Box>
            <LoadingOverlay visible={isLoading} />
          </Box>
        </Tabs.Panel>
      </Tabs>
    </MainLayout>
  )
}

export default MasterPriceManagementPage
