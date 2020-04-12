import React, { useState, Fragment } from "react";
import { Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Splash from "./components/Splash";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Catalogue from "./components/Catalogue";
import { Header, Image, Grid, Button } from "semantic-ui-react";
import history from "./components/history";

const App = () => {
  const [username, setUsername] = useState("");
  const [usertype, setUsertype] = useState("");
  console.log("App.js can see username:", username, "usertype:", usertype);
  return (
    <Router history={history}>
      <div>
        <Header as="h1" style={{ backgroundColor: "#eac012", height: "12vh" }}>
          <Grid>
            <Grid.Row>
              <Grid.Column floated="left" width={4} verticalAlign="middle">
                <Link to="/">
                  <Image
                    src="../name.png"
                    style={{
                      width: 240,
                      marginLeft: 10,
                      paddingTop: 13,
                      paddingBottom: -2,
                    }}
                  />
                </Link>
              </Grid.Column>
              {username !== "" ? (
                <Fragment>
                  <Grid.Column
                    width={3}
                    floated="right"
                    verticalAlign="bottom"
                    style={{ marginRight: -480, marginBottom: 9 }}
                  >
                    <Header as="h2">Welcome, {username}</Header>
                  </Grid.Column>
                  <Grid.Column
                    floated="right"
                    verticalAlign="bottom"
                    style={{ marginRight: 75 }}
                    width={1}
                  >
                    <Button
                      color="orange"
                      circular
                      size="big"
                      onClick={() => {
                        setUsername("");
                        setUsertype("");
                      }}
                    >
                      Logout
                    </Button>
                  </Grid.Column>
                </Fragment>
              ) : (
                ""
              )}
            </Grid.Row>
          </Grid>
        </Header>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Splash {...props} username={username} usertype={usertype} />
            )}
          />
          <Route
            path="/signup"
            exact
            render={(props) => (
              <Signup
                {...props}
                setUsername={setUsername}
                setUsertype={setUsertype}
              />
            )}
          />
          <Route
            path="/signin/:type"
            exact
            render={(props) => (
              <Signin
                {...props}
                setUsername={setUsername}
                setUsertype={setUsertype}
              />
            )}
          />
          <Route
            path="/catalogue"
            exact
            render={(props) => (
              <Catalogue {...props} username={username} usertype={usertype} />
            )}
          />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
