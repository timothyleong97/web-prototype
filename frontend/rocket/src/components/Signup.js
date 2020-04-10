import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Container,
  Header,
  Icon
} from "semantic-ui-react";

class Signup extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    return (
      <Container text style={{ marginTop: 30 }}>
        <Header as="h2" icon textAlign="center">
          <Icon name="rocket" circular />
          <Header.Content>Become a Rocketeer</Header.Content>
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="First name"
              placeholder="First name"
            />
            <Form.Field
              control={Input}
              label="Last name"
              placeholder="Last name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              control={Input}
              label="Username"
              placeholder="Username"
            />
            <Form.Input label='Password' type='password' placeholder='Password'/>
            <Form.Field
              control={Input}
              label="Credit Card No."
              placeholder="Credit Card"
            />
          </Form.Group>
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </Container>
    );
  }
}

export default Signup;
