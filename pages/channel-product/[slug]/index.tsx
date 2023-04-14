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
  TextInput,
} from "@mantine/core";
import MainLayout from "components/layouts/MainLayout";
import FilterItem from "components/molecules/FilterItem";
import SelectItemWithImage from "components/molecules/SelectItemWithImage";
import TH from "components/molecules/TH";
import TableNoData from "components/organisms/TableNoData";
import { UserLogin } from "interfaces/user";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  AiFillCaretDown,
  AiFillInfoCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  FiAlertCircle,
  FiFilter,
  FiPlus,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";
import { ImFire, ImSad2 } from "react-icons/im";
import { MdNewReleases } from "react-icons/md";
import { useUpdateEffect } from "usehooks-ts";
import authMiddleware from "utils/authMiddleware";

interface PageProps {
  user: UserLogin;
  slug: string;
}

const ShopeeProductPage = ({ user, slug }: PageProps) => {
  const [filter, setFilter] = useState("Product Name");
  const [keyword, setKeyword] = useState("");
  const [MSKUBindingStatus, setMSKUBindingStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  const resetFilterHandler = useCallback(() => {
    setFilter("Product Name");
    setKeyword("");
    setMSKUBindingStatus("");
    setSortBy("");
  }, []);

  const [activeTab, setActiveTab] = useState("live");
  const [isLoading, setIsLoading] = useState(false);

  /** Simulation */
  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  useUpdateEffect(() => {
    fetchData();
  }, [activeTab]);
  return (
    <MainLayout title="Products / Shopee" sx={{ padding: 0 }} user={user}>
      <Flex
        sx={{
          background: "white",
          padding: "24px",
        }}
        align="center"
        gap={32}
      >
        <Flex gap={12} align="center">
          <Text
            sx={({ colors }) => ({ color: colors.gray[8], fontSize: "12px" })}
          >
            Store :
          </Text>
          <Checkbox label="All" size={"xs"} defaultChecked />
        </Flex>
        <Checkbox label="yusepj8601" size={"xs"} defaultChecked />
      </Flex>
      <Flex direction={"column"} p={16} gap={16}>
        <Flex justify={"space-between"} align="center">
          <Flex wrap="wrap" align={"center"} gap={12}>
            <Flex wrap="wrap">
              <Select
                data={["Product Name", "Channel SKU", "SPU"]}
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
              size={"xs"}
              placeholder={"MSKU Binding Status"}
              data={["All", "Bind Master SKU", "Unbind Master SKU"]}
              clearable
              value={MSKUBindingStatus}
              onChange={(value) => setMSKUBindingStatus(value!)}
            />
            <Select
              size={"xs"}
              placeholder={"Sort by"}
              data={[
                "Create Time Newest To Oldest",
                "Create Time Oldest To Newest",
                "Update Time Newest To Oldest",
                "Update Time Oldest To Newest",
                "Most Stock",
                "Least Stock",
              ]}
              clearable
              value={sortBy}
              onChange={(value) => setSortBy(value!)}
            />
            <Button variant={"filled"} color={"violet"} size="xs">
              Search
            </Button>
            <Button variant={"default"} size="xs" leftIcon={<FiFilter />}>
              Filter
            </Button>
          </Flex>
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
          {MSKUBindingStatus && (
            <FilterItem
              label="MSKU Binding Status"
              value={MSKUBindingStatus}
              dismissible
              onDismiss={() => setMSKUBindingStatus("")}
            />
          )}
          {sortBy && (
            <FilterItem
              label="Sort by"
              value={sortBy}
              dismissible
              onDismiss={() => setSortBy("")}
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
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: 6,
        }}
      >
        <Flex
          justify={"space-between"}
          align="center"
          gap={8}
          px={16}
          sx={{ backgroundColor: "white" }}
        >
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
              <Tabs.Tab value="live">
                Live <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="disabled">
                Disabled <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="sold-out">
                Sold Out <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="banned">
                Banned <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="draft">
                Draft <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="in-process">
                In Process <Badge>0</Badge>
              </Tabs.Tab>
              <Tabs.Tab value="publish-failed">
                Publish Failed <Badge>0</Badge>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Flex gap={8}>
            <Button variant={"default"} size={"xs"}>
              Operation Log
            </Button>
            <Link href="/channel-product/shopee/add-product">
              <Button
                variant={"filled"}
                color="violet"
                size={"xs"}
                leftIcon={<AiOutlinePlus />}
              >
                Add Product
              </Button>
            </Link>
            <Button variant={"filled"} color="violet" size={"xs"}>
              Edit Images In Batches
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Box pos={"relative"} sx={{ backgroundColor: "white" }}>
        <Box sx={{ width: "100%", overflowX: "auto" }}>
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
                <TH label="SPU" />
                <TH label="Variation" />
                <TH label="Channel SKU" />
                <TH label="MSKU" />
                <TH label="Price" />
                <TH label="Stock" />
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
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const auth = await authMiddleware(context);
  if (!auth.status) {
    return {
      redirect: auth.redirect,
    };
  }

  return {
    props: {
      user: auth.props?.user,
      slug: context.params?.slug
    },
  };
};

export default ShopeeProductPage;
