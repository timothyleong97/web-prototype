import React, { useEffect, useState } from "react";
import {
  Segment,
  Header,
  TextArea,
  Form,
  Rating,
  Button,
} from "semantic-ui-react";
import axiosClient from "./importables/axiosClient";
import history from "./importables/history";

const OrderReceived = (props) => {
  const [did, setDid] = useState("");
  const [restaurant_name, setR] = useState("");
  const [rr, setRR] = useState(5);
  const [dr, setDR] = useState(5);
  const [review, setReview] = useState("");
  useEffect(() => {
    if (did === "") {
      axiosClient
        .post("/receivedOrder", { order_id: props.match.params.order_id })
        .then(({ data }) => {
          setDid(data.driver);
          setR(data.restaurant_name);
        })
        .catch((err) => console.log(err));
    }
  });
  return (
    <Segment style={{ marginTop: 20, paddingTop: 20 }}>
      <Header as="h2" textAlign="center">
        Order Received
      </Header>
      <Header as="h2">Review</Header>
      <Header as="h3">{restaurant_name}</Header>

      <Form>
        <TextArea
          placeholder="Positive/negative comments about the food..."
          value={review}
          onChange={(_, { value }) => {
            setReview(value);
          }}
        />
      </Form>
      <br />
      <Rating
        maxRating={5}
        defaultRating={5}
        icon="star"
        size="huge"
        rating={rr}
        onRate={(_, { rating }) => {
          setRR(rating);
        }}
      />
      <br />

      <Header>{did}</Header>
      <br />
      <Rating
        maxRating={5}
        defaultRating={5}
        icon="star"
        size="huge"
        rating={dr}
        onRate={(_, { rating }) => {
          console.log(rating);
          setDR(rating);
        }}
      />
      <br />
      <br />
      <Button>Submit</Button>
    </Segment>
  );
};
export default OrderReceived;
