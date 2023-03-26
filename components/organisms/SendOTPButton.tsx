import { Button, UnstyledButton } from "@mantine/core"
import React, { useMemo, useState } from "react"
import { useCountdown, useUpdateEffect } from "usehooks-ts"
interface Props {
  /** Email or Phone number */
  credentials: string
  /** triggered when credentials is empty */
  onRequiredError: () => void
}
const SendOTPButton: React.FC<Props> = ({ credentials, onRequiredError }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isResend, setIsResend] = useState(false)
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000,
  })
  const [isCoolDown, setIsCoolDown] = useState(false)
  useUpdateEffect(() => {
    if (count === 0) {
      setIsCoolDown(false)
    }
  }, [count])
  const sendOTPHandler = () => {
    if (credentials) {
      setIsLoading(true)
      setTimeout(() => {
        setIsResend(true)
        setIsLoading(false)
        setIsCoolDown(true)
        resetCountdown()
        startCountdown()
      }, 2000)
    } else {
      onRequiredError()
    }
  }

  return (
    <Button
      variant={"subtle"}
      sx={({ colors }) => ({
        color: isCoolDown ? colors.gray[2] : colors.violet[7],
        fontSize: "14px",
        padding: "0px 12px",
        height: "fit-content",
        fontWeight: "normal",
        "&:hover, &:disabled": {
          backgroundColor: "transparent !important",
        },
      })}
      onClick={sendOTPHandler}
      loading={isLoading}
      disabled={isCoolDown}
    >
      {isCoolDown ? count : isResend ? "Resend" : "Send"}
    </Button>
  )
}

export default SendOTPButton
