import { Box, Button, Flex, Grid, TextInput } from "@mantine/core";
import MainLayout from "components/layouts/MainLayout";
import integrationChannelList from "data/integrationChannelList";
import { UserLogin } from "interfaces/user";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import authMiddleware from "utils/authMiddleware";

interface PageProps {
  user: UserLogin;
  slug: string;
}
const IntegrationBySlug = ({ slug, user }: PageProps) => {
  const [channel, setChannel] = useState({
    value: "",
    label: "",
    image: "",
    slug: "",
  });

  useEffect(() => {
    const item = integrationChannelList.find((item) => item.slug === slug);
    if (item) {
      setChannel(item);
    }
  }, [slug]);
  return (
    <MainLayout title={`Integration ${channel.value}`} user={user}>
      <Flex
        direction={"column"}
        p={16}
        gap={16}
        align={"center"}
        style={{
          background: "#fff",
          maxWidth: "600px",
          margin: "0 auto",
          borderRadius: "8px",
          height: "100vh",
        }}
      >
        <Grid
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            justifyContent: "space-between",
            padding: "16px 0",
            height: "100%",
            maxHeight: "100px",
          }}
          mb={16}
          align="center"
        >
          <Grid.Col span={12} md={2} sm={4} xs={6}>
            <div
              style={{
                backgroundImage: `url(${channel.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "50px",
                borderRadius: "8px",
              }}
            ></div>
          </Grid.Col>
          <Grid.Col span={12} md={2} sm={4} xs={6}>
            <div
              style={{
                backgroundImage: `url(${channel.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "50px",
                borderRadius: "8px",
              }}
            ></div>
          </Grid.Col>
          <Grid.Col span={12} md={2} sm={4} xs={6}>
            <div
              style={{
                backgroundImage: `url(${channel.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "50px",
                borderRadius: "8px",
              }}
            ></div>
          </Grid.Col>
        </Grid>
        <Box
          style={{
            color: "#6020ff",
            backgroundColor: "#e8eafe",
            borderRadius: "8px",
            padding: "16px 32px",
            gap: "16px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          <p>Authorization Step Description</p>
          <p>
            1. Click the [Authorize] button, and you will receive a confirmation
            email from Tokopedia
          </p>
          <p>
            2. Click the [Accept] button in the official email sent by Tokopedie
            to confirm the authorization
          </p>
          <p>
            3. Click the [Confirm Authorization] button in [Integration-Store
            List] to complete the authorization
          </p>
        </Box>
        {slug === "tokopedia" && (
            <Flex
            style={{
              width: "100%",
            }}
            gap={16}
            align={"center"}
            direction={"column"}
          >
            <TextInput
              label="Store Name"
              placeholder="Shop Name"
              rightSection={
                <Box sx={({ colors }) => ({ color: colors.gray[5] })} />
              }
              w={"100%"}
            required
            />
            <TextInput
              label="Shop Domain"
              placeholder="my-shop"
              rightSection={
                <Box sx={({ colors }) => ({ color: colors.gray[5] })} />
              }
              w={"100%"}
              required
            />
          </Flex>
        )}

        <Box
          style={{
            color: "#606c80",
            backgroundColor: "#f5f7fa",
            borderRadius: "8px",
            padding: "16px 32px",
            gap: "16px",
            fontSize: "12px",
            fontWeight: "500",
          }}
          w={"100%"}
        >
          <p>Domain example</p>
          <p>
            Fill in the information after the store front URL .com/ into the
            Shop Domain field
          </p>
          <p>
            https://www.tokopedia.com/<strong>Viplove</strong>
          </p>
        </Box>
        <Flex
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            justifyContent: "center",
            padding: "8px 8px",
            backgroundColor: "#fff",
            borderRadius: "8px 8px 0 0",
            maxWidth: "600px",
          }}
          gap={16}
          align={"center"}
          direction={"column"}
        >
          <Button
            variant="outline"
            style={{
              width: "100%",
              height: "48px",
              maxWidth: "600px",
              borderRadius: "8px",
              padding: "16px 0",
              color: "#fff",
              backgroundColor: "#6020ff",
            }}
          >
            Authorize
          </Button>
        </Flex>
      </Flex>
    </MainLayout>
  );
};

export default IntegrationBySlug;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const auth = await authMiddleware(context);
  if (!auth.status) {
    // redirect login
    return {
      redirect: auth.redirect,
    };
  }

  return {
    props: {
      user: auth.props?.user,
      slug: context.params?.slug,
    },
  };
};
