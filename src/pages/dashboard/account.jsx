import React, { useState, useContext } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardHeader,
  CardBody,
  Menu,
  IconButton,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  CreditCardIcon,
  BanknotesIcon,
  CheckCircleIcon 
} from "@heroicons/react/24/solid";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";


import './style.css';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { CREATE_PAYMENT_ARRANGEMENT } from "../../Graphql/Mutations";

import yeboPayLogo from "../../images/yeboPay-logo.png";
import mohokareLogo from "../../images/mohokareLogo.jpg";
import { GET_STATEMENT } from "../../Graphql/Queries";
import { GET_USER_PAYMENT_ARRANGEMENTS } from "../../Graphql/Queries";
import { AuthContext } from "../../context-auth/auth";

export function Account() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [openArrangement, setOpenArrangement] = React.useState(false);
  const [openEFTModal, setOpenEFTModal] = React.useState(false);
  const [paymentDate, setPaymentDate] = useState()
  const [amount, setAmount] = useState();
 
  const handleOpen = () => setOpen(!open);
  const handleArrangementOpen = () => setOpenArrangement(!openArrangement);
  const handleEFTOpen = () => setOpenEFTModal(!openEFTModal);

  const {
    loading: statementDataLoading,
    data: statementData,
    refetch: refetchStatementData,
  } = useQuery(GET_STATEMENT, {
    variables: { accountNumber: user.accountNumber }
  });


  const {
    loading: paymentArrangementsDataLoading,
    data: paymentArrangementsData,
    refetch: refetchPaymentArrangementsData,
  } = useQuery(GET_USER_PAYMENT_ARRANGEMENTS, {
    variables: { accountNumber: user.accountNumber }
  });

  {paymentArrangementsData ? console.log(JSON.stringify(paymentArrangementsData)) : console.log('No data in aarrangements')}

const [createPaymentArrangement, { loading: createPaymentArrangementLoading }] = useMutation(CREATE_PAYMENT_ARRANGEMENT, {
  update: (_, result) => {
    alert("Payment Arrangement submitted Successfully!");
  },
  onError: (err) => {
    Alert("Error! " + err);
  },
});




  let outstandingAmount = '';
  if(statementData && statementData.getStatement.closingBalance != ''){
   
    outstandingAmount = statementData.getStatement.closingBalance
  }else{
    outstandingAmount = 0;
  }



  const handlePaymentArrangementSubmit = async () => {
   
    let perc = 30 * Number(outstandingAmount) /100;
    
    if (user.accountNumber && paymentDate && amount) {

      if(amount < perc)
    {
      alert('You are allowed to make payment arrangement of at least 30% of the outstanding amount')
    }else{
      handleArrangementOpen();
      
      createPaymentArrangement({
        variables: {
          accountNumber: user.accountNumber,
          paymentDate, 
          amount: Number(amount),
        },
      });
    }
     
    }else{
      Alert('Payment date & amount are required!')
    }
  };
  const data = [
    {
      label: "Card",
      value: "card",
      icon: CreditCardIcon
    },
  ];
  return (
    <>
      <Dialog size={"xs"} open={open} handler={handleOpen}>
        <Card className="border border-blue-gray-100 shadow-sm"style={{ overflow: 'auto', maxHeight: '400px' }} >
        <img
          src={yeboPayLogo}
          className="yebo-pay-logo"
        />
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
          
          
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-red-500"
              />
              <strong>R{outstandingAmount}</strong>
            </Typography>
            <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium" style={{marginTop: 10}}>
              Enter amount to pay 
            </Typography>
            <Input
              size="sm"
              placeholder="R1000"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              style={{width: 90}}
            />
            </div>
            <Typography
              variant="small"
              className="flex items-center font-normal"
              style={{textAlign: 'left', marginTop: 10}}
            >
            
              Account Number: {statementData?.getStatement?.accountNumber}
            </Typography>

            <img
          src={mohokareLogo}
          className="yebo-pay-logo"
        />
          </CardHeader>
          
          <CardBody className="pt-0">
          
          <Tabs value="dashboard">
         {/*} <img
          src={logoSmall}
          className="modal-estatements-logo"
        />*/}
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value} style={{color: "#3855E5"}}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
        
      </TabsHeader>
      <TabsBody >
        <br></br> 
        <p style={{textAlign: 'center'}}>Please fill in your card details to make payment.</p>
          <TabPanel key="card" value="card">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Name on the card
            </Typography>
            <Input
              size="lg"
              placeholder="J Mills"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Card Number
            </Typography>
            <Input
              size="lg"
              placeholder="124562222055"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Expiry Date
            </Typography>
            <div style={{ display: 'flex', alignContent: 'flex-start' }}>
            <Input variant="static" label="Year" placeholder="2025" style={{width: 100}} />
            <Input variant="static" label="Month" placeholder="12" style={{width: 100}} />
  
              </div>
              <Input
                  placeholder="CVC"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  style={{width: 100}}
                />


                      

                        </div>
                        </TabPanel>
                      
                    </TabsBody>
                  </Tabs>
          </CardBody>
        </Card>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>


      {/* Modal for arrangement*/}

      
      <Dialog
        open={openArrangement}
        size={"xs"}
        handler={handleArrangementOpen}
      >
        <DialogBody>
        <Typography variant="h6" color="blue-gray" className="mb-2">
              Select Date for your payment arrangement
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-red-500"
              />
              <strong>R{outstandingAmount}</strong> at least 30% of this amount.
            </Typography><br />

            <Typography style={{textAlign: "center"}}><strong>Or</strong></Typography><br />
           
            <Input
              size="lg"
              placeholder="R1200"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            
      <Popover placement="bottom">
        <PopoverHandler>
          <Input
            label="Select a Date"
            type="date"
            onChange={(e) => setPaymentDate(e.target.value)}
          />
        </PopoverHandler>
        <PopoverContent>
          <DayPicker
            mode="single"
            selected={paymentDate}
            onSelect={setPaymentDate}
            showOutsideDays
            className="border-0"
            classNames={{
              caption: "flex justify-center py-2 mb-4 relative items-center",
              caption_label: "text-sm font-medium text-gray-900",
              nav: "flex items-center",
              nav_button:
                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
              nav_button_previous: "absolute left-1.5",
              nav_button_next: "absolute right-1.5",
              table: "w-full border-collapse",
              head_row: "flex font-medium text-gray-900",
              head_cell: "m-0.5 w-9 font-normal text-sm",
              row: "flex w-full mt-2",
              cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal",
              day_range_end: "day-range-end",
              day_selected:
                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
              day_today: "rounded-md bg-gray-200 text-gray-900",
              day_outside:
                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
              day_disabled: "text-gray-500 opacity-50",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: ({ ...props }) => (
                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
              ),
              IconRight: ({ ...props }) => (
                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
              ),
            }}
          />
        </PopoverContent>
      </Popover>
     
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleArrangementOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handlePaymentArrangementSubmit}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>




      {/*Modal for EFT */}

      <Dialog
        open={openEFTModal}
        size={"xxs"}
        handler={handleEFTOpen}
      >
        <DialogBody>
        <Typography variant="h6" color="blue-gray" className="mb-2">
              EFT Payment
            </Typography>
            
            <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Name on the card
            </Typography>
            <Input
              size="lg"
              placeholder="J Mills"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Account Number
            </Typography>
            <Input
              size="lg"
              placeholder="124522055"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Branch Code
            </Typography>
            <Input
              size="lg"
              placeholder="44334"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Expiry Date
            </Typography>
            <div style={{ display: 'flex', alignContent: 'flex-start' }}>
            <Input variant="static" label="Year" placeholder="2025" style={{width: 100}} />
            <Input variant="static" label="Month" placeholder="12" style={{width: 100}} />
  
