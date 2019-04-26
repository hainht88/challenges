import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import fetch from "isomorphic-fetch";

import { summaryDonations } from "./helpers";

const MainContainer = styled.div`
  width: 100%;
  margin: 1rem auto;
  font-size: 1rem;

  @media (min-width: 992px) {
    width: 900px;
  }
`;

const Cards = styled.div`
  @media (min-width: 992px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const Card = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: relative;

  @media (min-width: 992px) {
    width: 435px;
    margin: 10px 0;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;

  @media (min-width: 992px) {
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardDonate = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DonateList = styled.div`
  display: flex;
  flex-direction: row;

  > label {
    margin: 0 5px;

    > input[type="radio"]:checked {
      background-color: #4398f0;
    }
  }
`;

const CardButton = styled.button`
  border: 1px solid #4398f0;
  border-radius: 5px;
  background-color: transparent;
  color: #4398f0;
  width: 80px;
  height: 30px;
  cursor: pointer;
  margin: 1rem;

  &:hover {
    color: #fff;
    background-color: #4398f0;
  }
`;

const CardText = styled.div`
  margin: 1rem;
`;

const Message = styled.div`
  color: red;
  margin: 1rem 0;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

export default connect(state => state)(
  class App extends Component {
    constructor(props) {
      super();

      this.state = {
        charities: [],
        selectedAmount: 10
      };
    }

    componentDidMount() {
      const self = this;
      fetch("http://localhost:3001/charities")
        .then(function(resp) {
          return resp.json();
        })
        .then(function(data) {
          self.setState({ charities: data });
        });

      fetch("http://localhost:3001/payments")
        .then(function(resp) {
          return resp.json();
        })
        .then(function(data) {
          self.props.dispatch({
            type: "UPDATE_TOTAL_DONATE",
            amount: summaryDonations(
              data.map(item => !isNaN(item.amount) && item.amount)
            )
          });
        });
    }

    render() {
      const self = this;
      const cards = this.state.charities.map(function(item, i) {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
          <label key={j}>
            <input
              type="radio"
              name="payment"
              onClick={function() {
                self.setState({ selectedAmount: amount });
              }}
            />
            {amount}
          </label>
        ));

        return (
          <Card key={i}>
            <CardDonate>
              <p>{item.name}</p>
              <DonateList>{payments}</DonateList>
              <CardButton
                onClick={handlePay.call(
                  self,
                  item.id,
                  self.state.selectedAmount,
                  item.currency
                )}
              >
                Pay
              </CardButton>
            </CardDonate>
            <CardImage src={`images/${item.image}`} />
            <CardContent>
              <CardText>{item.name}</CardText>
              <CardButton>Donate</CardButton>
            </CardContent>
          </Card>
        );
      });

      const { donate, message } = this.props;

      return (
        <MainContainer>
          <h1>Tamboon React</h1>
          <p>All donations: {donate}</p>
          <Message>{message}</Message>
          <Cards>{cards}</Cards>
        </MainContainer>
      );
    }
  }
);

function handlePay(id, amount, currency) {
  const self = this;
  return function() {
    fetch("http://localhost:3001/payments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`
    })
      .then(function(resp) {
        return resp.json();
      })
      .then(function() {
        self.props.dispatch({
          type: "UPDATE_TOTAL_DONATE",
          amount
        });
        self.props.dispatch({
          type: "UPDATE_MESSAGE",
          message: `Thanks for donate ${amount}!`
        });

        setTimeout(function() {
          self.props.dispatch({
            type: "UPDATE_MESSAGE",
            message: ""
          });
        }, 2000);
      });
  };
}
