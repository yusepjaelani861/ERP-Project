import {
  Accordion,
  Anchor,
  Box,
  Button,
  Checkbox,
  FileInput,
  Flex,
  MultiSelect,
  NumberInput,
  Radio,
  ScrollArea,
  Select,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import InfoTooltip from "components/atoms/InfoTooltip";
import MainLayout from "components/layouts/MainLayout";
import InputGroup from "components/molecules/InputGroup";
import Label from "components/molecules/Label";
import SelectItemWithImage from "components/molecules/SelectItemWithImage";
import { UserLogin } from "interfaces/user";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FiRefreshCw } from "react-icons/fi";
import authMiddleware from "utils/authMiddleware";

interface PageProps {
  user: UserLogin;
  slug: string;
}

const AddMasterProductPage = ({ user }: PageProps) => {
  const [onSaleShop, setOnSaleShop] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [variantStatus, setVariantStatus] = useState(false);
  const [variantOptions, setVariantOptions] = useState([]);
  const [errorMessage, setErrorMessages] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  return (
    <MainLayout title="Products / Shopee / Add Product" user={user}>
      <Box p={16} mb={50}>
        <Flex
          direction={"column"}
          gap={16}
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
          <Accordion variant="separated" defaultValue={"basic-information"}>
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
                  <TextInput
                    placeholder="Please Enter"
                    label={
                      <Label
                        withAsterisk
                        label="Master Product Name"
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
                    onChange={(e) => setProductName(e.target.value.trimStart())}
                    size="xs"
                  />
                  <TextInput
                    placeholder="Please Enter"
                    label={<Label withAsterisk label="SPU" info="" />}
                    maxLength={255}
                    rightSection={
                      <Text
                        sx={({ colors }) => ({
                          fontSize: "12px",
                          color: colors.gray[6],
                        })}
                      >
                        {productName.length}/200
                      </Text>
                    }
                    rightSectionWidth={64}
                    value={productName}
                    onChange={(e) => setProductName(e.target.value.trimStart())}
                    size="xs"
                  />
                  <Select
                    data={[
                      "Beauty",
                      "Women Bags",
                      "Men Bags",
                      "Hobbies & Collections",
                      "Women Clothes",
                      "Home & Living",
                      "Sports & Outdoors",
                      "Mom & Baby",
                      "Watches",
                      "Books & Magazine",
                      "Muslim Fashion",
                      "Audio",
                      "Fashion Accessories",
                      "Pets",
                      "Home Appliances",
                      "Health",
                      "Gaming & Consoles",
                      "Ticket, Vouchers & Services",
                      "Baby & Kids Fashion",
                      "Automobiles",
                      "Women Shoes",
                      "Men Clothes",
                      "Cameras & Drones",
                      "Mobile & Gadgets",
                      "Travel & Luggage",
                      "Stationery",
                      "Food & Beverage",
                      "Men Shoes",
                      "Motorcycles",
                      "Computer & Accessories",
                    ]}
                    placeholder="Select Master Category"
                    label={
                      <Label
                        label="Select Master Category"
                        info=""
                        withAsterisk
                      />
                    }
                    size="xs"
                    searchable
                  />
                  <Select
                    data={[
                      "Selling",
                      "Hot Sale",
                      "New Product",
                      "Clearance",
                      "Discontinued",
                    ]}
                    placeholder="Channel Selling Status"
                    label={
                      <Label
                        label="Channel Selling Status"
                        info=""
                        withAsterisk
                      />
                    }
                    size="xs"
                    searchable
                  />
                  <Textarea
                    placeholder="Description"
                    size="xs"
                    cols={4}
                    label={
                      <Label
                        label="Description"
                        withAsterisk
                        info="Limit the maximum range according to API requirement"
                      />
                    }
                    minRows={4}
                  />
                  <TextInput
                    placeholder="1"
                    label={
                      <Label label="Minimum purchase quantity" withAsterisk />
                    }
                    size="xs"
                    type="number"
                  />
                  <Select
                    label={<Label label="Condition" />}
                    data={["New", "Used"]}
                    defaultValue={"New"}
                    size="xs"
                  />
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <Accordion variant="separated" defaultValue={"product-info"}>
            <Accordion.Item value="product-info">
              <Accordion.Control>Product Information</Accordion.Control>
              <Accordion.Panel>
                <Flex direction={"column"} gap={16}>
                  <Checkbox
                    onChange={(e) => {
                      setVariantStatus(e.currentTarget.checked);
                    }}
                    size="xs"
                    label={
                      <Text component="p">
                        The product has variations, if your product has
                        different colors and sizes variations, please choose
                        this{" "}
                        <Text
                          component="span"
                          sx={({ colors }) => ({
                            color: colors.orange[5],
                          })}
                        >
                          Price and stock will be updated to the default
                          warehouse
                        </Text>
                      </Text>
                    }
                  />

                  {variantStatus ? (
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
                      <TextInput
                        placeholder="Enter the name of variation, for example: color, size, etc."
                        label={<Label label="Variation Name" withAsterisk />}
                        size="xs"
                      />
                      {/* select multiple custom input */}
                      <Select
                        data={[]}
                        placeholder="Select Variation"
                        label={<Label label="Variation" withAsterisk />}
                        size="xs"
                        searchable
                        multiple
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (variantOptions.includes(e.target.value)) {
                              return;
                            }
                            setVariantOptions([
                              ...variantOptions,
                              e.target.value,
                            ]);
                            e.target.value = "";
                          }
                        }}
                      />
                    </Flex>
                  ) : (
                    <></>
                  )}
                  <ScrollArea pb={8}>
                    <Table miw={800}>
                      <Box
                        component="thead"
                        sx={({ colors }) => ({
                          backgroundColor: colors.gray[2],
                          borderBottom: "none",
                          "& th": {
                            padding: "12px !important",
                          },
                        })}
                      >
                        <tr>
                          <th>Variant Name</th>
                          <th>
                            <Text
                              component="span"
                              sx={({ colors }) => ({
                                color: colors.red[5],
                                marginRight: "4px",
                              })}
                            >
                              *
                            </Text>
                            Price
                            <Anchor
                              sx={{ fontSize: "12px", marginLeft: "6px" }}
                            >
                              Mass Edit
                            </Anchor>
                          </th>
                          <th>
                            <Text
                              component="span"
                              sx={({ colors }) => ({
                                color: colors.red[5],
                                marginRight: "4px",
                              })}
                            >
                              *
                            </Text>
                            Price
                            <Anchor
                              sx={{ fontSize: "12px", marginLeft: "6px" }}
                            >
                              Stock
                            </Anchor>
                          </th>
                          <th></th>
                        </tr>
                      </Box>
                      <tbody>
                        {variantOptions.length > 0 ? (
                          variantOptions.map((variant) => (
                            <tr key={variant}>
                              <td>{variant}</td>
                              <td>
                                <InputGroup
                                  sx={{
                                    "& > :last-child": {
                                      flexGrow: 1,
                                    },
                                  }}
                                >
                                  <Select
                                    data={["Rp"]}
                                    defaultValue="Rp"
                                    size="xs"
                                    w={75}
                                  />
                                  <NumberInput
                                    placeholder="Plase Enter"
                                    size="xs"
                                  />
                                </InputGroup>
                              </td>
                              <td>
                                <NumberInput
                                  placeholder="Please Enter"
                                  size="xs"
                                />
                              </td>
                              <td>
                                <Button
                                  variant={"subtle"}
                                  color="red"
                                  size="xs"
                                  onClick={() => {
                                    setVariantOptions(
                                      variantOptions.filter(
                                        (item) => item !== variant
                                      )
                                    );
                                  }}
                                >
                                  <AiOutlineDelete />
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <>
                            <tr>
                              <td>-</td>
                              <td>
                                <InputGroup
                                  sx={{
                                    "& > :last-child": {
                                      flexGrow: 1,
                                    },
                                  }}
                                >
                                  <Select
                                    data={["Rp"]}
                                    defaultValue="Rp"
                                    size="xs"
                                    w={75}
                                  />
                                  <NumberInput
                                    placeholder="Plase Enter"
                                    size="xs"
                                  />
                                </InputGroup>
                              </td>
                              <td>
                                <NumberInput
                                  placeholder="Please Enter"
                                  size="xs"
                                />
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </Table>
                  </ScrollArea>
                  {/* <Flex direction={"column"} gap={8}>
                    <Text>Wholesale Price</Text>
                    <Button
                      variant={"subtle"}
                      color="violet"
                      size="xs"
                      leftIcon={<AiOutlinePlus />}
                      w="fit-content"
                    >
                      Add Wholesale Price
                    </Button>
                  </Flex> */}
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <Accordion variant="separated" defaultValue={"media-settings"}>
            <Accordion.Item value="media-settings">
              <Accordion.Control>Media Settings</Accordion.Control>
              <Accordion.Panel>
                <Flex direction={"column"} gap={16}>
                  <FileInput
                    label={
                      <>
                        <Label
                          label="Product Image Max.9"
                          info="API limitation, the maximum size is 4MB, and the resolution must be more than 300*300px"
                          withAsterisk
                          sx={{
                            fontSize: "12px",
                          }}
                        />
                      </>
                    }
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      console.log(e);
                      setFiles(e);
                    }}
                  />
                  <Flex
                    sx={{
                      flexWrap: "wrap",
                      gap: "16px",
                    }}
                  >
                    {files.length > 0 &&
                      files.map((file) => (
                        <>
                          <Flex
                            w={100}
                            h={100}
                            sx={({ colors }) => ({
                              border: `dashed 1px ${colors.gray[5]}`,
                              borderRadius: "4px",
                              cursor: "pointer",
                              transition: "all .3s",
                              "&:hover": {
                                borderColor: colors.violet[6],
                              },
                              fontSize: "20px",
                              color: colors.gray[6],
                              backgroundColor: colors.gray[0],
                            })}
                            justify="center"
                            align={"center"}
                          >
                            {/* <AiOutlinePlus /> */}
                            <>
                              <img
                                src={URL.createObjectURL(file)}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            </>
                          </Flex>
                        </>
                      ))}
                  </Flex>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <Accordion variant="separated" defaultValue={"delivery"}>
            <Accordion.Item value="delivery">
              <Accordion.Control>Delivery</Accordion.Control>
              <Accordion.Panel>
                <Flex direction={"column"} gap={16}>
                  {onSaleShop.length > 0 ? (
                    <>
                      <Text sx={({ colors }) => ({ fontSize: "12px" })}>
                        Package Size
                      </Text>
                      <Flex wrap={"wrap"} gap={16}>
                        <InputGroup>
                          <TextInput
                            label={
                              <Label
                                label="Length"
                                info="API requires to this information to be filled in"
                              />
                            }
                            placeholder="Length Should be between 1-999,999!"
                            size="xs"
                          />
                          <Select
                            data={["cm"]}
                            defaultValue="cm"
                            w={80}
                            size="xs"
                          />
                        </InputGroup>
                        <InputGroup>
                          <TextInput
                            label={
                              <Label
                                label="Width"
                                info="API requires to this information to be filled in"
                              />
                            }
                            placeholder="Width Should be between 1-999,999!"
                            size="xs"
                          />
                          <Select
                            data={["cm"]}
                            defaultValue="cm"
                            w={80}
                            size="xs"
                          />
                        </InputGroup>
                        <InputGroup>
                          <TextInput
                            label={
                              <Label
                                label="Height"
                                info="API requires to this information to be filled in"
                              />
                            }
                            placeholder="Height Should be between 1-999,999!"
                            size="xs"
                          />
                          <Select
                            data={["cm"]}
                            defaultValue="cm"
                            w={80}
                            size="xs"
                          />
                        </InputGroup>
                        <InputGroup>
                          <TextInput
                            label={<Label label="Weight" withAsterisk />}
                            placeholder="Weight Should be between 1-5000,000!"
                            size="xs"
                          />
                          <Select
                            data={["g"]}
                            defaultValue="g"
                            w={80}
                            size="xs"
                          />
                        </InputGroup>
                      </Flex>
                      <Box
                        p={16}
                        sx={({ colors }) => ({
                          border: `1px solid ${colors.gray[5]}`,
                          borderRadius: "4px",
                        })}
                      >
                        <Flex direction={"column"} gap={8}>
                          <Flex align={"center"} gap={4}>
                            <Label
                              label="Logistic (yusepj8601)"
                              withAsterisk
                              sx={{ fontSize: "12px", marginBottom: "0px" }}
                            />
                            <Button
                              size={"xs"}
                              variant="subtle"
                              color="violet"
                              leftIcon={<FiRefreshCw />}
                            >
                              Sync
                            </Button>
                            <Checkbox size="xs" />
                          </Flex>
                          <Checkbox size="xs" label={"Regular Cashless"} />
                          <Checkbox size="xs" label={"Hemat"} />
                        </Flex>
                      </Box>
                      <TextInput label="SPU" size="xs" maw={350} />
                    </>
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
        </Flex>
      </Box>
      <Flex
        justify={"center"}
        align="center"
        gap={6}
        sx={({ colors }) => ({
          backgroundColor: "white",
          padding: "8px",
          position: "fixed",
          bottom: "0px",
          left: "0px",
          width: "100%",
          borderTop: `1px solid ${colors.gray[3]}`,
        })}
      >
        <Button variant={"default"} size="xs">
          Cancel
        </Button>
        <Button variant={"filled"} color="violet" size="xs">
          Save as draft
        </Button>
        <Button
          variant={"filled"}
          color="violet"
          size="xs"
          onClick={() => {
            setErrorMessages("Something went wrong, please try again later");

            setTimeout(() => {
              setErrorMessages("");
            }, 3000);
          }}
        >
          Publish
        </Button>
        {errorMessage && (
          <Text
            sx={({ colors }) => ({
              color: colors.red[6],
              fontSize: "12px",
            })}
          >
            {errorMessage}
          </Text>
        )}
      </Flex>
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

export default AddMasterProductPage;
