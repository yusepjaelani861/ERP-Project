import {
  Anchor,
  Button,
  Checkbox,
  Flex,
  PasswordInput,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import AuthLayout from "components/layouts/AuthLayout"
import PhoneInput from "components/molecules/PhoneInput"
import SendOTPButton from "components/organisms/SendOTPButton"
import Link from "next/link"
import { useState } from "react"

const SignUpPage = () => {
  const lgScreen = useMediaQuery("(min-width: 1024px)")
  const [phone1, setPhone1] = useState({
    code: "+62",
    number: "",
  })
  const [phone2, setPhone2] = useState({
    code: "+62",
    number: "",
  })

  return (
    <AuthLayout title="Sign Up">
      <Tabs defaultValue={"email"}>
        <Tabs.List
          sx={{
            "& .mantine-Tabs-tab": {
              width: "50%",
            },
          }}
        >
          <Tabs.Tab value="email">Email</Tabs.Tab>
          <Tabs.Tab value="phone">Phone</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="email" mt={24}>
          <Flex direction={"column"} gap={16}>
            <TextInput
              placeholder="Please input your email"
              size={lgScreen ? "lg" : "md"}
              radius="md"
            />
            <TextInput
              placeholder="Email OTP code"
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
            />
            <PhoneInput
              size={lgScreen ? "lg" : "md"}
              radius="md"
              onChange={(value) => setPhone1(value)}
              value={phone1}
            />
            <PasswordInput
              placeholder="Please enter password"
              size={lgScreen ? "lg" : "md"}
              radius="md"
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
            />
            <Button
              variant={"filled"}
              color="violet"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              sx={{ fontWeight: "normal" }}
              disabled
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
            <PhoneInput
              size={lgScreen ? "lg" : "md"}
              radius="md"
              onChange={(value) => setPhone2(value)}
              value={phone2}
            />
            <TextInput
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
            />
            <PasswordInput
              placeholder="Please enter password"
              size={lgScreen ? "lg" : "md"}
              radius="md"
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
            />
            <Button
              variant={"filled"}
              color="violet"
              size={lgScreen ? "lg" : "md"}
              radius="md"
              sx={{ fontWeight: "normal" }}
              disabled
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
  )
}

export default SignUpPage
