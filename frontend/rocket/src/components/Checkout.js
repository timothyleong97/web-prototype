import React, { useState } from "react";
import {
  Button,
  Form,
  Divider,
  Header,
  Segment,
  Grid,
} from "semantic-ui-react";
import CheckoutItems from "./CheckoutComponents/CheckoutItems";
import SubtotalAndDeliveryFee from "./CheckoutComponents/SubtotalAndDeliveryFee";
import RewardsAndPromoCode from "./CheckoutComponents/RewardsAndPromoCode";
import PaymentDropdown from "./CheckoutComponents/PaymentDropdown";
import filterOrders from "./CheckoutComponents/filterOrders";

const payment = ["Cash on Delivery", "Visa 3271", "Amex 0311"];
//menu is an array of jsons that look like
/*{
        food_item_name: 'Cold cut trio',
        price: 5.5,
        category: 'Sandwich',
        daily_limit: 10,
        num_orders_made: 0,
        min_order_amt: 20,
        rid: '2'
} and qty is an array of integers.
*/
const Checkout = ({ menu, qty }) => {
  const orders = filterOrders(menu, qty);
  const [subtotal, setSubtotal] = useState(0);
  return (
    <Form style={{ marginTop: 20 }}>
      <Form.Field>
        <Header>Deliver to</Header>
        <input placeholder="Your Address" />
      </Form.Field>
      <Divider />
      
            <Header>Order Summary</Header>
        

      <Segment inverted>
        <CheckoutItems orders={orders}  />
      </Segment>

      <RewardsAndPromoCode />

      <Divider />
      <Header>Payment Method</Header>
      <PaymentDropdown payment={payment} />

      <Divider />
      <SubtotalAndDeliveryFee orders={orders} setSubtotal={setSubtotal} />
      <Divider />
      <Grid>
        <Grid.Row>
          <Grid.Column width={15}>
            <Header>Total</Header>
          </Grid.Column>
          <Grid.Column style={{ textAlign: "right" }}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(5 + subtotal)}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider />
      <Button type="submit">Place order</Button>
    </Form>
  );
};

export default Checkout;
