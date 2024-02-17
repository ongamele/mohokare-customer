import React, {useContext} from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  UserCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  ordersOverviewData,
  projectsTableData,
  statisticsCardsData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { GET_STATEMENT } from "../../Graphql/Queries";
import { AuthContext } from "../../context-auth/auth";

export function Home() {
  const { user } = useContext(AuthContext);

  const {
    loading: statementDataLoading,
    data: statementData,
    refetch: refetchStatementData,
  } = useQuery(GET_STATEMENT, {
    variables: { accountNumber: user.accountNumber }
  });

  {statementData && console.log(JSON.stringify(statementData.getStatement))}
  

  const statisticsCardsData = [
    {
      color: "blue",
      icon: BanknotesIcon,
      title: "Account Status",
      value: statementData?.getStatement?.accountStatus || "N/A", // Add a default value or handle accordingly
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
      value: statementData?.getStatement?.accountNumber || "N/A", // Add a default value or handle accordingly
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
      value: 'R'+statementData?.getStatement?.closingBalance || "R0", // Add a default value or handle accordingly
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
      value: statementData?.getStatement?.isIndigent || "N/A", // Add a default value or handle accordingly
      footer: {
        color: "text-green-500",
        value:  statementData?.getStatement?.indigentExpiry || "N/A", // Add a default value or handle accordingly
        label: "",
      },
    },
  ];

    let outstandingAmount = '';
  if(statementData && statementData.getStatement.closingBalance != ''){
   
    outstandingAmount = statementData.getStatement.closingBalance
  }else{
    outstandingAmount = 0;
  }

  
  return (
    <div className="mt-12">
     <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
     {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      
      </div>
     {/*} <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>*/}
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
       
       
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Address
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>{statementData?.getStatement?.postalAddress1}</strong>{statementData?.getStatement?.town}
            </Typography>
          </CardHeader>
      
        </Card>
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Contact Details
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <PhoneIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>{statementData?.getStatement?.phoneNumber}</strong> {statementData?.getStatement?.email}
            </Typography>
          </CardHeader>
      
        </Card>
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Consumer Name
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <UserCircleIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>{statementData?.getStatement?.consumerName}</strong> 
            </Typography>
          </CardHeader>
      
        </Card>
                  </div>
    </div>
  );
}

export default Home;
