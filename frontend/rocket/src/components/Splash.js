import React from "react";
import {
  Header,
  Image,
  Container,
  Grid,
  Button,
  Icon,
  Divider
} from "semantic-ui-react";
<<<<<<< Updated upstream
import { useHistory, Link } from "react-router-dom";
=======
import { useHistory, Link, Redirect } from "react-router-dom";
>>>>>>> Stashed changes

const footerStyle = {
  fontSize: "2em",
  color: "black",
  textDecoration: "underline"
}

<<<<<<< Updated upstream
const Splash = () => {
  let history = useHistory();
  return (
=======
const Splash = (props) => {
  let history = useHistory();
  return (
    props.usertype === "customers" ?
    <Redirect to = '/catalogue' />
    :
>>>>>>> Stashed changes
    <div>
      <Container style={{ height: "71.2vh" }}>
        <Grid style={{ marginTop: "5em" }}>
          <Grid.Row>
            <Grid.Column width={7}>
              <Header
                style={{
                  fontSize: "5em",
                  fontWeight: "bold",
                  marginBottom: -10
                }}
                as="h1"
              >
                Food at lightspeed.
              </Header>
              <Header
                as="h2"
                style={{
                  fontWeight: "thin",
                  fontSize: "1.3em",
                  width: 470,
                  marginBottom: 35
                }}
              >
                Forget waiting times and annoying lines. Rocket has
                ground-breakingly fast food delivery speeds.
              </Header>
              <Button
                circular
                size="huge"
                color="purple"
                onClick={() => history.replace("/signup")}
              >
                Join now
                <Icon name="right arrow" />
              </Button>
              <Divider hidden />
              <Button circular size="huge"  onClick={() => history.replace("/signin/customers")}>
                I already have an account
              </Button>
            </Grid.Column>
            <Grid.Column width={9}>
              <Image src="./bg.jpg" fluid />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <footer
        style={{
          backgroundColor: "#eac012",
          height: "10vh",
          position: "fixed",
          bottom: 0,
          width: "100vw"
        }}
      >
        <Grid columns='equal'>
          <Grid.Row style={{ marginTop: 20 }}>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column >
              <Link
                to="/"
                style={footerStyle}
              >
                Rocket Rider
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link
                to="/"
                style={footerStyle}
              >
                Restaurant Staff
              </Link>
            </Grid.Column>
            <Grid.Column
              style={footerStyle}
            >
              FDS Manager
            </Grid.Column>
            <Grid.Column width={7}></Grid.Column>
          </Grid.Row>
        </Grid>
      </footer>
    </div>
  );
};

export default Splash;
