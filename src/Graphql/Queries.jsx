import { gql } from "@apollo/client";


export const GET_STATEMENT= gql`
  query getStatement($accountNumber: String!) {
    getStatement(accountNumber: $accountNumber) {
      accountNumber
      consumerName
      firstName
      lastName
      phoneNumber
      email
      province
      lastPaymentAmount
      lastPaymentDate
      idNumber
      indigentExpiry
      date
      isIndigent
      indigentApplicationDate
      town
      suburb
      ward
      street
      postalAddress1
      postalAddress2
      postalAddress3
      postalCode
      vatNumber
      deposit
      marketValue
      erfNumber
      taxNumber
      days120
      days90
      days60
      days30
      current
      closingBalance
      openingBalance
      createdAt
    }
  }
`;

export const GET_METER_READINGS = gql`
  query getMeterReadings($accountNumber: String!) {
    getMeterReadings(accountNumber: $accountNumber) {
      id
      accountNumber
      meterNumber
      type
      oldRead
      newRead
      consumption
      leviedAmount
      createdAt
    }
  }
`;