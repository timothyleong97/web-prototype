import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Splash from "./components/Splash";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
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
                marginTop: 4,
                marginLeft: 14,
                paddingTop: 15
              }}
            />
          </Link>
        </Header>
        <Route path="/" exact component={Splash} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Signin} />
      </div>
    </BrowserRouter>
  );
};
export default App;
