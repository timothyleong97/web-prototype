import React, { useState } from "react";
import { Header, Grid, Form, Button } from "semantic-ui-react";

const RewardsAndPromoCode = ({ rewards }) => {
  const [pointsUsed, setPointsUsed] = useState(0);
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3} verticalAlign="middle">
          <Header as="h4">Reward Points Used (max {rewards})</Header>
        </Grid.Column>
        <Grid.Column width={11} />
        <Grid.Column width={2} style={{ textAlign: "right" }}>
          <Form>
            <Form.Input
              fluid
              value={pointsUsed}
              onChange={(_, { value }) =>
                setPointsUsed(
                  Number.isInteger(value)
                    ? value > rewards
                      ? rewards
                      : value
                    : rewards
                )
              }
            />
          </Form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3} verticalAlign="middle">
          <Header as="h4">Promo Code</Header>
        </Grid.Column>
        <Grid.Column width={11} />
        <Grid.Column width={2} style={{ textAlign: "right" }}>
          <Form>
            <Form.Input fluid />
          </Form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3} verticalAlign="middle"></Grid.Column>
        <Grid.Column width={11} />
        <Grid.Column width={2} style={{ textAlign: "right" }}>
          <Button>Apply Promo Code</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RewardsAndPromoCode;
