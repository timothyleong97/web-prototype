import React from "react";
import {
  Header,
  Grid
} from "semantic-ui-react";


const Checkout = () => (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3} verticalAlign='middle'>
            <Header as='h4'>Reward Points Used</Header>
          </Grid.Column>
          <Grid.Column width={11}/>
          <Grid.Column width={2} style={{textAlign: 'right'}}><input /></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3} verticalAlign='middle'>
            <Header as='h4'>Promo Code</Header>
          </Grid.Column>
          <Grid.Column width={11}/>
          <Grid.Column width={2} style={{textAlign: 'right'}}><input /></Grid.Column>
        </Grid.Row>
      </Grid>
);

export default Checkout;
