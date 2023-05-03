import { Carousel } from "@mantine/carousel"
import { Box, rem } from "@mantine/core"
import AuthIllustrationItem from "components/molecules/AuthIllustrationItem"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

const AuthIllustration = () => {
  const autoplay = useRef(Autoplay({ delay: 4000 }))

  return (
    <Box
      sx={{
        display: "none",
        "@media (min-width: 1024px)": {
          display: "flex",
          alignItems: "center",
          width: "45%",
          borderLeft: "1px solid #f0f0f0",
        },
      }}
    >
      <Carousel
        maw={"100%"}
        mx="auto"
        withIndicators
        withControls={false}
        plugins={[autoplay.current]}
        loop
        slideGap={50}
        sx={{ padding: "0px 50px" }}
        styles={({ colors }) => ({
          indicator: {
            width: rem(6),
            height: rem(6),
            transition: "width 250ms ease",
            backgroundColor: colors.violet[2],
            flexShrink: 0,
            "&[data-active]": {
              width: rem(24),
              backgroundColor: colors.violet[6],
            },
          },
        })}
      >
        <Carousel.Slide>
          <AuthIllustrationItem
            title="O2O ERP"
            description="Integrating all of your sales channels and enhancing business efficiency to manage stocks, orders, and products in just one platform"
            // illustrationSrc="/assets/ginee-erp.png"
            illustrationSrc="/assets/logo-o2o.png"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <AuthIllustrationItem
            title="O2O WMS"
            description="IEstablishing faster warehouse workflow and centralizing multi-warehouse management system in just one platform"
            // illustrationSrc="/assets/ginee-wms.png"
            illustrationSrc="/assets/logo-o2o.png"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <AuthIllustrationItem
            title="O2O Chat"
            description="Amplifying real-time communication with all of your customers from various channels in just one platform"
            // illustrationSrc="/assets/ginee-chat.png"
            illustrationSrc="/assets/logo-o2o.png"
          />
        </Carousel.Slide>
      </Carousel>
    </Box>
  )
}

export default AuthIllustration
