import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option
} from "@material-tailwind/react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_STATEMENT } from "../../Graphql/Queries";
import { UPDATE_USER_DETAILS } from "../../Graphql/Mutations";


import { Link } from "react-router-dom";

export function Profile() {
  const [accountNumber, setAccountNumber] = React.useState('0000000001')
  const [accountNumberEdit, setAccountNumberEdit ] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const[username, setUsername] = useState("")
  const[password, setPassword] = useState()


  const {
    loading: statementDataLoading,
    data: statementData,
    refetch: refetchStatementData,
  } = useQuery(GET_STATEMENT, {
    variables: { accountNumber },

  });



  
  const [updateUserDetails, { loading: updateUserDetailsLoading }] = useMutation(UPDATE_USER_DETAILS, {
    update(_, result) {
      if (result.data.updateUserDetails) {
        alert("UserDetails Updated Successfully!")
      } else {
        console.log("Error while updating user details!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });

  const handleEditSubmit = async () => {
    if(firstName && lastName && phoneNumber && email && accountNumberEdit)
    updateUserDetails({
      variables: {
        accountNumber: accountNumberEdit,
        firstName,
        lastName,
        phoneNumber,
        email,
      },
    })}




  useEffect(() => {
    if (statementData && statementData.getStatement) {
      setAccountNumberEdit(statementData.getStatement.accountNumber);
      setFirstName(statementData.getStatement.firstName);
      setLastName(statementData.getStatement.lastName);
      setPhoneNumber(statementData.getStatement.phoneNumber);
      setEmail(statementData.getStatement.email);
    }
  }, [statementData]);



  return (
    <section className="m-8 flex gap-4">
     <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Edit Details</Typography>
         
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your name
            </Typography>
            <Input
              size="lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}

            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your surname
            </Typography>
            <Input
              size="lg"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="Mills"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
       
       
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your phone number
            </Typography>
            <Input
              size="lg"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="0724586301"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Prefered Communication Method
            </Typography>
            <div >
       <Select label="Select">
         <Option>Email</Option>
         <Option>Phone</Option>
         <Option>Watsapp</Option>
       </Select>
     </div>
               <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="******"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              disabled
              onChange={(e) => setPassword(e.target.value)}
            />

          
          </div>

          <Button variant="text"
          onClick={() => handleEditSubmit()}
          className="mr-1"
            color="white"  style={{marginTop: 12,backgroundColor: "#3855E5"}}>
            Save 
          </Button>


        </form>

      </div>

  </section>
  );
}

export default Profile;
