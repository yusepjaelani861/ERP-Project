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
import Link from "next/link"

const LoginPage = () => {
  const lgScreen = useMediaQuery("(min-width: 1024px)")
  return (
    <AuthLayout title="Log In">
      <Flex direction={"column"} gap={16}>
        <TextInput
          placeholder="Phone Number / Email / Login Name"
          size={lgScreen ? "lg" : "md"}
          radius="md"
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
  )
}

export default LoginPage
