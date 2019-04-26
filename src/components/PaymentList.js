import React from "react";
import { DonateList } from "../styles/style";

const PaymentList = ({ amountDonate, selectedAmount, onPaymentChange }) => {
  return (
    <DonateList>
      {amountDonate.map((amount, index) => (
        <label key={index}>
          <input
            type="radio"
            name="payment"
            onChange={() => onPaymentChange(amount)}
            checked={selectedAmount === amount}
          />
          {amount}
        </label>
      ))}
    </DonateList>
  );
};

export default PaymentList;
