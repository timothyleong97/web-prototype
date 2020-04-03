import React from "react";
import {
  Dropdown
} from "semantic-ui-react";


const PaymentDropdown = ({payment}) => (
    <Dropdown
      placeholder="Select payment method"
      fluid
      selection
      options={payment.map(p => {
        return { key: p, text: p, value: p };
      })}
    />

);

export default PaymentDropdown;
