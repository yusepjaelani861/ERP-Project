import React from "react"
import {
  Box,
  Flex,
  Menu,
  Navbar as MantineNavbar,
  NavLink,
  Tooltip,
} from "@mantine/core"
import {
  AiFillDashboard,
  AiFillDropboxSquare,
  AiFillVideoCamera,
  AiFillWechat,
  AiOutlineApartment,
  AiOutlineDashboard,
  AiOutlineHome,
  AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlinePartition,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai"
import Link from "next/link"
import { useRouter } from "next/router"
import useNavbarExpand from "store/navbarExpand"
const navLinks = [
  {
    label: "Dashboard",
    icon: <AiOutlineDashboard />,
    href: "/dashboard",
  },
  {
    label: "Order",
    "icon": <AiOutlineOrderedList />,
    items: [
      {
        label: "Order List",
        href: "/order/order-list",
      },
      {
        label: "Pending Order",
        href: "#",
      }
    ]
  },
  {
    label: "Master Product",
    icon: <AiOutlineShopping />,
    items: [
      {
        label: "Master Product List",
        href: "/master-product/product-list",
      },
      {
        label: "Price Management",
        href: "/master-product/price-management",
      },
      {
        label: "Settings",
        href: "/master-product/settings",
      },
    ],
  },
  {
    label: "Channel Product",
    icon: <AiOutlineApartment />,
    items: [
      // {
      //   label: "Shopee",
      //   href: "/channel-product/shopee",
      // },
    ],
  },
  {
    label: "Warehouse",
    icon: <AiOutlineHome />,
    items: [
      {
        label: "Warehouse Management",
        // href: "/warehouse/warehouse-management",
        href: "https://wms.o2ochannel.com",
        target: "_blank",
      }
    ]
  },
  {
    label: "Stock (Maintenance)",
    icon: <AiOutlinePartition />,
    items: [
      {
        label: "Stock List",
        // href: "/stock/stock-list",
        href: "#"
      },
      {
        label: "Stock Settings",
        // href: "/stock/stock-list",
        href: "#"
      }
    ]
  },
  {
    label: "Customer (Maintenance)",
    icon: <AiOutlineUser />,
    items: [
      {
        label: "Customer List",
        // href: "/customer/customer-list",
        href: "#"
      }
    ]
  },
  {
    label: "Integration",
    icon: <AiOutlineLink />,
    items: [
      {
        label: "Store List",
        href: "/integration/store-list",
      },
      {
        label: "Add Integration",
        href: "/integration/add-integration",
      },
    ],
  },
  {
    label: "Master Video (Coming Soon)",
    icon: <AiFillVideoCamera />,
    items: [
      {
        label: "Video List",
        href: "#",
      },
      {
        label: "Create Video",
        href: "#",
      },
    ],
  },
  {
    label: "Chat (Coming Soon)",
    icon: <AiFillWechat />,
    items: [
      {
        label: "Chat Customer",
        href: "#",
      },
    ],
  },
]
const Navbar = () => {
  const router = useRouter()
  const { expanded } = useNavbarExpand()
  return (
    <MantineNavbar
      width={{ base: expanded ? 235 : 42 }}
      sx={({ colors }) => ({
        transition: "all .3s",
        "& .mantine-NavLink-children": {
          paddingLeft: "0px",
        },
      })}
      fixed
    >
      {expanded ? (
        <>
          {navLinks.map((navLink) =>
            navLink.items ? (
              <NavLink
                key={navLink.label}
                label={navLink.label}
                icon={navLink.icon}
                active={navLink.items.some(
                  (item) => item.href === router.asPath
                )}
                defaultOpened={navLink.items.some(
                  (item) => item.href === router.asPath
                )}
                sx={({}) => ({
                  "&[data-active]": {
                    backgroundColor: "transparent",
                  },
                  paddingTop: "16px",
                  paddingBottom: "16px",
                })}
              >
                {navLink.items.map((navLinkItem) => (
                  <NavLink
                    key={navLinkItem.label}
                    label={navLinkItem.label}
                    component={Link}
                    href={navLinkItem.href}
                    active={router.asPath === navLinkItem.href}
                    sx={({ colors }) => ({
                      paddingLeft: "40px",
                      "&[data-active]": {
                        paddingLeft: "36px",
                        borderLeft: `3px solid ${colors.violet[5]}`,
                      },
                      "& .mantine-NavLink-label": {
                        fontSize: "14px",
                      },
                      paddingTop: "14px",
                    paddingBottom: "14px",
                    })}
                  />
                ))}
              </NavLink>
            ) : (
              <NavLink
                key={navLink.label}
                label={navLink.label}
                icon={navLink.icon}
                component={Link}
                href={navLink.href}
                active={router.asPath === navLink.href}
                sx={({ colors }) => ({
                  "&[data-active]": {
                    borderLeft: `3px solid ${colors.violet[5]}`,
                  },
                })}
              />
            )
          )}
        </>
      ) : (
        <>
          {navLinks.map((navLink) =>
            navLink.items ? (
              <Menu trigger="hover" position="right-start" key={navLink.label}>
                <Menu.Target>
                  <NavLink
                    icon={navLink.icon}
                    active={navLink.items.some(
                      (item) => item.href === router.asPath
                    )}
                  />
                </Menu.Target>
                <Menu.Dropdown
                  sx={{
                    "& > div": {
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    },
                  }}
                >
                  {navLink.items.map((navLinkItem) => (
                    <Menu.Item
                      key={navLinkItem.label}
                      component={Link}
                      href={navLinkItem.href}
                      sx={({ colors }) => ({
                        color:
                          router.asPath === navLinkItem.href
                            ? colors.violet[5]
                            : undefined,
                        backgroundColor:
                          router.asPath === navLinkItem.href
                            ? colors.violet[0]
                            : undefined,
                        fontSize: "12px",
                        padding: "8px 10px",
                      })}
                    >
                      {navLinkItem.label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Tooltip
                label={navLink.label}
                withArrow
                position="right"
                key={navLink.label}
              >
                <NavLink
                  component={Link}
                  href={navLink.href}
                  icon={navLink.icon}
                  active={router.asPath === navLink.href}
                />
              </Tooltip>
            )
          )}
        </>
      )}
    </MantineNavbar>
  )
}

export default Navbar
