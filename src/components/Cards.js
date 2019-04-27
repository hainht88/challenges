import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";

import { CardsContainer } from "../styles/style";

const Cards = ({
  message,
  amountDonate,
  charities,
  selectedAmount,
  selectedCharity,
  onDonate,
  onClose,
  onPay,
  onPaymentChange
}) => {
  return (
    <CardsContainer>
      {charities.map(charity => (
        <Card
          key={charity.id}
          message={message}
          amountDonate={amountDonate}
          selectedAmount={selectedAmount}
          selectedCharity={selectedCharity}
          charity={charity}
          onDonate={onDonate}
          onClose={onClose}
          onPay={onPay}
          onPaymentChange={onPaymentChange}
        />
      ))}
    </CardsContainer>
  );
};

Cards.propTypes = {
  message: PropTypes.string.isRequired,
  amountDonate: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  charities: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  selectedAmount: PropTypes.number.isRequired,
  selectedCharity: PropTypes.number.isRequired,
  onDonate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
  onPaymentChange: PropTypes.func.isRequired
};

export default Cards;
