import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "semantic-ui-react";
import history from "./importables/history";
import axiosClient from "./importables/axiosClient";

const CategoryDisplay = (props) => {
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
        .post("/cuisineitems", { name })
        .then(({ data }) => setMenu(data))
        .catch((err) => console.log(err));
    }
  });
  /**  menu looks like this : {
      food_item_name: 'Cold cut trio',
      price: 5.5,
      daily_limit: 10,
      num_orders_made: 0,
      restaurant_name: 'Subway'
    } */
  return (
    <Container>
      <Button onClick={() => history.push("/catalogue")}>
        Back to Catalogue
      </Button>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="5">{name}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Qty left</Table.HeaderCell>
            <Table.HeaderCell>Establishment</Table.HeaderCell>
            <Table.HeaderCell>Visit page</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {menu.map(
            ({
              food_item_name,
              price,
              daily_limit,
              num_orders_made,
              restaurant_name
            }) => {
              const qtyleft = daily_limit - num_orders_made;
              return (
                <Table.Row disabled = {qtyleft <= 0}>
                  <Table.Cell>{formatter.format(price)}</Table.Cell>
                  <Table.Cell>{food_item_name}</Table.Cell>
                  <Table.Cell>{qtyleft}</Table.Cell>
                  <Table.Cell>{restaurant_name}</Table.Cell>
                  <Table.Cell collapsing textAlign='right'>{qtyleft > 0 ? <Button onClick={()=>history.push(`/menu/${encodeURI(restaurant_name)}`)}>Visit</Button> : 'NA'}</Table.Cell>
                </Table.Row>
              );
            }
          )}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default CategoryDisplay;
