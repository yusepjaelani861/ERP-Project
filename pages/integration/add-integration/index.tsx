import { Box, Flex, Grid } from "@mantine/core";
import MainLayout from "components/layouts/MainLayout";
import integrationChannelList from "data/integrationChannelList";
import { UserLogin } from "interfaces/user";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import authMiddleware from "utils/authMiddleware";

interface PageProps {
  user: UserLogin;
}
const addIntegration = ({ user }: PageProps) => {
  return (
    <MainLayout title="Add Integration" user={user}>
      <Flex direction={"column"} p={16} gap={16}>
        <Box>
          <h1>Add Integration</h1>
          <Grid>
            {integrationChannelList.map((item, index) => (
              <Grid.Col key={index} span={12} md={2} sm={4} xs={6}>
                <Link
                  href="/integration/add-integration/[slug]"
                  as={`/integration/add-integration/${item.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    mb={8}
                    style={{
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      style={{
                        textAlign: "center",
                        padding: "8px 8px",
                      }}
                    >
                      <Image
                        src={item.image}
                        width={40}
                        height={40}
                        alt={item.value}
                      />
                    </Box>
                    <Box
                      style={{
                        marginTop: "16px",
                        background: "#F5F5F5",
                        textAlign: "center",
                        color: "#000",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {item.value}
                      </p>
                    </Box>
                  </Box>
                </Link>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
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

export default addIntegration;
