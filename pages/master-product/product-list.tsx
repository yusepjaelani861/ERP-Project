import {
  Alert,
  Anchor,
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  HoverCard,
  LoadingOverlay,
  Menu,
  Select,
  Table,
  Tabs,
  Text,
  TextInput
} from "@mantine/core"
import MainLayout from "components/layouts/MainLayout"
import FilterItem from "components/molecules/FilterItem"
import SelectItemWithImage from "components/molecules/SelectItemWithImage"
import TH from "components/molecules/TH"
import TableNoData from "components/organisms/TableNoData"
import Link from "next/link"
import { useCallback, useState } from "react"
import { AiFillCaretDown, AiFillInfoCircle } from "react-icons/ai"
import { FiFilter, FiRefreshCw, FiSearch } from "react-icons/fi"
import { ImFire, ImSad2 } from "react-icons/im"
import { MdNewReleases } from "react-icons/md"
import { useUpdateEffect } from "usehooks-ts"
const MasterProductListPage = () => {
  const [filter, setFilter] = useState("Master Product Name")
  const [stockStatus, setStockStatus] = useState("All")
  const [keyword, setKeyword] = useState("")
  const [storeWithoutSales, setStoreWithoutSales] = useState("")
  const [bindingStatus, setBindingStatus] = useState("")

  const resetFilterHandler = useCallback(() => {
    setFilter("Master Product Name")
    setStockStatus("All")
    setKeyword("")
    setStoreWithoutSales("")
    setBindingStatus("")
  }, [])

  const [activeTab, setActiveTab] = useState("all")
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
  return (
    <MainLayout title="Master Product">
      <Flex direction={"column"} p={16} gap={16}>
        <Alert
          color={"violet"}
          icon={<AiFillInfoCircle />}
          sx={({ colors }) => ({
            borderTop: `3px solid ${colors.violet[6]}`,
            "& .mantine-Alert-message": {
              color: colors.violet[7],
              fontWeight: 500,
            },
          })}
        >
          <Anchor component={Link} href={"/master-product/settings"}>
            Master SKU Auto-Bind Setting (Not Enable)Click here to jump to the
            page for setting up Master Product automatic binding
          </Anchor>
        </Alert>
        <Flex wrap="wrap" align={"center"} gap={12}>
          <Flex wrap="wrap">
            <Select
              data={["Master Product Name", "MSKU", "Barcode"]}
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
            placeholder="Store without sales"
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
            value={storeWithoutSales}
            onChange={(value) => setStoreWithoutSales(value!)}
          />
          <Select
            size={"xs"}
            placeholder={"Channel product binding"}
            data={["All bound", "All Unbinded", "Bound", "Unbinded"]}
            clearable
            value={bindingStatus}
            onChange={(value) => setBindingStatus(value!)}
          />
          <Select
            size={"xs"}
            placeholder={"Stock Status"}
            defaultValue={"All"}
            data={["All", "Close", "Enable"]}
            clearable
            value={stockStatus}
            onChange={(value) => setStockStatus(value!)}
          />
          <Button variant={"filled"} color={"violet"} size="xs">
            Search
          </Button>
          <Button variant={"default"} size="xs" leftIcon={<FiFilter />}>
            Filter
          </Button>
          <Flex align={"center"} gap={2}>
            <Text
              sx={({ colors }) => ({
                fontSize: "12px",
                color: colors.gray[6],
                fontWeight: 500,
              })}
              component="p"
            >
              Product Activity
            </Text>
            <HoverCard
              width={150}
              shadow="md"
              withArrow
              styles={{ dropdown: { backgroundColor: "rgba(0,0,0, 0.8)" } }}
            >
              <HoverCard.Target>
                <Flex>
                  <Box
                    sx={({ colors }) => ({ color: colors.gray[5] })}
                    component={AiFillInfoCircle}
                  />
                </Flex>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Flex direction={"column"} gap={6}>
                  <Flex gap={4} align={"center"}>
                    <Box
                      sx={({ colors }) => ({ color: colors.red[5] })}
                      component={ImFire}
                    />
                    <Text
                      sx={({ colors }) => ({
                        fontSize: "12px",
                        color: colors.gray[0],
                      })}
                      component="p"
                    >
                      Best Selling Item
                    </Text>
                  </Flex>
                  <Flex gap={4} align={"center"}>
                    <Box
                      sx={({ colors }) => ({ color: colors.orange[5] })}
                      component={ImFire}
                    />
                    <Text
                      sx={({ colors }) => ({
                        fontSize: "12px",
                        color: colors.gray[0],
                      })}
                      component="p"
                    >
                      Trending Item
                    </Text>
                  </Flex>
                  <Flex gap={4} align={"center"}>
                    <Box
                      sx={({ colors }) => ({ color: colors.orange[3] })}
                      component={ImFire}
                    />
                    <Text
                      sx={({ colors }) => ({
                        fontSize: "12px",
                        color: colors.gray[0],
                      })}
                      component="p"
                    >
                      Normal Item
                    </Text>
                  </Flex>
                  <Flex gap={4} align={"center"}>
                    <Box
                      sx={({ colors }) => ({ color: colors.gray[5] })}
                      component={ImSad2}
                    />
                    <Text
                      sx={({ colors }) => ({
                        fontSize: "12px",
                        color: colors.gray[0],
                      })}
                      component="p"
                    >
                      Low Selling Item
                    </Text>
                  </Flex>
                  <Flex gap={4} align={"center"}>
                    <Box
                      sx={({ colors }) => ({ color: colors.green[5] })}
                      component={MdNewReleases}
                    />
                    <Text
                      sx={({ colors }) => ({
                        fontSize: "12px",
                        color: colors.gray[0],
                      })}
                      component="p"
                    >
                      New Item
                    </Text>
                  </Flex>
                </Flex>
              </HoverCard.Dropdown>
            </HoverCard>
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
          {storeWithoutSales && (
            <FilterItem
              label="Store without sales"
              value={storeWithoutSales}
              dismissible
              onDismiss={() => setStoreWithoutSales("")}
            />
          )}
          {bindingStatus && (
            <FilterItem
              label="Channel product binding status"
              value={bindingStatus}
              dismissible
              onDismiss={() => setBindingStatus("")}
            />
          )}
          <FilterItem label="Stock Status" value={stockStatus} />
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
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: 6,
        }}
      >
        <Flex justify={"space-between"} align="center" gap={8} px={16} sx={{backgroundColor: 'white'}}>
          <Tabs value={activeTab} onTabChange={(value) => setActiveTab(value!)}>
            <Tabs.List
              sx={({ colors }) => ({
                borderBottom: "none",
                flexWrap: "nowrap",
                "& .mantine-Tabs-tab": {
                  fontSize: "12px",
                  "& .mantine-Badge-root": {
                    marginLeft: 4,
                    backgroundColor: colors.gray[2],
                    color: colors.gray[6],
                  },
                  "&:hover": {
                    borderBottomColor: "transparent",
                  },
                  "&[data-active]": {
                    borderBottomColor: colors.violet[6],
                    "& .mantine-Badge-root": {
                      backgroundColor: colors.violet[6],
                      color: colors.gray[0],
                    },
                  },
                },
              })}
            >
              <Tabs.Tab value="all">
                All <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="single-product">
                Single Product <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="multiple-variant">
                Multiple Variant <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="combination">
                Combination <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="temporary-untracked">
                Temporary Untracked <Badge>0</Badge>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Flex gap={8}>
            <Button variant={"default"} size={"xs"}>
              Operation Log
            </Button>
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
                <Menu.Item>Import to Bind Product</Menu.Item>
                <Menu.Item>Import to Create Product</Menu.Item>
                <Menu.Item>Import to Edit Product</Menu.Item>
                <Menu.Item>Update Auto-Bind rules</Menu.Item>
                <Menu.Label>Export</Menu.Label>
                <Menu.Item>Export Selected</Menu.Item>
                <Menu.Item>Export by page</Menu.Item>
                <Menu.Item>Export selected details combine product</Menu.Item>
                <Menu.Item disabled>
                  Export details combine product by page
                </Menu.Item>
                <Menu.Item>Export all Auto-Bind rules</Menu.Item>
                <Menu.Item>Mass operation history</Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Menu trigger="hover" position="bottom-end">
              <Menu.Target>
                <Button
                  variant={"filled"}
                  color="violet"
                  size={"xs"}
                  rightIcon={<AiFillCaretDown />}
                >
                  Add Product
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Add Product</Menu.Item>
                <Menu.Item>Add Combined Product</Menu.Item>
                <Menu.Item>Auto add by Store</Menu.Item>
                <Menu.Item>Refer Channel Products</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Flex>
      </Box>

      <Box pos={"relative"} sx={{backgroundColor: 'white',}}>
        <Box sx={{ width: "100%", overflowX: "auto", }}>
          <Table sx={{ width: "100%", minWidth: "1650px" }}>
            <Box
              component="thead"
              sx={({ colors }) => ({ backgroundColor: colors.gray[1] })}
            >
              <tr>
                <Box component="th">
                  <Checkbox />
                </Box>
                <TH label="Master Product & Image" sx={{ width: "360px" }} />
                <TH label="Variation" />
                <TH label="MSKU" />
                <TH
                  label="Available Stock"
                  info={`To ensure that the available inventory is accurate, please click "Update Available Inventory" to get the latest inventory value.`}
                />
                <TH
                  label="Stock Status"
                  info={`Display stock status in this column: Warehouse, stock sync status, Master SKU type information.
                Warehouse: The warehouse where this Master SKU is placed.
                Stock sync status: Whether the Master SKU has been enabled for stock adding or dropping sync. The "stock sync status" of the newly added Product Master will be disabled by default.
                Combination Master SKU tag: If this Master SKU is a combined Master SKU, the "combination" tag will be displayed`}
                />
                <TH label="Barcode" />
                <TH label="Binded Product" />
                <TH label="Binded Store" />
                <TH label="Time" />
                <TH label="Action" />
              </tr>
            </Box>
          </Table>
          <TableNoData />
        </Box>
        <LoadingOverlay visible={isLoading} />
      </Box>
    </MainLayout>
  )
}

export default MasterProductListPage
