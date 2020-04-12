import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

const submitLogin = (username, pswd) => {
  console.log(username, pswd)
}

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Grid textAlign="center" style={{ height: "50vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="purple" textAlign="center">
          <Image
            src="/logo.jpg"
            style={{ width: "100px", paddingBottom: "5px" }}
          />
          <Header.Content>Log-in to your account</Header.Content>
        </Header>
        <Form size="large" onSubmit={()=> submitLogin(username, password)}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={(_, { value }) => setUsername(value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(_, { value }) => setPassword(value)}
            />

            <Button color="purple" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="/">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Signin;
