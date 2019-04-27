import React from "react";
import PropTypes from "prop-types";

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

PaymentList.propTypes = {
  amountDonate: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  selectedAmount: PropTypes.number.isRequired,
  onPaymentChange: PropTypes.func.isRequired
};

export default PaymentList;
