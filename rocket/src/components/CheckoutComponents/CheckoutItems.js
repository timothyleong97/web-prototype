import React from "react";
import { List, Grid } from "semantic-ui-react";

/**
 * Generates the list of items for checkout page (the black box).
 * @param {order: [{name, qty, price}], editable: Boolean} props
 */
const CheckoutItems = ({editable, order}) => (
  <List divided inverted relaxed>
    {order.map(({ name, price, qty }) => (
      <List.Item>
        <List.Content>
          <List.Header> {name} </List.Header>
          <Grid>
            <Grid.Row>
              <Grid.Column width={editable? 13: 14} verticalAlign="middle">
                {qty}x
              </Grid.Column>
              <Grid.Column style={{textAlign: 'right'}} width={2} verticalAlign="middle">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD"
                }).format(price * qty)}
              </Grid.Column>
              {editable ? <Grid.Column width={1} verticalAlign="middle" style={{textAlign: 'right'}}>
                <a href="/">Edit</a>
              </Grid.Column>: ''}
              
            </Grid.Row>
          </Grid>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

export default CheckoutItems;