</div>
<Input
    placeholder="CVC"
    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
    style={{width: 100}}
  />


        

          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleEFTOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleEFTOpen}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    <section className="m-12 flex gap-4">
      
   


    <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                My Account
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200"style={{color: "red"}}/>
                <strong>R{outstandingAmount}</strong>
 Outstanding
              </Typography>
            </div>
            
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["name", "account number", "Last Payment date", "last Amount", "", ""].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                
                      <tr>
                        <td className="py-3 px-5">
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {statementData?.getStatement?.consumerName}
                            </Typography>
                          </div>
                        </td>
                        <td className="py-3 px-5">
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {statementData?.getStatement?.accountNumber}
                            </Typography>
                        </td>
                        <td className="py-3 px-5">
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {statementData?.getStatement.lastPaymentDate}
                          </Typography>
                        </td>
                        <td className="py-3 px-5">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              R{statementData?.getStatement?.lastPaymentAmount}
                            </Typography>
                           
                        </td>
                        <td className="py-3 px-5">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                              style={{color: "#38D8A2", cursor: "pointer"}}
                              onClick={handleOpen}
                            >
                              Pay
                            </Typography>
                           
                        </td>

                        <td className="py-3 px-5">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                              style={{color: "#F58F00", cursor: "pointer"}}
                              onClick={handleArrangementOpen}
                            >
                              Make Arrangement
                            </Typography>
                           
                        </td>
                        <td className="py-3 px-5">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                              style={{color: "#3855E5", cursor: "pointer"}}
                            
                            >
                              
                            </Typography>
                           
                        </td>
                        
                      </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>





 

  </section>
  <section className="m-12 flex gap-4">
  <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                My Payment Arrangements
              </Typography>
          
            </div>
           
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[ "account number", "Arrangement Date", "Amount", ""].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
              {paymentArrangementsData && paymentArrangementsData.getUserPaymentArrangements.map((arrangement, index) => (
  <tr key={index}>
    <td className="py-3 px-5">
      <div className="flex items-center gap-4">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold"
        >
          {arrangement.accountNumber}
        </Typography>
      </div>
    </td>
    <td className="py-3 px-5">
      <Typography
        variant="small"
        color="blue-gray"
        className="font-bold"
      >
        {arrangement.paymentDate}
      </Typography>
    </td>
    <td className="py-3 px-5">
      <Typography
        variant="small"
        className="text-xs font-medium text-blue-gray-600"
      >
        R{arrangement.amount}
      </Typography>
    </td>
    <td className="py-3 px-5">
      <Typography
        variant="small"
        className="mb-1 block text-xs font-medium text-blue-gray-600"
        style={{color: "#38D8A2", cursor: "pointer"}}
        onClick={() => handleOpen(arrangement)}
      >
        pay now
      </Typography>
    </td>
  </tr>
))}

              </tbody>
            </table>
          </CardBody>
        </Card>
  </section>
  </>
  );
}

export default Account;
