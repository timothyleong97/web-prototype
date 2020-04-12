import React from "react";
import {
  Button,
  Form,
  Divider,
  Header,
  Grid,
  Segment
} from "semantic-ui-react";
import CheckoutItems from "./CheckoutComponents/CheckoutItems";
import SubtotalAndDeliveryFee from "./CheckoutComponents/SubtotalAndDeliveryFee";


const order = [
  {
    name: "Vanilla Milkshake",
    price: 2.5,
    qty: 1,
    customisations: []
  },
  {
    name: "Chicken Rice",
    price: 3.5,
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
/**
 * Display page when order has been paid for.
 */
const OrderDispatched = () => (
  <Form style={{ marginTop: 20 }}>
    <Form.Field>
      <Header>Delivering to</Header>
      18 College Ave E, Cinnamon West Learn Lobe, Singapore 138593
    </Form.Field>
    <Divider />

    <Header>Order Summary</Header>

    <Segment inverted>
      <CheckoutItems order={order} />
    </Segment>

    <Grid>
        <Grid.Row>
          <Grid.Column width={3} verticalAlign='middle'>
            <Header as='h4'>Reward Points Used</Header>
          </Grid.Column>
          <Grid.Column width={11}/>
          <Grid.Column width={2} style={{textAlign: 'right'}}>100</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3} verticalAlign='middle'>
            <Header as='h4'>Promo Code</Header>
          </Grid.Column>
          <Grid.Column width={11}/>
          <Grid.Column width={2} style={{textAlign: 'right'}}>NIL</Grid.Column>
        </Grid.Row>
      </Grid>

    <Divider />
    <Header>Payment Method</Header>
    <div>Cash on Delivery</div>

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
    <Button>Order received</Button>
  </Form>
);

export default OrderDispatched;
