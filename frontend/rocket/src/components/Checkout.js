import React from "react";
import { Button, Form, Divider, Header, Segment } from "semantic-ui-react";
import CheckoutItems from "./CheckoutItems";
const order = [
  {
    name: "Vanilla Milkshake",
    price: 2.50,
    qty: 1,
    customisations: []
  },
  {
    name: "Chicken Rice",
    price: 3.50,
    qty: 3,
    customisations: ["No chilli"]
  },
  {
    name: "Cheese Fries",
    price: 2.50,
    qty: 2,
    customisations: ["Extra Cheese"]
  }
];
const Checkout = () => (
  <Form style={{ marginTop: 20 }}>
    <Form.Field>
      <Header>Deliver to</Header>
      <input placeholder="Your Address" />
    </Form.Field>
    <Divider />
    <Header>My Order</Header>
    <Segment inverted>
      <CheckoutItems order={order} />
    </Segment>
    <Divider />
    <Button type="submit">Place order</Button>
  </Form>
);

export default Checkout;
