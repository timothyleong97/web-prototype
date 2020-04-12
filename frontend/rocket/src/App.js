import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Splash from "./components/Splash";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Catalogue from "./components/Catalogue";
import { Header, Image } from "semantic-ui-react";

const App = () => {
  const [username, setUsername] = useState("");
  const [usertype, setUsertype] = useState("");
  console.log("App sees:", username, usertype);
  //put a useEffect here to redirect users to the catalogue
  return (
    <BrowserRouter>
      <div>
        <Header as="h1" style={{ backgroundColor: "#eac012", height: "12vh" }}>
          <Link to="/">
            <Image
              src="../name.png"
              style={{
                width: 240,
                marginTop: 2,
                marginLeft: 10,
                paddingTop: 13,
                paddingBottom: -2,
              }}
            />
          </Link>
        </Header>
        <Route path="/" exact component={Splash} />
        <Route path="/signup" exact component={Signup} />
        <Route
          path="/signin/:type"
          exact
          render={(props) => (
            <Signin {...props} setUsername={setUsername} setUsertype={setUsertype} />
          )}
        />
        <Route path="/catalogue" exact component={Catalogue}/>
      </div>
    </BrowserRouter>
  );
};
export default App;
