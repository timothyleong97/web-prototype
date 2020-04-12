import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  Container,
  Header,
<<<<<<< Updated upstream
  Icon
} from "semantic-ui-react";

class Signup extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });
=======
  Icon,
  Message,
} from "semantic-ui-react";
import validator from "validator";
import axiosClient from "./axiosClient";
import history from './history';

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    cc: "",
    error: [],
  }; //error is an array so we can generate a <ul> of errors in the message box.
  display = {
    firstName: "First name",
    lastName: "Last name",
    userName: "Username",
    password: "Password",
    cc: "Credit Card",
  };
>>>>>>> Stashed changes

  render() {
    return (
      <Container text style={{ marginTop: 30 }}>
        <Header as="h2" icon textAlign="center">
          <Icon name="rocket" circular />
          <Header.Content>Become a Rocketeer</Header.Content>
        </Header>
<<<<<<< Updated upstream
        <Form>
=======
        <Form
          onSubmit={() => {
            this.setState({ error: [] }); // reset the error message
            //1. Accumulate errors
            let errors = [];
            for (const key of Object.keys(this.display)) {
              if (this.state[key] === "") {
                errors.push(`${this.display[key]} cannot be empty.`);
              }
            }
            if (
              this.state.cc !== "" &&
              !validator.isCreditCard(this.state.cc)
            ) {
              errors.push("Credit card number is not valid.");
            }
            //2. If error array is empty, no errors found, proceed to submit
            if (errors.length !== 0) {
              this.setState({ error: errors });
            } else {
              axiosClient.post("/signup", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.userName,
                credit_card: this.state.cc,
                password: this.state.password,
              }).then(
                  ({data})=> {
                    if (data.status === 200) { //signup successful
                      this.props.setUsername(this.state.userName);
                      this.props.setUsertype('customers');
                      history.push('/catalogue');
                    } else if (data.status === 400) {  //username exists
                      this.setState({error: ["Username already exists."]});
                    } else if (data.status === 500) {
                      console.log("Server side error.")
                    }
                  }
              ).catch((err) => console.error(err));
            }
          }}
          error={this.state.error.length !== 0}
        >
>>>>>>> Stashed changes
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="First name"
              placeholder="First name"
<<<<<<< Updated upstream
=======
              value={this.state.firstName}
              onChange={(_, { value }) => this.setState({ firstName: value })}
>>>>>>> Stashed changes
            />
            <Form.Field
              control={Input}
              label="Last name"
              placeholder="Last name"
<<<<<<< Updated upstream
=======
              value={this.state.lastName}
              onChange={(_, { value }) => this.setState({ lastName: value })}
>>>>>>> Stashed changes
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              control={Input}
              label="Username"
              placeholder="Username"
<<<<<<< Updated upstream
            />
            <Form.Input label='Password' type='password' placeholder='Password'/>
=======
              value={this.state.userName}
              onChange={(_, { value }) => this.setState({ userName: value })}
            />
            <Form.Input
              label="Password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(_, { value }) => this.setState({ password: value })}
            />
>>>>>>> Stashed changes
            <Form.Field
              control={Input}
              label="Credit Card No."
              placeholder="Credit Card"
<<<<<<< Updated upstream
            />
          </Form.Group>
=======
              value={this.state.cc}
              onChange={(_, { value }) => this.setState({ cc: value })}
            />
          </Form.Group>
          <Message error header="Missing / Wrong information">
            <Message.List>
              {this.state.error.map((x) => (
                <Message.List>{x}</Message.List>
              ))}
            </Message.List>
          </Message>
>>>>>>> Stashed changes
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </Container>
    );
  }
}

export default Signup;
