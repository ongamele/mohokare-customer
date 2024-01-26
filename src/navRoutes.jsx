import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  DocumentIcon,
  PaperClipIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Account, MeterReadings, PaymentHistory } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const navRoutes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <PaperClipIcon {...icon} />,
        name: "Manage Account",
        path: "/account",
        element: <Account />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Meter Readings",
        path: "/meter-readings",
        element: <MeterReadings />,
      },

      {
        icon: <DocumentIcon {...icon} />,
        name: "Payment History",
        path: "/payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
];

export default navRoutes;
