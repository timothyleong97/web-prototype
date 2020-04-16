import React from "react";
import { List, Grid } from "semantic-ui-react";


/**
 * Generates the list of items for checkout page (the black box).
 * @param {orders: [{food_item_name,
        price,
        category,
        daily_limit,
        num_orders_made,
        min_order_amt,
        rid: '2'}, qty: Integer], editable: Boolean} props
 */
const CheckoutItems = ({ editable, order }) => (
  <List divided inverted relaxed>
    {order.map(arr => (
      <List.Item>
        <List.Content>
          <List.Header> {arr[0].food_item_name} </List.Header>
          <Grid>
            <Grid.Row>
              <Grid.Column width={editable ? 13 : 14} verticalAlign="middle">
                {arr[1]}x
              </Grid.Column>
              <Grid.Column
                style={{ textAlign: "right" }}
                width={2}
                verticalAlign="middle"
              >
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(arr[0].price * arr[1])}
              </Grid.Column>
              {editable ? (
                <Grid.Column
                  width={1}
                  verticalAlign="middle"
                  style={{ textAlign: "right" }}
                >
                  <a href="/">Edit</a>
                </Grid.Column>
              ) : (
                ""
              )}
            </Grid.Row>
          </Grid>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

export default CheckoutItems;
