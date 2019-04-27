import React, { Fragment } from "react";
import PropTypes from "prop-types";

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
        <CloseButton onClick={() => onClose()}>
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

Card.propTypes = {
  message: PropTypes.string.isRequired,
  amountDonate: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  charity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired
  }).isRequired,
  selectedAmount: PropTypes.number.isRequired,
  selectedCharity: PropTypes.number.isRequired,
  onDonate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
  onPaymentChange: PropTypes.func.isRequired
};

export default Card;
