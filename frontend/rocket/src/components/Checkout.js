import React from "react";
import {
  Button,
  Form,
  Divider,
  Header,
  Segment,
  Grid
} from "semantic-ui-react";
import CheckoutItems from "./CheckoutComponents/CheckoutItems";
import SubtotalAndDeliveryFee from "./CheckoutComponents/SubtotalAndDeliveryFee";
import RewardsAndPromoCode from "./CheckoutComponents/RewardsAndPromoCode";
import PaymentDropdown from "./CheckoutComponents/PaymentDropdown";
const order = [
  {
    name: "Vanilla Milkshake",
    price: 2.5,
    qty: 1,
    customisations: []
  },
  {
    name: "Chicken Rice",
    price: 4.5,
    qty: 3,
    customisations: ["No chilli"]
  },
  {
    name: "Cheese Fries",
    price: 2.5,
    qty: 2,
    customisations: ["Extra Cheese"]
  }
];
const payment = ["Cash on Delivery", "Visa 3271", "Amex 0311"];
const Checkout = () => (
  <Form style={{ marginTop: 20 }}>
    <Form.Field>
      <Header>Deliver to</Header>
      <input placeholder="Your Address" />
    </Form.Field>
    <Divider />
    <Grid>
      <Grid.Row>
        <Grid.Column width={14}>
          <Header>Order Summary</Header>
        </Grid.Column>
        <Grid.Column width={2} style={{ textAlign: "right" }}>
          <a href="/" style={{ textAlign: "right" }}>
            Add items
          </a>
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <Segment inverted>
      <CheckoutItems order={order} editable />
    </Segment>

    <RewardsAndPromoCode />

    <Divider />
    <Header>Payment Method</Header>
    <PaymentDropdown payment={payment} />

    <Divider />
    <SubtotalAndDeliveryFee order={order} />
    <Divider />
    <Grid>
      <Grid.Row>
        <Grid.Column width={15}>
          <Header>Total</Header>
        </Grid.Column>
        <Grid.Column style={{textAlign: 'right'}}>
        {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(
              5 + order.reduce((prev, curr) => prev + curr.price * curr.qty, 0)
            )}
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <Divider />
    <Button type="submit">Place order</Button>
  </Form>
);

export default Checkout;
