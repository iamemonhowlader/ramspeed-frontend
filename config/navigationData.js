import {
  Globe,
  HardDrive,
  Home,
  LogOut,
  Menu,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";

// Base path for all administrator routes
export const BASE_PATH = "/administrator/dashboard";

// Navigation menu items with nested child links
export const navigationData = [
  //************************************************************************
  //* Home
  //************************************************************************
  {
    name: "Home",
    icon: Home,
    link: BASE_PATH,
  },
  //************************************************************************
  //* Menu Products
  //************************************************************************
  {
    name: "Menu",
    icon: Menu,
    link: `${BASE_PATH}/menu-products`,
  },
  //************************************************************************
  //* Shop Management
  //************************************************************************
  {
    name: "Shop Management",
    icon: Store,
    link: `${BASE_PATH}/shop-management`,
    children: [
      { name: "Orders", link: `${BASE_PATH}/shop-management/orders` },
      { name: "Expenses", link: `${BASE_PATH}/shop-management/expenses` },
      { name: "Old Orders", link: `${BASE_PATH}/shop-management/old-orders` },
      {
        //*************************************************************************
        //* Store Stock
        //*************************************************************************
        name: "Store Stock",
        link: `${BASE_PATH}/shop-management/all-stock`,
        children: [
          {
            name: "All Stock",
            link: `${BASE_PATH}/shop-management/all-stock`,
          },
          {
            name: "Active Stock",
            link: `${BASE_PATH}/shop-management/active-stock`,
          },
          {
            name: "Inactive Stock",
            link: `${BASE_PATH}/shop-management/inactive-stock`,
          },
          {
            name: "Inactive without stock quantity",
            link: `${BASE_PATH}/shop-management/inactive-without-stock-quantity`,
          },
        ],
      },
      { name: "Receipts", link: `${BASE_PATH}/shop-management/receipts` },
      {
        //*************************************************************************
        //* Balance Sheets
        //*************************************************************************
        name: "Balance Sheets",
        link: `${BASE_PATH}/shop-management/balance-sheets`,
        children: [
          {
            name: "1st balance sheet",
            link: `${BASE_PATH}/shop-management/balance-sheets/1`,
          },
          {
            name: "2nd balance sheet",
            link: `${BASE_PATH}/shop-management/balance-sheets/2`,
          },
          {
            name: "3rd balance sheet",
            link: `${BASE_PATH}/shop-management/balance-sheets/3`,
          },
          {
            name: "4th balance sheet",
            link: `${BASE_PATH}/shop-management/balance-sheets/4`,
          },
        ],
      },
      {
        name: "Store Information",
        link: `${BASE_PATH}/shop-management/store-information`,
      },
      // { name: "RMA Form", link: `${BASE_PATH}/shop-management/rma-form` },
      { name: "RMA history", link: `${BASE_PATH}/shop-management/rma-history` },
      { name: "Change Logo", link: `${BASE_PATH}/shop-management/change-logo` },
    ],
  },
  //*************************************************************************
  //* Users Management
  //*************************************************************************
  {
    name: "Users Management",
    icon: Users,
    link: `${BASE_PATH}/users-management`,
    children: [
      {
        //*************************************************************************
        //* Members
        //*************************************************************************
        name: "Members",
        link: `${BASE_PATH}/users-management/members`,
        children: [
          { name: "Members", link: `${BASE_PATH}/users-management/members` },
          { name: "Clients", link: `${BASE_PATH}/users-management/clients` },
          {
            name: "B2B Customer",
            link: `${BASE_PATH}/users-management/b2b-customers`,
          },
        ],
      },
      {
        //*************************************************************************
        //* Users
        //*************************************************************************
        name: "Users",
        link: `${BASE_PATH}/users-management/users`,
        children: [
          { name: "Accounts", link: `${BASE_PATH}/users-management/users` },
          {
            name: "Access Level",
            link: `${BASE_PATH}/users-management/users/access-level`,
          },
          // { name: "Ban List", link: `${BASE_PATH}/users-management/ban-list` },
        ],
      },
      { name: "Suppliers", link: `${BASE_PATH}/users-management/suppliers` },
      {
        name: "Suppliers Manual",
        link: `https://ramspeedcy.com/shop-onmi-admin/images/manual.pdf`,
      },
    ],
  },
  //*************************************************************************
  //* Website Customization
  //*************************************************************************
  {
    name: "Website Customization",
    icon: Globe,
    link: `${BASE_PATH}/website-customization`,
    children: [
      // { name: "Features", link: `${BASE_PATH}/website-customization/features` },
      // { name: "News", link: `${BASE_PATH}/website-customization/news` },
      {
        name: "Advertisements",
        link: `${BASE_PATH}/website-customization/advertisement`,
      },
      {
        name: "Custom Navbar",
        link: `${BASE_PATH}/website-customization/custom-navbar`,
      },
    ],
  },
  //*************************************************************************
  //* Marketing
  //*************************************************************************
  {
    name: "Marketing",
    icon: TrendingUp,
    link: `${BASE_PATH}/marketing`,
    children: [
      { name: "Statistics", link: `https://analytics.google.com/` },
      {
        name: "Email Newsletter",
        link: `https://us20.admin.mailchimp.com/customer-journey/#/`,
      },
      { name: "SMS", link: `https://www.liveall.eu/` },
      {
        name: "Newsletter List",
        link: `${BASE_PATH}/marketing/newsletter-list`,
      },
    ],
  },
  //*************************************************************************
  //* Backups
  //*************************************************************************
  {
    name: "Backups",
    icon: HardDrive,
    link: `${BASE_PATH}/backups`,
    children: [
      {
        name: "ONOUFRIOS ONOUFRIOU (RAMSPEEDCY)",
        link: `#`,
      },
      {
        name: "ONOUFRIOS ONOUFRIOU (MEANDMALL)",
        link: `https://ramspeedcy.com/Onoufrios_Onoufriou_Backend_System/OLD_ORDERS/5.x/index.php`,
      },
    ],
  },
  {
    name: "Log out",
    icon: LogOut,
    link: "/logout",
  },
];
