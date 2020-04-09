import React from "react";
import {
  Segment,
  Header,
  TextArea,
  Form,
  Rating,
  Button
} from "semantic-ui-react";

const OrderReceived = () => (
  <Segment style={{ marginTop: 20, paddingTop: 20 }}>
    <Header as='h2' textAlign='center'>Order Received</Header>
    <Header as='h2'>Review</Header>
    <Header as='h3'>McDonalds</Header>
    
    <Form>
      <TextArea placeholder="Positive/negative comments about the food..." />
    </Form>
    <br />
    <Rating maxRating={5} defaultRating={5} icon="star" size="huge" />
    <br />
    
    <Header>Mr. Izzudin</Header>
    <br />
    <Rating maxRating={5} defaultRating={5} icon="star" size="huge" />
    <br />
    <br />
    <Button>Submit</Button>
  </Segment>
);

export default OrderReceived;
