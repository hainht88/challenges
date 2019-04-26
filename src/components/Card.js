import React from "react";
import {
  CloseButton,
  CardDonate,
  CardImage,
  CardContent,
  CardText,
  CardButton,
  CardContainer
} from "../styles/style";

import PaymentList from "./PaymentList";

const Card = ({
  charity,
  amountDonate,
  selectedAmount,
  selectedCharity,
  onClose,
  onDonate,
  onPay
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
