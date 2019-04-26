import React, { Component } from "react";
import { connect } from "react-redux";
import fetch from "isomorphic-fetch";

import { summaryDonations } from "./helpers";

import Cards from "./components/Cards";

import { MainContainer, Message } from "./styles/style";

export default connect(state => state)(
  class App extends Component {
    constructor(props) {
      super();

      this.state = {
        amountDonate: [10, 20, 50, 100, 500],
        charities: [],
        selectedAmount: 10,
        selectedCharity: null
      };
    }

    componentDidMount() {
      const self = this;

      fetch("http://localhost:3001/charities")
        .then(resp => resp.json())
        .then(data => self.setState({ charities: data }))
        .catch(e => alert(e));

      fetch("http://localhost:3001/payments")
        .then(resp => resp.json())
        .then(data =>
          self.props.dispatch({
            type: "UPDATE_TOTAL_DONATE",
            amount: summaryDonations(
              data.map(item => !isNaN(item.amount) && item.amount)
            )
          })
        )
        .catch(e => alert(e));
    }

    handleDonate = charitiesId => this.handleClose(charitiesId);

    handleClose = (charitiesId = null, selectedAmount = 10) =>
      this.setState({
        selectedCharity: charitiesId,
        selectedAmount
      });

    handlePay = (id, amount, currency) => {
      const self = this;

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

          self.handleClose();

          setTimeout(function() {
            self.props.dispatch({
              type: "UPDATE_MESSAGE",
              message: ""
            });
          }, 2000);
        });
    };

    render() {
      const self = this;
      const {
        charities,
        amountDonate,
        selectedAmount,
        selectedCharity
      } = this.state;
      const { donate, message } = this.props;

      return (
        <MainContainer>
          <h1>Omise Tamboon React</h1>
          <p>
            All donations: <strong>{donate}</strong>
          </p>
          <Message>{message}</Message>
          <Cards
            charities={charities}
            amountDonate={amountDonate}
            selectedAmount={selectedAmount}
            selectedCharity={selectedCharity}
            onDonate={self.handleDonate}
            onClose={self.handleClose}
            onPay={self.handlePay}
          />
        </MainContainer>
      );
    }
  }
);
