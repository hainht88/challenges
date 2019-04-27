import React from "react";

import PaymentList from "./PaymentList";

import {
  CloseButton,
  CardDonate,
  CardImage,
  CardContent,
  CardText,
  CardButton,
  CardContainer
} from "../styles/style";

const Card = ({
  charity,
  amountDonate,
  selectedAmount,
  selectedCharity,
  onClose,
  onDonate,
  onPay,
  onPaymentChange
}) => (
  <CardContainer>
    {selectedCharity === charity.id && (
      <div>
        <CloseButton onClick={onClose}>
          <span>&times;</span>
        </CloseButton>
        <CardDonate>
          <p>Select the amount to donate ({charity.currency})</p>
          <PaymentList
            amountDonate={amountDonate}
            selectedAmount={selectedAmount}
            onPaymentChange={onPaymentChange}
          />
          <CardButton
            onClick={() => onPay(charity.id, selectedAmount, charity.currency)}
          >
            Pay
          </CardButton>
        </CardDonate>
      </div>
    )}

    <CardImage src={`images/${charity.image}`} />
    <CardContent>
      <CardText>{charity.name}</CardText>
      <CardButton onClick={() => onDonate(charity.id)}>Donate</CardButton>
    </CardContent>
  </CardContainer>
);

export default Card;
