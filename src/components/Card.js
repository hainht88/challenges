import React, { Fragment } from "react";

import PaymentList from "./PaymentList";

import { Message } from "../styles/style";

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
  message,
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
          {message === "" ? (
            <Fragment>
              <p>Select the amount to donate ({charity.currency})</p>
              <PaymentList
                message={message}
                amountDonate={amountDonate}
                selectedAmount={selectedAmount}
                onPaymentChange={onPaymentChange}
              />
              <CardButton
                onClick={() =>
                  onPay(charity.id, selectedAmount, charity.currency)
                }
              >
                Pay
              </CardButton>
            </Fragment>
          ) : (
            <Message>{message}</Message>
          )}
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
