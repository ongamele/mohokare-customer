import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_METER_READINGS } from "../../Graphql/Queries";

import { Link } from "react-router-dom";

export function MeterReadings() {
  const [accountNumber, setAccountNumber] = React.useState('0000000001')

  
  const {
    loading: meterDataLoading,
    data: meterData,
    refetch: refetchMeterData,
  } = useQuery(GET_METER_READINGS, {
    variables: { accountNumber },

  });

  {meterData && console.log(JSON.stringify(meterData))}

  return (
    <>
    <section className="m-8 flex gap-4">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-4">Meter Readings</Typography>

      
      </div>
      
      

  </section>
  
  <Card>
      
      <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Readings
        </Typography>
      </CardHeader>
      <CardBody className="px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
              <tr>
             
                {["Meter Number", "Type", "Old Reading", "New Reading", "Levied Amount"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>

              <tr >
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                  {meterData && meterData?.getMeterReadings?.meterNumber|| ''}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                  {meterData && meterData?.getMeterReadings?.type|| ''}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                  {meterData && meterData?.getMeterReadings?.oldRead|| ''}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                  {meterData && meterData?.getMeterReadings?.newRead|| ''}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                  {meterData && meterData?.getMeterReadings?.leviedAmount|| ''}
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

export default MeterReadings;
