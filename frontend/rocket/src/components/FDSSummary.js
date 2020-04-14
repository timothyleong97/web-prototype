import React from "react";
import { Container, Header, Form, List, Segment, Button, Grid } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";

const options = [
  { key: "f20", text: "February 2020", value: "feb20" },
  { key: "m20", text: "March 2020", value: "mar20" },
  { key: "a20", text: "April 2020", value: "apr20" },
];
const FDSSummary = () => {
  let history = useHistory();
  return (
    <Container>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" style={{ marginTop: 20 }}>
              Rocket Stats
            </Header></Grid.Column>
          <Grid.Column>
            <Button
              circular
              color="purple"
              size="huge"
              onClick={() => history.replace("/addNewRider")}
            >
              Add A New Rider
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              circular
              color="purple"
              size="huge"
              onClick={() => history.replace("/addNewStaff")}
            >
              Add A New Restaurant Staff
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
