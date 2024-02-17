import React, { useState } from "react";
import {
  Card,
  Typography,
  CardHeader,
  CardBody,

} from "@material-tailwind/react";

import jsPDF from "jspdf";
import "jspdf-autotable";
import './style.css';

import { useQuery } from "@apollo/react-hooks";
import imgSrc from "../../images/municipalityLogo.jpg";
import yeboPayLogo from "../../images/yeboPay-logo.png";
import { GET_STATEMENT } from "../../Graphql/Queries";

export function PaymentHistory() {
  const [open, setOpen] = React.useState(false);
  const [openArrangement, setOpenArrangement] = React.useState(false);
  const [openEFTModal, setOpenEFTModal] = React.useState(false);
  const [date, setDate] = useState()
  const [accountNumber, setAccountNumber] = React.useState('0000000001')
 
  const handleOpen = () => setOpen(!open);
  const handleArrangementOpen = () => setOpenArrangement(!openArrangement);
  const handleEFTOpen = () => setOpenEFTModal(!openEFTModal);

  const {
    loading: statementDataLoading,
    data: statementData,
    refetch: refetchStatementData,
  } = useQuery(GET_STATEMENT, {
    variables: { accountNumber }
  });


  let outstandingAmount = '';
  if(statementData && statementData.getStatement.closingBalance != ''){
   
    outstandingAmount = statementData.getStatement.closingBalance
  }else{
    outstandingAmount = 0;
  }

  const generatePDF = async () => {

    let left = 20;
    let top = 6;
    const imgWidth = 40;
    const imgHeight = 20;
  
    const doc = new jsPDF();
    var img = new Image();
    var yeboImg = new Image();
    img.src = imgSrc;
    yeboImg.src = yeboPayLogo;
    doc.addImage(img, "png", left, top, imgWidth, imgHeight);


  

  
    const headers = ['Name', 'Account Number', 'Last Payment Date', 'Amount'];
    const data = [[statementData?.getStatement?.consumerName, statementData?.getStatement?.accountNumber, statementData?.getStatement.lastPaymentDate, statementData?.getStatement?.lastPaymentAmount]];
  
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 40,
      theme: 'grid',
      styles: {
        fontSize: 7,
        cellPadding: 1,
        valign: 'middle',
        lineColor: [0, 0, 0]
      },
      headStyles: { fillColor: [185, 185, 185], textColor: '#000000' },
      columnStyles: {
        // Set the height of all columns to 20 (for example)
        '*': { cellHeight: 8 }
      }
    });
  
  
  
    doc.save('payment-history.pdf'); 
  };
  return (
    <>
 
    <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                My Previous Activity
              </Typography>
        
            </div>
       
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["name", "account number", "Last Payment date", "last Amount", ].map(
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
                              onClick={() => generatePDF()}
                              style={{cursor: 'pointer', color: "#3855E5"}}
                            >
                             Download
                            </Typography>
                           
                        </td>
                       
                        
                      </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
 

  </>
  );
}

export default PaymentHistory;
