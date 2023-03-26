import { Box, Tabs } from "@mantine/core"

const ProductSettings = () => {
  return (
    <>
      <Box px={32} py={10}>
        <Tabs defaultValue={'master-product-settings'}>
          <Tabs.List sx={{
            '& .mantine-Tabs-tab': {
              fontSize: '12px',
              paddingBottom: 20,
              paddingTop: 20
            }
          }}>
            <Tabs.Tab value="master-product-settings">
              Master Product Settings
            </Tabs.Tab>
            <Tabs.Tab value="add-product-settings">
              Add Product Settings
            </Tabs.Tab>
            <Tabs.Tab value="clone-settings">Clone Settings</Tabs.Tab>
            <Tabs.Tab value="product-activity-settings">
              Product Activity Settings
            </Tabs.Tab>
            <Tabs.Tab value="barcode-printing-template-settings">
              Barcode Printing Template Settings
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Box>
    </>
  )
}

export default ProductSettings
