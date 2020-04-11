import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Splash from "./components/Splash";
import Signup from "./components/Signup";
import { Header, Image } from "semantic-ui-react";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header as="h1" style={{ backgroundColor: "#eac012", height: "10vh" }}>
          <Link to="/">
            <Image
              src="./name.png"
              style={{
                width: "10%",
                marginTop: 0,
                marginLeft: 10,
                paddingTop: 12
              }}
            />
          </Link>
        </Header>
        <Route path="/" exact component={Splash} />
        <Route path="/signup" exact component={Signup} />
      </div>
    </BrowserRouter>
  );
};
export default App;

/**
 * 1. Route up everything so far
 * 2. Clean up the stock code and remake the splash
 * 3. Set up the database for that idiot
 * 4. Turn app into a class
 * 5. Use react router for auth redirect or use redirect with a ternary
 */
