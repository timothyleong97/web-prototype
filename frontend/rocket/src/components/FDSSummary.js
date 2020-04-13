import React from "react";
import { Container, Header, Form, List, Segment } from "semantic-ui-react";

const options = [
  { key: "f20", text: "February 2020", value: "feb20" },
  { key: "m20", text: "March 2020", value: "mar20" },
  { key: "a20", text: "April 2020", value: "apr20" },
];
const FDSSummary = () => {
  return (
    <Container>
      <Header as="h2" style={{ marginTop: 20 }}>
        Rocket Stats
      </Header>
      <Form style={{ marginBottom: 20 }}>
        <Form.Select
          fluid
          label="Month"
          options={options}
          placeholder="Month"
        />
      </Form>
      <Header.Subheader>April 2020</Header.Subheader>
      <Segment inverted>
        <List divided inverted relaxed>
          <List.Item>
            <List.Content>
              <List.Header>Total number of new customers</List.Header>
              35
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Total number of orders</List.Header>
              6000
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Total cost of all orders</List.Header>
              $205,000
            </List.Content>
          </List.Item>
        </List>
      </Segment>
      <Header>Promotional Campaigns</Header>
      <Segment inverted>
        <List divided inverted relaxed>
          <List.Item>
            <List.Content>
              <List.Header>Promo code 10%OFF</List.Header>
              <List>
                <List.Item>
                  <List.Header>Duration</List.Header>30 days
                </List.Item>
                <List.Item>
                  <List.Header>Average Orders / Day</List.Header>
                  35
                </List.Item>
              </List>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    </Container>
  );
};

export default FDSSummary;