import React from "react";
import { Grid } from "semantic-ui-react";

/**
 * Takes in the order array and returns the segment displaying
 * the subtotal and delivery fee. Delivery fee is currently a
 * flat $5 fee.
 */
const SubtotalAndDeliveryFee = ({ orders, setSubtotal, setDelivery }) => {
  const subtotal = orders.reduce(
    (prev, curr) => prev + curr[0].price * curr[1],
    0
  );

  const numItems =  orders.reduce((p,c) => p + c[1], 0);
  const deliveryFee = numItems < 2 
                      ? 5
                      : numItems < 5
                      ? 4.5
                      : numItems < 8
                      ? 4
                      : numItems < 10
                      ? 3.5
                      : 3;
  setDelivery(deliveryFee);                    
  setSubtotal(subtotal);
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={15}>Subtotal</Grid.Column>
        <Grid.Column style={{ textAlign: "right" }}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(subtotal)}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={15}>Delivery Fee</Grid.Column>
        <Grid.Column style={{ textAlign: "right" }}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(deliveryFee)}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SubtotalAndDeliveryFee;
