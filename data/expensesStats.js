import Bank from "@/components/svg/Bank";
import ExpensesIcon from "@/components/svg/ExpensesIcon";
import Money from "@/components/svg/Money";
import PAY from "@/components/svg/PAY";
import Receipt from "@/components/svg/Receipt";
import Shop from "@/components/svg/Shop";
import TrendingUpHand from "@/components/svg/TrendingUpHand";
import Wallet from "@/components/svg/Wallet";

const expensesStats = [
  {
    title: "Expense details",
    stats: [
      {
        icon: TrendingUpHand,
        label: "Total vat from sales",
        amount: 300.45,
        color: "#15D3C4",
        iconBg: "#DCFAF8",
      },
      {
        icon: Wallet,
        label: `Total expense gross\n(without service receipt)`,
        amount: 300.45,
        color: "#FFBB38",
        iconBg: "#FFF5D9",
      },
      {
        icon: ExpensesIcon,
        label: "Sales vat - Expenses gross",
        amount: 300.45,
        color: "",
        iconBg: "",
      },
      {
        icon: Bank,
        label: "Bank Balance",
        amount: 300.45,
        color: "#FF82AC",
        iconBg: "#FFE0EB",
      },
      {
        icon: Money,
        label: "Unpaid",
        amount: 300.45,
        color: "#69A200",
        iconBg: "#F2FFDA",
      },
      {
        icon: PAY,
        label: "Remaining amount",
        amount: 300.45,
        color: "#16DBCC",
        iconBg: "#DCFAF8",
      },
    ],
  },
  {
    title: "Gross details",
    stats: [
      {
        icon: TrendingUpHand,
        label: "Total gross",
        amount: 300.45,
        color: "#15D3C4",
        iconBg: "#DCFAF8",
      },
      {
        icon: ExpensesIcon,
        label: "Total VAT (19%)",
        amount: 300.45,
        color: "#FFBB38",
        iconBg: "#FFF5D9",
      },
      {
        icon: ExpensesIcon,
        label: "Total VAT (9%)",
        amount: 300.45,
        color: "",
        iconBg: "",
      },
      {
        icon: ExpensesIcon,
        label: "Total VAT (5%)",
        amount: 300.45,
        color: "#FF82AC",
        iconBg: "#FFE0EB",
      },
      {
        icon: Receipt,
        label: "Service receipt",
        amount: 300.45,
        color: "#69A200",
        iconBg: "#F2FFDA",
      },
      {
        icon: Shop,
        label: "Shop Rent",
        amount: 300.45,
        color: "#16DBCC",
        iconBg: "#DCFAF8",
      },
    ],
  },
];

export { expensesStats };
