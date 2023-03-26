import {
  Anchor,
  Button,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import AuthLayout from "components/layouts/AuthLayout"
import SendOTPButton from "components/organisms/SendOTPButton"
import Link from "next/link"

const ResetPasswordPage = () => {
  const lgScreen = useMediaQuery("(min-width: 1024px)")
  return (
    <AuthLayout title="Retrieve Password">
      <Flex direction={"column"} gap={16}>
        <TextInput
          placeholder="Phone Number / Email"
          size={lgScreen ? "lg" : "md"}
          radius="md"
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
        >
          Confirm
        </Button>
        <Text
          sx={{ textAlign: "center", margin: 0, fontSize: "14px" }}
          component={"p"}
        >
          New Account?{" "}
          <Anchor component={Link} href={"/auth/login"}>
            Log in
          </Anchor>
        </Text>
      </Flex>
    </AuthLayout>
  )
}

export default ResetPasswordPage
