import {
  ActionIcon,
  Alert,
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Footer,
  LoadingOverlay,
  Menu,
  Select,
  Table,
  Tabs,
  Text,
} from "@mantine/core"
import DotBadge from "components/atoms/DotBadge"
import MainLayout from "components/layouts/MainLayout"
import SelectItemWithImage from "components/molecules/SelectItemWithImage"
import TH from "components/molecules/TH"
import TableNoData from "components/organisms/TableNoData"
import integrationChannelList from "data/integrationChannelList"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useState } from "react"
import {
  AiFillCaretDown,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai"
import {
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
} from "react-icons/fi"
import { useUpdateEffect } from "usehooks-ts"
const IntegrationStoreListPage = () => {
  const [activeTab, setActiveTab] = useState("market-place")
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

  const [marketPlaceFilter, setMarketPlaceFilter] = useState("all")
  const [marketPlaceIntegrationChannel, setMarketPlaceIntegrationChannel] =
    useState("")
  useUpdateEffect(() => {
    fetchData()
  }, [marketPlaceFilter])
  const [webstoreFilter, setWebstoreFilter] = useState("all")
  const [webstoreIntegrationChannel, setWebstoreIntegrationChannel] =
    useState("")
  useUpdateEffect(() => {
    fetchData()
  }, [webstoreFilter])
  const [showAlert, setShowAlert] = useState(true)
  return (
    <MainLayout
      title="Master Product"
      sx={{ backgroundColor: "white", "& main": { paddingBottom: "56px" } }}
    >
      {showAlert && (
        <Flex
          direction={"column"}
          p={16}
          gap={16}
          sx={({ colors }) => ({ backgroundColor: colors.gray[0] })}
        >
          <Alert
            color={"violet"}
            icon={<FiAlertCircle />}
            sx={({ colors }) => ({
              borderTop: `3px solid ${colors.violet[6]}`,
              "& .mantine-Alert-message": {
                fontWeight: 400,
                fontSize: "12px",
              },
            })}
            withCloseButton
            onClose={() => setShowAlert(false)}
          >
            After your Shop successfully connected, you can see your products
            and orders synchronization process on the Product and Order page
          </Alert>
        </Flex>
      )}
      <Tabs value={activeTab} onTabChange={(value) => setActiveTab(value!)}>
        <Box
          sx={({}) => ({
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            paddingBottom: 6,
          })}
        >
          <Flex
            justify={"space-between"}
            align="center"
            gap={8}
            mx={16}
            sx={{
              backgroundColor: "white",
            }}
          >
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
              <Tabs.Tab value="market-place">
                Market Place <Badge>1</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="webstore">
                Webstore <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="custom-shop">
                Custom Shop <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="fulfillment">
                Fulfillment <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="accounting">
                Accounting <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="logistic-services">
                Logistic Services <Badge>0</Badge>
              </Tabs.Tab>
            </Tabs.List>
            <Link href="/integration/add-integration">
              <Button
                variant={"filled"}
                color="violet"
                size={"xs"}
                leftIcon={
                  <Box component={AiOutlinePlus} sx={{ fontSize: "14px" }} />
                }
              >
                Add Integration
              </Button>
            </Link>
          </Flex>
        </Box>
        <Tabs.Panel value="market-place">
          <Flex direction={"column"} gap={16} p={16}>
            <Flex gap={12} align="center" wrap="wrap">
              <Button.Group
                sx={{
                  flexWrap: "wrap",
                }}
              >
                {[
                  {
                    label: "All",
                    value: "all",
                    count: 1,
                  },
                  {
                    label: "Authorized",
                    value: "authorized",
                    count: 1,
                    badgeColor: "green",
                  },
                  {
                    label: "Expired",
                    value: "expired",
                    count: 0,
                    badgeColor: "red",
                  },
                  {
                    label: "Deactive",
                    value: "deactive",
                    count: 0,
                    badgeColor: "gray",
                  },
                ].map((filter) => (
                  <Button
                    key={filter.label}
                    variant={"default"}
                    size="xs"
                    leftIcon={
                      filter.badgeColor ? (
                        <DotBadge color={filter.badgeColor} />
                      ) : undefined
                    }
                    sx={({ colors }) => ({
                      color:
                        filter.value === marketPlaceFilter
                          ? colors.violet[5]
                          : colors.gray[7],
                      fontWeight: 500,
                      borderColor:
                        filter.value === marketPlaceFilter
                          ? colors.violet[5]
                          : colors.gray[5],
                    })}
                    onClick={() => setMarketPlaceFilter(filter.value)}
                  >
                    {filter.label} ({filter.count})
                  </Button>
                ))}
              </Button.Group>
              <Select
                placeholder="Channel"
                itemComponent={SelectItemWithImage}
                data={integrationChannelList}
                size="xs"
                w={160}
                clearable
                value={marketPlaceIntegrationChannel}
                onChange={(value) => setMarketPlaceIntegrationChannel(value!)}
              />
              <Button
                size="xs"
                variant={"filled"}
                color="violet"
                leftIcon={
                  <Box component={AiOutlineSearch} sx={{ fontSize: "14px" }} />
                }
                onClick={fetchData}
              >
                Search
              </Button>
              <Button
                size="xs"
                variant={"subtle"}
                color="violet"
                leftIcon={<FiRefreshCw />}
                onClick={() => {
                  setMarketPlaceFilter("all")
                  setMarketPlaceIntegrationChannel("")
                  fetchData()
                }}
              >
                Reset
              </Button>
            </Flex>
            <Box pos={"relative"} sx={{ backgroundColor: "white" }}>
              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <Table
                  sx={{
                    width: "100%",
                    minWidth: "1280px",
                    borderBottom: "1px solid #eee",
                  }}
                  highlightOnHover
                >
                  <Box
                    component="thead"
                    sx={({ colors }) => ({ backgroundColor: colors.gray[1] })}
                  >
                    <tr>
                      <TH label="Store Name" />
                      <TH label="Authorization Status" />
                      <TH label="Country/Region" />
                      <TH label="Authorization Time" />
                      <TH label="Authorization Validity Period" />
                      <TH label="Action" />
                    </tr>
                  </Box>
                  <tbody>
                    <tr>
                      <td>
                        <Flex gap={8} align="center">
                          <Image
                            src="https://erp.ginee.com/erp/images/icon-channel-round/shopee.svg"
                            alt="Shopee"
                            width={32}
                            height={32}
                            unoptimized
                          />
                          yusepj861
                          <ActionIcon
                            size={"xs"}
                            sx={{
                              "&:hover": { backgroundColor: "transparent" },
                            }}
                          >
                            <AiOutlineEdit />
                          </ActionIcon>
                        </Flex>
                      </td>
                      <td>
                        <Flex gap={8} align="center">
                          <DotBadge color="green" />
                          Authorized
                        </Flex>
                      </td>
                      <td>
                        <Flex gap={8} align="center">
                          <Box
                            sx={{ boxShadow: "rgb(221, 221, 221) 0px 0px 4px" }}
                            component={Image}
                            src="https://erp.ginee.com/erp/webpack/assets/id-f624e2c8444a7794b357..svg"
                            alt="Indonesian Flag"
                            width="16"
                            height={"12"}
                          />
                          Indonesia
                        </Flex>
                      </td>
                      <td>25-03-2023 09:40</td>
                      <td>359 day</td>
                      <td>
                        <Flex direction={"column"} gap={4} align="start">
                          <Button size="xs" color="violet" variant={"subtle"}>
                            Pull Data
                          </Button>
                          <Button size="xs" color="violet" variant={"subtle"}>
                            Delete Store
                          </Button>
                        </Flex>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                {/* If no data render TableNoData here */}
                {/* <TableNoData /> */}
                <LoadingOverlay visible={isLoading} />
              </Box>
            </Box>
          </Flex>
          <Flex
            justify={"right"}
            align="center"
            gap={8}
            sx={({ colors }) => ({
              backgroundColor: "white",
              padding: "12px 16px",
              position: "fixed",
              bottom: "0px",
              left: "0px",
              width: "100%",
              borderTop: `1px solid ${colors.gray[3]}`,
            })}
          >
            <Text
              sx={({ colors }) => ({
                fontSize: "12px",
                color: colors.gray[7],
              })}
            >
              Total 1
            </Text>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronLeft />
            </ActionIcon>
            <ActionIcon
              variant={"outline"}
              color="violet"
              sx={{ fontSize: "12px" }}
            >
              1
            </ActionIcon>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronRight />
            </ActionIcon>
            <Select
              data={["10 / page", "20 / page", "50 / page", "100 / page"]}
              defaultValue={"10 / page"}
              size="xs"
              w={100}
            />
          </Flex>
        </Tabs.Panel>
        <Tabs.Panel value="webstore">
          <Flex direction={"column"} gap={16} p={16}>
            <Flex gap={12} align="center" wrap="wrap">
              <Button.Group
                sx={{
                  flexWrap: "wrap",
                }}
              >
                {[
                  {
                    label: "All",
                    value: "all",
                    count: 0,
                  },
                  {
                    label: "Authorized",
                    value: "authorized",
                    count: 0,
                    badgeColor: "green",
                  },
                  {
                    label: "Expired",
                    value: "expired",
                    count: 0,
                    badgeColor: "red",
                  },
                  {
                    label: "Deactive",
                    value: "deactive",
                    count: 0,
                    badgeColor: "gray",
                  },
                ].map((filter) => (
                  <Button
                    key={filter.label}
                    variant={"default"}
                    size="xs"
                    leftIcon={
                      filter.badgeColor ? (
                        <DotBadge color={filter.badgeColor} />
                      ) : undefined
                    }
                    sx={({ colors }) => ({
                      color:
                        filter.value === webstoreFilter
                          ? colors.violet[5]
                          : colors.gray[7],
                      fontWeight: 500,
                      borderColor:
                        filter.value === webstoreFilter
                          ? colors.violet[5]
                          : colors.gray[5],
                    })}
                    onClick={() => setWebstoreFilter(filter.value)}
                  >
                    {filter.label} ({filter.count})
                  </Button>
                ))}
              </Button.Group>
              <Select
                placeholder="Channel"
                itemComponent={SelectItemWithImage}
                data={integrationChannelList}
                size="xs"
                w={160}
                clearable
                value={webstoreIntegrationChannel}
                onChange={(value) => setWebstoreIntegrationChannel(value!)}
              />
              <Button
                size="xs"
                variant={"filled"}
                color="violet"
                leftIcon={
                  <Box component={AiOutlineSearch} sx={{ fontSize: "14px" }} />
                }
                onClick={fetchData}
              >
                Search
              </Button>
              <Button
                size="xs"
                variant={"subtle"}
                color="violet"
                leftIcon={<FiRefreshCw />}
                onClick={() => {
                  setWebstoreFilter("all")
                  setWebstoreIntegrationChannel("")
                  fetchData()
                }}
              >
                Reset
              </Button>
            </Flex>
            <Box pos={"relative"} sx={{ backgroundColor: "white" }}>
              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <Table
                  sx={{
                    width: "100%",
                    minWidth: "1280px",
                    borderBottom: "1px solid #eee",
                  }}
                  highlightOnHover
                >
                  <Box
                    component="thead"
                    sx={({ colors }) => ({ backgroundColor: colors.gray[1] })}
                  >
                    <tr>
                      <TH label="Store Name" />
                      <TH label="Authorization Status" />
                      <TH label="Country/Region" />
                      <TH label="Authorization Time" />
                      <TH label="Authorization Validity Period" />
                      <TH label="Action" />
                    </tr>
                  </Box>
                  {/* <tbody>
                    <tr>
                      <td>
                        <Flex gap={8} align="center">
                          <Image
                            src="https://erp.ginee.com/erp/images/icon-channel-round/shopee.svg"
                            alt="Shopee"
                            width={32}
                            height={32}
                            unoptimized
                          />
                          yusepj861
                          <ActionIcon
                            size={"xs"}
                            sx={{
                              "&:hover": { backgroundColor: "transparent" },
                            }}
                          >
                            <AiOutlineEdit />
                          </ActionIcon>
                        </Flex>
                      </td>
                      <td>
                        <Flex gap={8} align="center">
                          <DotBadge color="green" />
                          Authorized
                        </Flex>
                      </td>
                      <td>
                        <Flex gap={8} align="center">
                          <Box
                            sx={{ boxShadow: "rgb(221, 221, 221) 0px 0px 4px" }}
                            component={Image}
                            src="https://erp.ginee.com/erp/webpack/assets/id-f624e2c8444a7794b357..svg"
                            alt="Indonesian Flag"
                            width="16"
                            height={"12"}
                          />
                          Indonesia
                        </Flex>
                      </td>
                      <td>25-03-2023 09:40</td>
                      <td>359 day</td>
                      <td>
                        <Flex direction={"column"} gap={4} align="start">
                          <Button size="xs" color="violet" variant={"subtle"}>
                            Pull Data
                          </Button>
                          <Button size="xs" color="violet" variant={"subtle"}>
                            Delete Store
                          </Button>
                        </Flex>
                      </td>
                    </tr>
                  </tbody> */}
                </Table>
                {/* If no data render TableNoData here */}
                <TableNoData />
                <LoadingOverlay visible={isLoading} />
              </Box>
            </Box>
          </Flex>
          <Flex
            justify={"right"}
            align="center"
            gap={8}
            sx={({ colors }) => ({
              backgroundColor: "white",
              padding: "12px 16px",
              position: "fixed",
              bottom: "0px",
              left: "0px",
              width: "100%",
              borderTop: `1px solid ${colors.gray[3]}`,
            })}
          >
            <Text
              sx={({ colors }) => ({
                fontSize: "12px",
                color: colors.gray[7],
              })}
            >
              Total 1
            </Text>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronLeft />
            </ActionIcon>
            <ActionIcon
              variant={"outline"}
              color="violet"
              sx={{ fontSize: "12px" }}
            >
              1
            </ActionIcon>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronRight />
            </ActionIcon>
            <Select
              data={["10 / page", "20 / page", "50 / page", "100 / page"]}
              defaultValue={"10 / page"}
              size="xs"
              w={100}
            />
          </Flex>
        </Tabs.Panel>
        <Tabs.Panel value="custom-shop">
          <Flex direction={"column"} gap={16} p={16}>
            <Box pos={"relative"} sx={{ backgroundColor: "white" }}>
              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <Table
                  sx={{
                    width: "100%",
                    minWidth: "1280px",
                    borderBottom: "1px solid #eee",
                  }}
                  highlightOnHover
                >
                  <Box
                    component="thead"
                    sx={({ colors }) => ({ backgroundColor: colors.gray[1] })}
                  >
                    <tr>
                      <TH label="Store Name" />
                      <TH label="Country/Region" />
                      <TH label="Create Time" />
                      <TH label="Action" />
                    </tr>
                  </Box>
                </Table>
                {/* If no data render TableNoData here */}
                <TableNoData />
                <LoadingOverlay visible={isLoading} />
              </Box>
            </Box>
          </Flex>
          <Flex
            justify={"right"}
            align="center"
            gap={8}
            sx={({ colors }) => ({
              backgroundColor: "white",
              padding: "12px 16px",
              position: "fixed",
              bottom: "0px",
              left: "0px",
              width: "100%",
              borderTop: `1px solid ${colors.gray[3]}`,
            })}
          >
            <Text
              sx={({ colors }) => ({
                fontSize: "12px",
                color: colors.gray[7],
              })}
            >
              Total 1
            </Text>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronLeft />
            </ActionIcon>
            <ActionIcon
              variant={"outline"}
              color="violet"
              sx={{ fontSize: "12px" }}
            >
              1
            </ActionIcon>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronRight />
            </ActionIcon>
            <Select
              data={["10 / page", "20 / page", "50 / page", "100 / page"]}
              defaultValue={"10 / page"}
              size="xs"
              w={100}
            />
          </Flex>
        </Tabs.Panel>
        <Tabs.Panel value="fulfillment">
          <Flex direction={"column"} gap={16} p={16}>
            <Box pos={"relative"} sx={{ backgroundColor: "white" }}>
              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <Table
                  sx={{
                    width: "100%",
                    minWidth: "1280px",
                    borderBottom: "1px solid #eee",
                  }}
                  highlightOnHover
                >
                  <Box
                    component="thead"
                    sx={({ colors }) => ({ backgroundColor: colors.gray[1] })}
                  >
                    <tr>
                      <TH label="Authorization Info" />
                      <TH label="Service Provider" />
                      <TH label="Authorization Status" />
                      <TH label="Authorization Time" />
                      <TH label="Action" />
                    </tr>
                  </Box>
                </Table>
                {/* If no data render TableNoData here */}
                <TableNoData />
                <LoadingOverlay visible={isLoading} />
              </Box>
            </Box>
          </Flex>
          <Flex
            justify={"right"}
            align="center"
            gap={8}
            sx={({ colors }) => ({
              backgroundColor: "white",
              padding: "12px 16px",
              position: "fixed",
              bottom: "0px",
              left: "0px",
              width: "100%",
              borderTop: `1px solid ${colors.gray[3]}`,
            })}
          >
            <Text
              sx={({ colors }) => ({
                fontSize: "12px",
                color: colors.gray[7],
              })}
            >
              Total 1
            </Text>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronLeft />
            </ActionIcon>
            <ActionIcon
              variant={"outline"}
              color="violet"
              sx={{ fontSize: "12px" }}
            >
              1
            </ActionIcon>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronRight />
            </ActionIcon>
            <Select
              data={["10 / page", "20 / page", "50 / page", "100 / page"]}
              defaultValue={"10 / page"}
              size="xs"
              w={100}
            />
          </Flex>
        </Tabs.Panel>
        <Tabs.Panel value="accounting">
          <Flex direction={"column"} gap={16} p={16}>
            <Box pos={"relative"} sx={{ backgroundColor: "white" }}>
              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <Table
                  sx={{
                    width: "100%",
                    minWidth: "1280px",
                    borderBottom: "1px solid #eee",
                  }}
                  highlightOnHover
                >
                  <Box
                    component="thead"
                    sx={({ colors }) => ({ backgroundColor: colors.gray[1] })}
                  >
                    <tr>
                      <TH label="Account Name" />
                      <TH label="Service Provider" />
                      <TH label="Authorization Status" />
                      <TH label="Authorization Time" />
                      <TH label="Authorizer" />
                      <TH label="Action" />
                    </tr>
                  </Box>
                </Table>
                {/* If no data render TableNoData here */}
                <TableNoData />
                <LoadingOverlay visible={isLoading} />
              </Box>
            </Box>
          </Flex>
          <Flex
            justify={"right"}
            align="center"
            gap={8}
            sx={({ colors }) => ({
              backgroundColor: "white",
              padding: "12px 16px",
              position: "fixed",
              bottom: "0px",
              left: "0px",
              width: "100%",
              borderTop: `1px solid ${colors.gray[3]}`,
            })}
          >
            <Text
              sx={({ colors }) => ({
                fontSize: "12px",
                color: colors.gray[7],
              })}
            >
              Total 1
            </Text>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronLeft />
            </ActionIcon>
            <ActionIcon
              variant={"outline"}
              color="violet"
              sx={{ fontSize: "12px" }}
            >
              1
            </ActionIcon>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronRight />
            </ActionIcon>
            <Select
              data={["10 / page", "20 / page", "50 / page", "100 / page"]}
              defaultValue={"10 / page"}
              size="xs"
              w={100}
            />
          </Flex>
        </Tabs.Panel>
        <Tabs.Panel value="logistic-services">
          <Flex direction={"column"} gap={16} p={16}>
            <Box pos={"relative"} sx={{ backgroundColor: "white" }}>
              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <Table
                  sx={{
                    width: "100%",
                    minWidth: "1280px",
                    borderBottom: "1px solid #eee",
                  }}
                  highlightOnHover
                >
                  <Box
                    component="thead"
                    sx={({ colors }) => ({ backgroundColor: colors.gray[1] })}
                  >
                    <tr>
                      <TH label="Authorization Info" />
                      <TH label="Service Provider" />
                      <TH label="Country / Region" />
                      <TH label="Authorization Status" />
                      <TH label="Authorization Time" />
                      <TH label="Authorizer" />
                      <TH label="Action" />
                    </tr>
                  </Box>
                </Table>
                {/* If no data render TableNoData here */}
                <TableNoData />
                <LoadingOverlay visible={isLoading} />
              </Box>
            </Box>
          </Flex>
          <Flex
            justify={"right"}
            align="center"
            gap={8}
            sx={({ colors }) => ({
              backgroundColor: "white",
              padding: "12px 16px",
              position: "fixed",
              bottom: "0px",
              left: "0px",
              width: "100%",
              borderTop: `1px solid ${colors.gray[3]}`,
            })}
          >
            <Text
              sx={({ colors }) => ({
                fontSize: "12px",
                color: colors.gray[7],
              })}
            >
              Total 1
            </Text>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronLeft />
            </ActionIcon>
            <ActionIcon
              variant={"outline"}
              color="violet"
              sx={{ fontSize: "12px" }}
            >
              1
            </ActionIcon>
            <ActionIcon variant={"outline"} color="violet" disabled>
              <FiChevronRight />
            </ActionIcon>
            <Select
              data={["10 / page", "20 / page", "50 / page", "100 / page"]}
              defaultValue={"10 / page"}
              size="xs"
              w={100}
            />
          </Flex>
        </Tabs.Panel>
      </Tabs>
    </MainLayout>
  )
}

export default IntegrationStoreListPage
