import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Header,
  Icon,
} from "semantic-ui-react";
import history from "./importables/history";
import axiosClient from "./importables/axiosClient";

const RestaurantMenu = (props) => {
  const name = decodeURI(props.match.params.name);
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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
        food_item_name: 'Cold cut trio',
        price: 5.5,
        category: 'Sandwich',
        daily_limit: 10,
        num_orders_made: 0,
        min_order_amt: 20,
        rid: '2'
    } */
  return (
    <Container>
      <Button onClick={() => history.push("/catalogue")}>
        Back to Catalogue
      </Button>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">{name}</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">
              View Basket {orders.length}{" "}
              {orders.length === 1 ? "item" : "items"} $5.00
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="1">
              Minimum order amt:{" "}
              {formatter.format(menu.length > 0 ? menu[0].min_order_amt : 0)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Qty left</Table.HeaderCell>
            <Table.HeaderCell collapsing textAlign="center">
              Order
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {menu.map((item) => {
            const qtyleft = item.daily_limit - item.num_orders_made;
            return (
              <Table.Row disabled={qtyleft <= 0} key={item.food_item_name}>
                <Table.Cell>{formatter.format(item.price)}</Table.Cell>
                <Table.Cell>{item.food_item_name}</Table.Cell>
                <Table.Cell>{qtyleft}</Table.Cell>
                <Table.Cell collapsing textAlign="center">
                  {qtyleft > 0 ? (
                    <Modal
                      trigger={
                        <Button
                          onClick={() => {
                            //request for list of options
                            axiosClient
                              .post("/option", {
                                rid: item.rid,
                                food_item_name: item.food_item_name,
                              })
                              .then(({ data }) => {
                                console.log(data);
                              });
                          }}
                        >
                          Order
                        </Button>
                      }
                      closeIcon
                    >
                      <Header
                        icon="shopping basket"
                        content="Choose quantity/options"
                      />
                      <Modal.Content>
                     
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color="red">
                          <Icon name="remove" /> No
                        </Button>
                        <Button color="green">
                          <Icon name="checkmark" /> Yes
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  ) : (
                    "NA"
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default RestaurantMenu;
