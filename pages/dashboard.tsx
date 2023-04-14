import { Flex } from "@mantine/core";
import MainLayout from "components/layouts/MainLayout";
import { UserLogin } from "interfaces/user";
import { GetServerSidePropsContext } from "next";
import authMiddleware from "utils/authMiddleware";
import axiosService from "utils/axiosService";

interface PageProps {
  user: UserLogin;
}

const DashboardPage = ({ user }: PageProps) => {
  return (
    <MainLayout title="Dashboard" user={user}>
      <Flex direction={"column"} p={16} gap={16}>
        <h1>Dashboard</h1>
        <h2>{user.user.name}</h2>
      </Flex>
    </MainLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const auth = await authMiddleware(context);
  if (!auth.status) {
    // redirect login``
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

export default DashboardPage;
