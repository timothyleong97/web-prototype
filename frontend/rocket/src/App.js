import React, { useState, Fragment } from "react";
import { Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Splash from "./components/Splash";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Catalogue from "./components/Catalogue";
import { Header, Image, Grid, Button } from "semantic-ui-react";
import history from "./components/importables/history";
import RestaurantSummary from "./components/RestaurantSummary";
import RiderSummary from "./components/RiderSummary";
import RestaurantMenu from "./components/RestaurantMenu";
import FDSSummary from "./components/FDSSummary";
import EditProfile from "./components/EditProfile";
import CategoryDisplay from "./components/CategoryDisplay";

const homePages = {
  customers: "/catalogue",
  delivery_riders: "/riderSummary",
  restaurant_staff: "/restaurantSummary",
  fds_manager: "/fdsSummary",
};

//Couch protected routes in the Fragments.
const renderUserRoutes = (username, usertype) => {
  if (usertype === "customers") {
    return (
      <Fragment>
        <Route
          path="/catalogue"
          exact
          render={(props) => (
            <Catalogue {...props} username={username} usertype={usertype} />
          )}
        />
        <Route
          path="/menu/:name"
          exact
          render={(props) => <RestaurantMenu {...props} username={username} />}
        />
        <Route
          path="/categories/:name"
          exact
          render={(props) => <CategoryDisplay {...props} username={username} />}
        />
      </Fragment>
    );
  } else if (usertype === "delivery_riders") {
    return (
      <Fragment>
        <Route
          path="/riderSummary"
          exact
          render={(props) => (
            <RiderSummary {...props} username={username} usertype={usertype} />
          )}
        />
      </Fragment>
    );
  } else if (usertype === "restaurant_staff") {
    return (
      <Fragment>
        <Route
          path="/restaurantSummary"
          exact
          render={(props) => (
            <RestaurantSummary
              {...props}
              username={username}
              usertype={usertype}
            />
          )}
        />
      </Fragment>
    );
  } else if (usertype === "fds_manager") {
    return (
      <Fragment>
        <Route
          path="/fdsSummary"
          exact
          render={(props) => (
            <FDSSummary {...props} username={username} usertype={usertype} />
          )}
        />
      </Fragment>
    );
  } else {
    return "";
  }
};

const App = () => {
  const [username, setUsername] = useState("");
  const [usertype, setUsertype] = useState("");
  console.log("App.js can see username:", username, "usertype:", usertype);
  return (
    <Router history={history}>
      <div>
        <Header as="h1" style={{ backgroundColor: "#eac012", height: "14vh" }}>
          <Grid>
            <Grid.Row>
              <Grid.Column floated="left" width={3} verticalAlign="middle">
                <Link to={usertype === "" ? "/" : homePages[usertype]}>
                  <Image
                    src="../name.png"
                    style={{
                      width: 240,
                      marginLeft: 10,
                      paddingTop: 13,
                      marginBottom: 5,
                    }}
                  />
                </Link>
              </Grid.Column>

              {username !== "" ? (
                <Fragment>
                  <Grid.Column
                    width={3}
                    floated="left"
                    verticalAlign="middle"
                    style={{ marginLeft: 520, marginTop: 10 }}
                  >
                    <Header as="h2">Welcome, {username}.</Header>
                  </Grid.Column>
                  <Grid.Column
                    floated="right"
                    verticalAlign="middle"
                    style={{marginTop: 10 }}
                    width={4}
                  >
                    {" "}
                    <EditProfile setAppUsername={setUsername} />
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
          <Route path="/" exact component={Splash} />
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
          {renderUserRoutes(username, usertype)}

          <Route
            render={() => {
              return (
                <Redirect to={usertype === "" ? "/" : homePages[usertype]} />
              );
            }}
          />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
