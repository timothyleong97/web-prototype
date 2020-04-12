import React, { useState } from "react";
import axiosClient from "./axiosClient";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

const Signin = (props) => {
  const userType = props.match.params.type; //the /whatever that comes after /signin

  let ids = {
    fds_manager: "Rocket manager",
    restaurant_staff: "restaurant staff",
    delivery_riders: "rider",
    customers: "customer",
  }; //we use this in the error message to the user - e.g no [customer] with these credentials found

  //stateful variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const submitLogin = () => {
    setErr(false);
    if (username !== "" && password !== "") {
      axiosClient
        .post(`/login/${userType}`, { username, password })
        .then(({ data }) => {
          if (data.status === 401) {
            setErr(true);
          } else if (data.status === 200) {
            props.setUsername(username);
            props.setUsertype(userType);
            setErr(false);
          }
        })
        .catch((err) => console.error(err)); // query formed wrongly
    }
  };

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
        <Form size="large" onSubmit={submitLogin} error={err}>
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
            <Message
              error
              header="Wrong Credentials"
              content={`No ${ids[userType]} found with these credentials. Try again.`}
            />

            <Button
              color="purple"
              fluid
              size="large"
              disabled={username === "" || password === ""}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="/signup">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Signin;
