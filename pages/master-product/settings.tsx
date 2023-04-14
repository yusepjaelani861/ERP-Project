import { ActionIcon, Alert, Box, Flex, Tabs, Text } from "@mantine/core";
import MainLayout from "components/layouts/MainLayout";
import SettingInfo from "components/molecules/SettingInfo";
import { UserLogin } from "interfaces/user";
import { GetServerSidePropsContext } from "next";
import { AiOutlineEdit } from "react-icons/ai";
import authMiddleware from "utils/authMiddleware";

interface PageProps {
  user: UserLogin;
}

const ProductSettings = ({ user }: PageProps) => {
  return (
    <MainLayout title="Master Product Settings" user={user}>
      <Box px={32} py={10} sx={{ backgroundColor: "white" }}>
        <Tabs defaultValue={"master-product-settings"}>
          <Tabs.List
            sx={{
              borderBottom: "1px solid #ddd",
              marginBottom: "16px",
              "& .mantine-Tabs-tab": {
                fontSize: "12px",
                paddingBottom: 20,
                paddingTop: 20,
              },
            }}
          >
            <Tabs.Tab value="master-product-settings">
              Master Product Settings
            </Tabs.Tab>
            <Tabs.Tab value="add-product-setting">Add Product Setting</Tabs.Tab>
            <Tabs.Tab value="clone-settings">Clone Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="master-product-settings">
            <Flex direction={"column"} gap={16}>
              <SettingInfo
                title="Automatically bind the Master SKU"
                description="After enabling the setting, if the Store SKU has the same name as the Master SKU, it will be automatically bound, and it also supports custom automatic binding rules. It is only valid for channel products that are synchronized to Ginee and are not bound to the Master SKU."
                color={"violet"}
              />
              <SettingInfo
                title="Automatically create Master SKU"
                description="For channel products that are not bound to the master SKU, if the store SKU of the product has the same name as a master SKU, the product will be bound to this master SKU, otherwise a new master SKU is automatically created"
                color={"yellow"}
              />
              <SettingInfo
                title="Warehouse products are automatically bound to Master SKU"
                description="After set the automatic bind Master SKU and set the warehouse in warehouse dimension, products from third warehouse that synchronize from WMS will automatically binding with Master SKU"
                color={"violet"}
              >
                <Flex gap={4} align="center">
                  <Text
                    sx={({ colors }) => ({
                      fontSize: "12px",
                      color: colors.gray[7],
                    })}
                  >
                    Activate Range :{" "}
                  </Text>
                  <ActionIcon color="violet">
                    <AiOutlineEdit />
                  </ActionIcon>
                </Flex>
              </SettingInfo>
              <SettingInfo
                title="Automatically create master SKU for warehouse items"
                description="After set the automatic create Master SKU and set the warehouse in warehouse dimension, products from third warehouse that synchronize from WMS will automatically create Master SKU"
                color={"yellow"}
              >
                <Flex gap={4} align="center">
                  <Text
                    sx={({ colors }) => ({
                      fontSize: "12px",
                      color: colors.gray[7],
                    })}
                  >
                    Activate Range :{" "}
                  </Text>
                  <ActionIcon color="violet">
                    <AiOutlineEdit />
                  </ActionIcon>
                </Flex>
              </SettingInfo>
            </Flex>
          </Tabs.Panel>
          <Tabs.Panel value="add-product-setting">
            <SettingInfo
              title="Logistic template setting"
              description="According to your settings, Ginee will automatically select the logistics options for you if the logistics options are empty when adding Shopee products, to improve the efficiency of adding products"
              color={"violet"}
            />
          </Tabs.Panel>
          <Tabs.Panel value="clone-settings">
            <Flex direction={"column"} gap={16}>
              <SettingInfo
                title="Automatic interception settings"
                description="For draft products created by Copy Listing, if the name, description, image (product or specification image) exceeds the upper limit or contains illegal characters, the system will cut off or clear it for you"
                color={"violet"}
              />
              <SettingInfo
                title="Category mapping"
                description="According to your settings, you can automatically map categories when generating products through cloning to improve the efficiency of your product release."
                color={"yellow"}
              />
            </Flex>
          </Tabs.Panel>
        </Tabs>
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
    },
  };
};

export default ProductSettings;
