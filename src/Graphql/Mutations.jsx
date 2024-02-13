import { gql } from "@apollo/client";

export const LOGIN_CUSTOMER = gql`
  mutation loginCustomer($email: String!, $password: String!) {
    loginCustomer(email: $email, password: $password) {
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
      token
      createdAt
    }
  }
`;


export const CREATE_ADMIN = gql`
  mutation createAdmin(
    $name: String!
    $surname: String!
    $phoneNumber: Int!
    $email: String!
    $password: String!
  ) {
    createAdmin(
      adminInput: {
        name: $name
        surname: $surname
        phoneNumber: $phoneNumber
        email: $email
        password: $password
      }
    ) {
      id
      name
      surname
      phoneNumber
      email
      token
      createdAt
    }
  }
`;


export const CREATE_USER_NOTIFICATIONS = gql`
  mutation createUserNotification($accountNumber: String!) {
    createUserNotification(accountNumber: $accountNumber)
  }
`;


export const UPDATE_USER_DETAILS = gql`
  mutation updateUserDetails($accountNumber: String, $firstName: String, $lastName: String,$phoneNumber: String!, $email: String!) {
    updateUserDetails(accountNumber: $accountNumber, firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, email: $email)
  }
`;

export const CREATE_PAYMENT_ARRANGEMENT = gql`
  mutation createPaymentArrangement($accountNumber: String!, $paymentDate: String!, $amount: Int!) {
    createPaymentArrangement(accountNumber: $accountNumber, paymentDate: $paymentDate, amount: $amount)
  }
`;