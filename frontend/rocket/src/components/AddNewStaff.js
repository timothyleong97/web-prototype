import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  Container,
  Header,
  Message,
  Image,
  Dropdown,
} from "semantic-ui-react";
import axiosClient from "./importables/axiosClient";
import history from './importables/history';

class AddNewStaff extends Component {
  state = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    restaurant_name: "",
    rest: [],
    error: [],
  }; //error is an array so we can generate a <ul> of errors in the message box.
  display = {
    firstName: "First name",
    lastName: "Last name",
    userName: "Username",
    password: "Password",
    restaurant_name: "Restaurant Name",
  };

  handleTypeChange = (e, { value }) => this.setState({ type: value })

  render() {
    axiosClient
      .get("/restaurants")
      .then(({ data }) => 
        this.setState({rest: data.map(
          (i) => { return {key: i, value: i, text: i}})
        }))
      .catch((e) => console.log(e));
    
    return (
      <Container text style={{ marginTop: 30 }}>
        <Header as="h2" color="purple" textAlign="center">
          <Image
            src="/logo.jpg"
            style={{ width: "100px", paddingBottom: "5px" }}
          />
          <Header.Content>Add a new Restaurant Staff</Header.Content>
        </Header>
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
            //2. If error array is empty, no errors found, proceed to submit
            if (errors.length !== 0) {
              this.setState({ error: errors });
            } else {
              axiosClient.post("/addNewStaff", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.userName,
                password: this.state.password,
                restaurant_name: this.state.restaurant_name,
              }).then(
                  ({data})=> {
                    if (data.status === 200) { //signup successful
                      history.push('/fdsSummary');
                    } else if (data.status === 400) {  //username exists
                      this.setState({error: ["Username already exists."]});
                    } else if (data.status === 500) {
                      console.log("Server side error.")
                    }
                  }
              ).catch((err) => console.error(err));
            }
          }}
          error = {this.state.error.length !== 0}
        >
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="First name"
              placeholder="First name"
              value={this.state.firstName}
              onChange={(_, { value }) => this.setState({ firstName: value })}
            />
            <Form.Field
              control={Input}
              label="Last name"
              placeholder="Last name"
              value={this.state.lastName}
              onChange={(_, { value }) => this.setState({ lastName: value })}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Username"
              placeholder="Username"
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
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Dropdown
              label="Restaurant Name"
              fluid
              search
              selection
              options={this.state.rest} 
              value={this.state.restaurant_name}
              onChange={(_, { value }) => this.setState({ restaurant_name: value })}
              ></Form.Dropdown>
          </Form.Group>
          <Message error header="Missing / Wrong information">
            <Message.List>
              {this.state.error.map((x) => (
                <Message.List>{x}</Message.List>
              ))}
            </Message.List>
          </Message>
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </Container>
    );
  }
}

export default AddNewStaff;
