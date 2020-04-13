import React from "react";
import { List, Segment, Container, Header, Form } from "semantic-ui-react";
const options = [
    { key: 'f20', text: 'February 2020', value: 'feb20' },
    { key: 'm20', text: 'March 2020', value: 'mar20' },
    { key: 'a20', text: 'April 2020', value: 'apr20' },
  ]
const RiderSummary = () => {
  return (
    <Container>
      <Header as="h2" style={{marginTop: 20}}>Aaron Tan</Header>
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
              <List.Header>Number of deliveries made</List.Header>
              35
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Total hours worked</List.Header>
              40
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Deliveries made per week</List.Header>
              <List>
                <List.Item as="li">
                  <List.Header>Week 1</List.Header>27 orders
                </List.Item>
                <List.Item as="li">
                  <List.Header>Week 2</List.Header>
                  25 orders
                </List.Item>
                <List.Item as="li">
                  <List.Header>Week 3</List.Header>
                  30 orders
                </List.Item>
                <List.Item as="li">
                  <List.Header>Week 4</List.Header>
                  15 orders
                </List.Item>
              </List>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
      <Header>Monthly Salary</Header>
      <Segment inverted>
        <List divided inverted relaxed>
          <List.Item>
            <List.Content>
              <List.Header>April 2020</List.Header>
              <List>
                <List.Item>
                  <List.Header>Base</List.Header>$600
                </List.Item>
                <List.Item>
                  <List.Header>Commission</List.Header>
                  $2000
                </List.Item>
              </List>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    </Container>
  );
};

export default RiderSummary;
