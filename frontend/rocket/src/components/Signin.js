import React, { useState } from "react";
import axiosClient from "./importables/axiosClient";
import history from './importables/history';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

//props = {setUsername: Function, setUsertype: Function}
const Signin = (props) => {
  const userType = props.match.params.type; //the /whatever that comes after /signin

  const ids = {
    fds_manager: "Rocket manager",
    restaurant_staff: "restaurant staff",
    delivery_riders: "rider",
    customers: "customer",
  }; //we use this in the error message to the user - e.g no [customer] with these credentials found

  const display = {
    fds_manager: "an FDS manager",
    restaurant_staff: "a restaurant staff",
    delivery_riders: "a rider",
    customers: "a customer",
  } // we use this in the 'Login as a ...' header

  const redirect = {
    'customers' : '/catalogue', 
    'restaurant_staff': '/restaurantSummary',
    'delivery_riders' : '/riderSummary',
    'fds_manager': '/fdsSummary'
  } // we use this to redirect the user to the relevant browsing pages after signin

  //stateful variables
  const [username, setUsername] = useState('');
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
            if (userType === 'delivery_riders') {
              axiosClient.post('/riderinfo', {userid: username}).then(
                ({data}) => {
                //data is {rider: 'part_time'}
                props.setRidertype(data.rider);
              }).catch(err => console.log(err))
            }
            history.push(redirect[userType]); //sign-in redirect here
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
          <Header.Content>Log-in as {display[userType]}</Header.Content>
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
      </Grid.Column>
    </Grid>
  );
};

export default Signin;

