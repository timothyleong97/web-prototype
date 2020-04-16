import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Divider,
  Header,
  Container,
} from "semantic-ui-react";
import axiosClient from "./importables/axiosClient";
import history from "./importables/history";


/**
 * Display page when order has been paid for.
 */
const OrderDispatched = (props) =>{ 
  const order_id = props.match.params.order_id;
  const [rider, setRider] = useState("");
  useEffect(()=> {
    if (rider === "") {
      axiosClient.post("/ridername", {order_id})
      .then(({data})=>setRider(data.driver))
    }
  })
  return (
  <Container style={{marginTop: 20}}>
  <Form style={{ marginTop: 20 }}>
    <Form.Field>
      <Header>Your rider is: </Header>
      {rider}
    </Form.Field>
  
    <Divider />
    <Header>When your rider arrives, click below!</Header>
    <Button onClick={()=> {
      history.push(`/received/${order_id}`);
    }}>Order received</Button>
  </Form>
  </Container>
);
}

export default OrderDispatched;
