import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Header as MantineHeader,
  Menu,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { UserLogin } from "interfaces/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsList, BsPersonFill, BsQuestionCircleFill } from "react-icons/bs";
import { FiChevronDown, FiRefreshCw, FiUser } from "react-icons/fi";
import useNavbarExpand from "store/navbarExpand";
interface Props {
  title: string;
  user: UserLogin;
}
const Header: React.FC<Props> = ({ title, user }) => {
  const { toggleExpand, expanded } = useNavbarExpand();
  const lgScreen = useMediaQuery("(min-width: 1024px)");
  const tabletScreen = useMediaQuery("(min-width: 768px)");

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      window.location.href = "/auth/login";
    } else {
      console.log("error");
    }
  };

  return (
    <MantineHeader height={60} p={"xs"}>
      <Flex
        // gap={expanded ? 100 : 8}
        gap={{ base: 8, xs: expanded ? 100 : 8 }}
      >
        {expanded ? (
          <Image
            // src="/assets/logo-ginee-erp.svg"
            src="/assets/logo-o2o.png"
            alt="logo"
            width={130}
            height={37}
          />
        ) : (
          <Image src="/assets/logo-3.svg" alt="logo" width={36} height={36} />
        )}
        <Flex
          justify={"space-between"}
          align="center"
          gap={8}
          sx={{ flexGrow: 1 }}
        >
          <Flex align={"center"} gap={24}>
            <ActionIcon
              color="dark"
              size="xl"
              sx={{
                width: "fit-content",
                height: "fit-content",
                minWidth: "unset",
                minHeight: "unset",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                fontSize: "24px",
              }}
              onClick={toggleExpand}
            >
              <BsList />
            </ActionIcon>
            <Text
              component="h3"
              sx={({ colors }) => ({
                fontSize: "12px",
                color: colors.gray[8],
                fontWeight: 400,
              })}
            >
              {title}
            </Text>
          </Flex>
          <Flex gap={8} align="center">
            {lgScreen && (
              <>
                <Text
                  sx={({ colors }) => ({
                    color: colors.gray[4],
                    fontSize: "12px",
                  })}
                >
                  |
                </Text>
                <Button
                  size={"xs"}
                  variant={"subtle"}
                  color="gray"
                  leftIcon={<FiRefreshCw />}
                >
                  Sync
                </Button>
                <Text
                  sx={({ colors }) => ({
                    color: colors.gray[4],
                    fontSize: "12px",
                  })}
                >
                  |
                </Text>

                <Button
                  size={"xs"}
                  variant={"subtle"}
                  color="gray"
                  leftIcon={
                    <Box
                      component={BsQuestionCircleFill}
                      sx={{ fontSize: "14px" }}
                    />
                  }
                >
                  Help Center
                </Button>
                <Text
                  sx={({ colors }) => ({
                    color: colors.gray[4],
                    fontSize: "12px",
                  })}
                >
                  |
                </Text>
              </>
            )}

            <Menu trigger="hover" position="bottom-end">
              <Menu.Target>
                {tabletScreen ? (
                  <Button
                    size={"xs"}
                    variant={"subtle"}
                    color="gray"
                    leftIcon={
                      <Box component={BsPersonFill} sx={{ fontSize: "16px" }} />
                    }
                    rightIcon={
                      <Box
                        component={FiChevronDown}
                        sx={{ fontSize: "14px" }}
                      />
                    }
                  >
                    {user.user.email}
                  </Button>
                ) : (
                  <ActionIcon>
                    <BsPersonFill />
                  </ActionIcon>
                )}
              </Menu.Target>
              <Menu.Dropdown miw={{ xs: "236px" }}>
                <Menu.Item>Account Info</Menu.Item>
                <Menu.Item>
                  <Link href="/integration/store-list" style={{
                    textDecoration: "none",
                    color: "inherit"
                  }}>Integration</Link>
                </Menu.Item>
                <Menu.Item>Change Password</Menu.Item>
                <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </MantineHeader>
  );
};

export default Header;
