import React, { useState, useEffect, Fragment } from "react";
import { Container, Table, Button, Statistic, Divider } from "semantic-ui-react";
import history from "./importables/history";
import axiosClient from "./importables/axiosClient";
import Checkout from "./Checkout";

const RestaurantMenu = (props) => {
  const name = decodeURI(props.match.params.name);
  const [menu, setMenu] = useState([]);
  const [qty, setQty] = useState([]);
  const [goCheckout, setGoCheckout] = useState(false);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const getSubTotal = () => {
    let t = 0;
    for (let i = 0; i < menu.length; i++) {
      t += qty[i] * menu[i].price;
    }
    return t;
  };
  const generateTable = (menuarr) => {
    let temp = [];
    for (let i = 0; i < menuarr.length; i++) {
      let { daily_limit, num_orders_made, food_item_name, price } = menuarr[i];
      let qtyleft = daily_limit - num_orders_made;
      qtyleft -= qty[i]; // the currently selected amount
      temp.push(
        <Table.Row disabled={qtyleft <= 0} key={food_item_name}>
          <Table.Cell collapsing>{formatter.format(price)}</Table.Cell>
          <Table.Cell>{food_item_name}</Table.Cell>
          <Table.Cell>{qtyleft}</Table.Cell>
          <Table.Cell collapsing textAlign="center">
            {qtyleft > 0 ? (
              <Fragment>
                <Button.Group>
                  <Button
                    disabled={qty[i] === 0}
                    icon="minus"
                    onClick={() => {
                      qty[i] = qty[i] - 1;
                      setQty([...qty]);
                    }}
                  />
                  <Button
                    disabled={qtyleft === 0}
                    icon="plus"
                    onClick={() => {
                      qty[i] += 1;
                      setQty([...qty]);
                    }}
                  />
                </Button.Group>
                <Statistic size="mini" style={{ marginLeft: 5 }}>
                  <Statistic.Value>{qty[i]}</Statistic.Value>
                </Statistic>
              </Fragment>
            ) : (
              "NA"
            )}
          </Table.Cell>
        </Table.Row>
      );
    }
    return temp;
  };

  useEffect(() => {
    if (menu.length === 0) {
      //only the first time
      axiosClient
        .post("/fooditems", { name })
        .then(({ data }) => {
          let t = [];
          for (let i = 0; i < data.length; i++) {
            t.push(0);
          }
          setQty(t); //initialise all to 0
          setMenu(data);
        })
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
  return goCheckout ? (
    <Container>
      <Button onClick={()=> setGoCheckout(false)}>Back to menu</Button>
      <Checkout menu={menu} qty={qty}/>
    </Container>
  ) : (
    <Container>
      <Button onClick={() => history.push("/catalogue")}>
        Back to Catalogue
      </Button>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">{name}</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">
              Subtotal:{" "}
              {formatter.format(getSubTotal())}
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="1">
              Minimum order amt:{" "}
              {formatter.format(menu.length > 0 ? menu[0].min_order_amt : 0)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>Price</Table.HeaderCell>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Qty left</Table.HeaderCell>
            <Table.HeaderCell collapsing textAlign="center">
              Order
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{generateTable(menu)}</Table.Body>
      </Table>
      <Button
        disabled={
          menu.length > 0 ? getSubTotal() < menu[0].min_order_amt : true
        }
        onClick={() => {setGoCheckout(true)}}
      >
        Proceed to checkout
      </Button>
      <Divider />
    </Container>
  );
};

export default RestaurantMenu;
