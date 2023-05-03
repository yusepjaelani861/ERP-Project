import {
  Anchor,
  Button,
  Checkbox,
  Flex,
  PasswordInput,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import AuthLayout from "components/layouts/AuthLayout";
import PhoneInput from "components/molecules/PhoneInput";
import SendOTPButton from "components/organisms/SendOTPButton";
import { setCookies } from "cookies-next";
import { UserLogin } from "interfaces/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosService from "utils/axiosService";

const SignUpPage = () => {
  const lgScreen = useMediaQuery("(min-width: 1024px)");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [confirmPrivacy, setConfirmPrivacy] = useState(false);
  const [type, setType] = useState("email");
  const router = useRouter();

  const [errors, setErrors] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");

  useEffect(() => {}, []);

  const handleRegister = async () => {
    try {
      const response = await axiosService(`/auth/register`, "POST", {
        name,
        phone_number: phone,
        email,
        password,
        password_confirmation: passwordConfirmation,
        type,
      });

      const res: UserLogin = response.data.data;
      setCookies("token", res.token, {
        maxAge: res.expiredIn,
        path: "/",
        sameSite: "lax",
        domain: process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000",
        httpOnly: true,
      });
      document.cookie = `token=${res.token}; max-age=${
        res.expiredIn
      }; path=/; domain=${
        process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"
      };`;
      console.log(res);
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      setErrorMessages(error.response?.data?.message);
      setErrors(true);
    }
  };

  return (
    <AuthLayout title="Sign Up">
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
      <Tabs defaultValue={"email"}>
        <Tabs.List
          sx={{
            "& .mantine-Tabs-tab": {
              width: "50%",
            },
          }}
        >
          <Tabs.Tab
            value="email"
            onClick={() => {
              setType("email");
            }}
          >
            Email
          </Tabs.Tab>
          <Tabs.Tab
            value="phone"
            onClick={() => {
              setType("phone");
            }}
          >
            Phone
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="email" mt={24}>
          <Flex direction={"column"} gap={16}>
            <TextInput
              placeholder="Please input your name"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextInput
              placeholder="Please input your email"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextInput
              type="number"
              placeholder="Please input your phone number"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              onChange={(e) => {
                setPhone(e.target.value);
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

            <PasswordInput
              placeholder="Please enter password confirmation"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
            />
            <Checkbox
              size={"xs"}
              label={
                <>
                  By registering, I agree to the{" "}
                  <Anchor component={Link} href="/term-of-use">
                    Term of use
                  </Anchor>{" "}
                  and{" "}
                  <Anchor component={Link} href="/privacy-policy">
                    Privacy Policy
                  </Anchor>
                </>
              }
              onChange={(e) => {
                setConfirmPrivacy(e.target.checked);
              }}
            />
            <Button
              variant={"filled"}
              color="violet"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              sx={{ fontWeight: "normal" }}
              disabled={!confirmPrivacy}
              onClick={handleRegister}
            >
              Next Step
            </Button>
            <Text
              sx={{ textAlign: "center", margin: 0, fontSize: "14px" }}
              component={"p"}
            >
              Han an account?{" "}
              <Anchor component={Link} href={"/auth/login"}>
                Log in
              </Anchor>
            </Text>
          </Flex>
        </Tabs.Panel>
        <Tabs.Panel value="phone" mt={24}>
          <Flex direction={"column"} gap={16}>
            <TextInput
              placeholder="Please input your name"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextInput
              type="number"
              placeholder="Please input your phone number"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
            />
            {/* <TextInput
              placeholder="Verification Code"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              rightSection={
                <SendOTPButton
                  credentials=""
                  onRequiredError={() => {
                    console.log("Please enter email")
                  }}
                />
              }
              rightSectionWidth={"fit-content"}
            /> */}
            <PasswordInput
              placeholder="Please enter password"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <PasswordInput
              placeholder="Please enter password confirmation"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
            />
            <Checkbox
              size={"xs"}
              label={
                <>
                  By registering, I agree to the{" "}
                  <Anchor component={Link} href="/term-of-use">
                    Term of use
                  </Anchor>{" "}
                  and{" "}
                  <Anchor component={Link} href="/privacy-policy">
                    Privacy Policy
                  </Anchor>
                </>
              }
              onChange={(e) => {
                setConfirmPrivacy(e.target.checked);
              }}
            />
            <Button
              variant={"filled"}
              color="violet"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              sx={{ fontWeight: "normal" }}
              disabled={!confirmPrivacy}
              onClick={handleRegister}
            >
              Next Step
            </Button>
            <Text
              sx={{ textAlign: "center", margin: 0, fontSize: "14px" }}
              component={"p"}
            >
              Han an account?{" "}
              <Anchor component={Link} href={"/auth/login"}>
                Log in
              </Anchor>
            </Text>
          </Flex>
        </Tabs.Panel>
      </Tabs>
    </AuthLayout>
  );
};

export default SignUpPage;
