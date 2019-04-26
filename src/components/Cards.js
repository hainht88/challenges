import React from "react";
import { CardsContainer } from "../styles/style";

import Card from "./Card";

const Cards = ({
  charities,
  amountDonate,
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
          selectedCharity={selectedCharity}
          amountDonate={amountDonate}
          selectedAmount={selectedAmount}
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
