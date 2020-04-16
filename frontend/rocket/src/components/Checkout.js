import React, { useState, useEffect, Fragment } from "react";
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
import axiosClient from "./importables/axiosClient";
import AddressesTable from "./CheckoutComponents/AddressesTable";

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
const Checkout = ({
  menu,
  qty,
  street,
  setStreet,
  building,
  setBuilding,
  postal,
  setPostal,
  unit,
  setUnit,
  rewards,
  cid,
}) => {
  const orders = filterOrders(menu, qty);
  const [subtotal, setSubtotal] = useState(0);
  const [payment, setPayment] = useState([]);
  const [delivery, setDelivery] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [pastAddresses, setPastAddresses] = useState([]);
  

  useEffect(() => {
    if (payment.length === 0) {
      let temp = [];
      temp.push("Cash on Delivery");
      axiosClient
        .get(`/payment/${cid}`)
        .then(({ data }) => {
          temp.push(data.credit_card);
          setPayment(temp);
        })
        .catch((err) => console.log(err));

      axiosClient
        .post("/lastfive", { cid })
        .then(({ data }) => {
          setPastAddresses(data);
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <Fragment>
      <AddressesTable
        addresses={pastAddresses}
        setBuilding={setBuilding}
        setPostal={setPostal}
        setUnit={setUnit}
        setStreet={setStreet}
      />

      <Form style={{ marginTop: 20 }} onSubmit={
        ()=> {
          /**
           * 1. Make an order
           * 2. Put order in places with customer id
           * 3. Put food_items_in_order
           * 4. Give payment method to OrderDispatched
           * 5. Put delivery_fee in Places
           * 6. Get the most available driver
           * 7. Put the driver into the Deliveries field
           * 8. Send the order id in the url, and redirect to OrderDispatched
           */
        }
      }>
        <Form.Field>
          <Header>Deliver to</Header>
          <Form.Input
            fluid
            label="Street name"
            placeholder="Street name"
            value={street}
            onChange={(_, { value }) => setStreet(value)}
          />
          <Form.Input
            fluid
            label="Building name/number"
            placeholder="Building name/number"
            value={building}
            onChange={(_, { value }) => setBuilding(value)}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            fluid
            label="Postal code"
            placeholder="Postal code"
            value={postal}
            onChange={(_, { value }) => setPostal(value)}
          />
          <Form.Input
            fluid
            label="Unit number"
            placeholder="Unit number"
            value={unit}
            onChange={(_, { value }) => setUnit(value)}
          />
        </Form.Field>
        <Divider />

        <Header>Order Summary</Header>

        <Segment inverted>
          <CheckoutItems orders={orders} />
        </Segment>

        <RewardsAndPromoCode
          rewards={rewards}
          setSubtotal={setSubtotal}
          subtotal={subtotal}
          setPromoApplied={setPromoApplied}
        />

        <Divider />
        <Header>Payment Method</Header>
        <PaymentDropdown payment={payment} />

        <Divider />
        <SubtotalAndDeliveryFee
          orders={orders}
          setSubtotal={setSubtotal}
          subtotal={subtotal}
          promoApplied={promoApplied}
          setDelivery={setDelivery}
        />
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
              }).format(delivery + subtotal)}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider />
        <Button type="submit">Place order</Button>
        <Divider hidden />
      </Form>
    </Fragment>
  );
};

export default Checkout;
