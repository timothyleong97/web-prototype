import React from "react";
import {
  List,
  Segment,
  Container,
  Header,
  Form
} from "semantic-ui-react";

const options = [
  { key: 'f20', text: 'February 2020', value: 'feb20' },
  { key: 'm20', text: 'March 2020', value: 'mar20' },
  { key: 'a20', text: 'April 2020', value: 'apr20' },
]
const RestaurantSummary = () => {
  return (
    <Container>
      <Header as="h2" style={{marginTop: 20}}>McDonalds (West Coast)</Header>
      <Form style = {{marginBottom: 20}}>
      <Form.Select
            fluid
            label='Month'
            options={options}
            placeholder='Month'
          />
      </Form>
      <Header.Subheader>April 2020</Header.Subheader>
      <Segment inverted>
        <List divided inverted relaxed>
          <List.Item>
            <List.Content>
              <List.Header>Total number of completed orders</List.Header>
              35
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                Total cost of all completed orders (excl. delivery fees)
              </List.Header>
              $6550.40
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Top 5 food items</List.Header>
              <List>
                <List.Item as="li">
                  <List.Header>Hamburger</List.Header>270 orders
                </List.Item>
                <List.Item as="li">
                  <List.Header>Fish Burger</List.Header>
                  250 orders
                </List.Item>
                <List.Item as="li">
                  <List.Header>Ice cream</List.Header>
                  170 orders
                </List.Item>
                <List.Item as="li">
                  <List.Header>Soft drink</List.Header>
                  150 orders
                </List.Item>
              </List>
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

export default RestaurantSummary;
