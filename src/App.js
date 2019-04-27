import React, { Component } from "react";
import { connect } from "react-redux";
import http from "./components/services/http";
import { summaryDonations } from "./helpers";

import { updateTotalDonate, updateDonateMessage } from "./actions";
import Cards from "./components/Cards";

import { MainContainer, Message } from "./styles/style";

const mapStateToProps = ({ donate, message }) => {
  return { donate, message };
};

const mapDispatchToProps = dispatch => ({
  updateTotalDonate: amount => dispatch(updateTotalDonate(amount)),
  updateDonateMessage: message => dispatch(updateDonateMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class App extends Component {
    state = {
      amountDonate: [10, 20, 50, 100, 500],
      charities: [],
      selectedAmount: 10,
      selectedCharity: null
    };

    componentDidMount() {
      const self = this;
      http
        .get("charities")
        .then(data => self.setState({ charities: data }))
        .catch(e => alert(e));

      http
        .get("payments")
        .then(data => {
          self.props.updateTotalDonate(
            summaryDonations(
              data.map(item => !isNaN(item.amount) && item.amount)
            )
          );
        })
        .catch(e => alert(e));
    }

    handlePayChange = amount => this.setState({ selectedAmount: amount });

    handleDonate = charitiesId => this.handleClose(charitiesId);

    handleClose = (charitiesId = null, selectedAmount = 10) =>
      this.setState({
        selectedCharity: charitiesId,
        selectedAmount
      });

    handlePay = (id, amount, currency) => {
      const self = this;

      http
        .post("payments", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`
        })
        .then(() => {
          self.props.updateTotalDonate(amount);

          self.props.updateDonateMessage(`Thanks for donate ${amount}!`);

          self.handleClose();

          setTimeout(function() {
            self.props.updateDonateMessage("");
          }, 2000);
        });
    };

    render() {
      const self = this;
      const { donate, message } = self.props;
      const {
        amountDonate,
        charities,
        selectedAmount,
        selectedCharity
      } = self.state;

      return (
        <MainContainer>
          <h1>Omise Tamboon React</h1>
          <p>
            All donations: <strong>{donate}</strong>
          </p>
          <Message>{message}</Message>
          <Cards
            amountDonate={amountDonate}
            charities={charities}
            selectedAmount={selectedAmount}
            selectedCharity={selectedCharity}
            onDonate={self.handleDonate}
            onClose={self.handleClose}
            onPay={self.handlePay}
            onPaymentChange={self.handlePayChange}
          />
        </MainContainer>
      );
    }
  }
);
