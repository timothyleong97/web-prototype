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
import { useHistory } from "react-router-dom";

/**
 * TODO: need svg of the logo with the name in it
 */

const Splash = () => {
  let history = useHistory();
  return (
    <div>
      <Container>
        <Grid style={{ marginTop: "4em" }}>
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
                onClick={() => history.push("/signup")}
              >
                Join now
                <Icon name="right arrow" />
              </Button>
              <Divider hidden />
              <Button circular size="huge">
                I already have an account
              </Button>
            </Grid.Column>
            <Grid.Column width={9}>
              <Image src="./bg.jpg" fluid />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Splash;
