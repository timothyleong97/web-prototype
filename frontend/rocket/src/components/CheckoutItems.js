import React from "react";
import { List, Grid } from "semantic-ui-react";

/**
 * Generates the list of items for checkout page.
 * @param {[{name, qty, price}]} props
 */
const CheckoutItems = props => (
  <List divided inverted relaxed>
    {props.order.map(({ name, price, qty }) => (
      <List.Item>
        <List.Content>
          <List.Header> {name} </List.Header>
          <Grid>
            <Grid.Row>
              <Grid.Column width={13} verticalAlign="middle">
                {" "}
                {qty}x{" "}
              </Grid.Column>
              <Grid.Column width={2} verticalAlign="middle">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD"
                }).format(price * qty)}
              </Grid.Column>
              <Grid.Column width={1} verticalAlign="middle">
                <a href="/">Edit</a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

export default CheckoutItems;
