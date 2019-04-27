import React from "react";

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

export default Cards;
