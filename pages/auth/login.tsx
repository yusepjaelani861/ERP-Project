import {
  Anchor,
  Button,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import AuthLayout from "components/layouts/AuthLayout";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosService from "utils/axiosService";
import { setCookies } from "cookies-next";
import { useRouter } from "next/router";
import { UserLogin } from "interfaces/user";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const response = await axiosService(`/auth/login`, "POST", {
        email,
        password,
      });

      const res: UserLogin = response.data.data;
      setCookies("token", res.token, {
        maxAge: res.expiredIn,
        path: "/",
        sameSite: "lax",
        domain: process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000",
        httpOnly: true,
      });
      document.cookie = `token=${res.token}; max-age=${res.expiredIn}; path=/; domain=${process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"};`
      console.log(res);
      router.push("/dashboard")
    } catch (error: any) {
      console.log(error);
      setErrorMessages(error.response?.data?.message);
      setErrors(true);
    }
  };

  useEffect(() => {
    setErrors(false);
    setErrorMessages("");
  }, [email, password]);

  const lgScreen = useMediaQuery("(min-width: 1024px)");
  return (
    <AuthLayout title="Log In">
      {errors && (
        <Text
          sx={{
            textAlign: "center",
            margin: 0,
            fontSize: "14px",
            color: "red",
          }}
          component={"p"}
        >
          {errorMessages}
        </Text>
      )}
      <Flex direction={"column"} gap={16}>
        <TextInput
          placeholder="Phone Number / Email / Login Name"
          size={lgScreen ? "lg" : "md"}
          radius="md"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <PasswordInput
          placeholder="Please enter password"
          size={lgScreen ? "lg" : "md"}
          radius="md"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Anchor
          component={Link}
          href={"/auth/reset-password"}
          sx={{
            marginLeft: "auto",
            width: "fit-content",
            fontSize: "14px",
          }}
        >
          Reset Password
        </Anchor>
        <Button
          variant={"filled"}
          color="violet"
          size={lgScreen ? "lg" : "md"}
          radius="md"
          sx={{ fontWeight: "normal" }}
          onClick={handleLogin}
        >
          Log in
        </Button>
        <Text
          sx={{ textAlign: "center", margin: 0, fontSize: "14px" }}
          component={"p"}
        >
          New Account?{" "}
          <Anchor component={Link} href={"/auth/signup"}>
            Sign Up
          </Anchor>
        </Text>
      </Flex>
    </AuthLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let token = context.req.cookies.token;
  if (!token) {
    token = "";
  }

  if (token) {
    try {
      const response = await axiosService("/auth/me", "GET", {}, token);
      if (response.data.success === false) {
        context.res.setHeader(
          "Set-Cookie",
          "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        );
      }

      return {
        redirect: {
          destination: "/dashboard",
        },
      };
    } catch (error) {
      context.res.setHeader(
        "Set-Cookie",
        "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
      );

      return {
        props: {},
      };
    }
  } else {
    return {
      props: {},
    };
  }
};

export default LoginPage;
