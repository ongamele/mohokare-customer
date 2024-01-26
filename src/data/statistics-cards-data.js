import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "My Statements",
    value: "4",
    footer: {
      color: "text-green-500",
      value: "",
      label: "",
    },
  },
  {
    color: "blue",
    icon: UserPlusIcon,
    title: "Account Number",
    value: "445554",
    footer: {
      color: "text-green-500",
      value: "",
      label: "",
    },
  },
  {
    color: "blue",
    icon: UsersIcon,
    title: "Outstanding",
    value: "R2400",
    footer: {
      color: "text-green-500",
      value: "",
      label: "",
    },
  },

  {
    color: "blue",
    icon: ChartBarIcon,
    title: "Indigent",
    value: "Yes",
    footer: {
      color: "text-green-500",
      value: "",
      label: "",
    },
  },
];

export default statisticsCardsData;
