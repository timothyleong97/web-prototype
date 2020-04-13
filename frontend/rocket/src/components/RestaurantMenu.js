import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "semantic-ui-react";
import history from "./importables/history";
import axiosClient from "./importables/axiosClient";

const RestaurantMenu = (props) => {
  const name = decodeURI(props.match.params.name);
  const [menu, setMenu] = useState([]);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  useEffect(() => {
    if (menu.length === 0) {
      //only the first time
      axiosClient
        .post("/fooditems", { name })
        .then(({ data }) => setMenu(data))
        .catch((err) => console.log(err));
    }
  });
  /**  menu looks like this : {
        "food_item_name": "Chicken Rice",
        "price": 2.5,
        "category": "Chinese",
        "daily_limit": 50,
        "num_orders_made": 0,
        "min_order_amt": 10
    } */
  return (
    <Container>
      <Button onClick={() => history.push("/catalogue")}>
        Back to Catalogue
      </Button>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3">{name}</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">Minimum order amt: {formatter.format(menu.length > 0 ? menu[0].min_order_amt : 0)}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Qty left</Table.HeaderCell>
            <Table.HeaderCell  collapsing textAlign='center'>Order</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {menu.map(
            ({
              food_item_name,
              price,
              daily_limit,
              num_orders_made,
            }) => {
              const qtyleft = daily_limit - num_orders_made;
              return (
                <Table.Row disabled = {qtyleft <= 0}>
                  <Table.Cell>{formatter.format(price)}</Table.Cell>
                  <Table.Cell>{food_item_name}</Table.Cell>
                  <Table.Cell>{qtyleft}</Table.Cell>
                  <Table.Cell collapsing textAlign='center'>{qtyleft > 0 ? <Button onClick={()=>console.log(props.username, name, food_item_name)}>Order</Button> : 'NA'}</Table.Cell>
                </Table.Row>
              );
            }
          )}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default RestaurantMenu;
