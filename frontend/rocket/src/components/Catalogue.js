import React, { Fragment } from "react";
import {
  Container,
  Form,
  Grid,
  Loader,
  Dimmer,
  Header,
<<<<<<< Updated upstream
  Icon,
} from "semantic-ui-react";
import CatalogueItem from "./Tiles/CatalogueItem";
import axiosClient from "./axiosClient";
=======
} from "semantic-ui-react";
import CatalogueItem from "./Tiles/CatalogueItem";
import axiosClient from "./axiosClient";
import { Redirect } from "react-router-dom";
>>>>>>> Stashed changes

class Catalogue extends React.Component {
  // state = {cat : [
  //     'Pizza',
  //     'Sushi',
  //     'Thai',
  //     'Western',
  //     'Asian',
  //     'Fast Food',
  //     'Desserts & Pastries'
  // ]} for CSS debugging purposes

  state = { cat: [], rest: [] }; //initialise catalogue to an empty array

<<<<<<< Updated upstream
  constructor(props) {
    super(props);

=======
  componentDidMount() {
>>>>>>> Stashed changes
    //get an array of categories from the Food_items table
    axiosClient
      .get("/categories")
      .then(({ data }) => this.setState({ cat: data }))
      .catch((e) => console.log(e));

    //get an array of restaurants from the Restaurants table
    axiosClient
      .get("/restaurants")
      .then(({ data }) => this.setState({ rest: data }))
      .catch((e) => console.log(e));
  }

  render() {
<<<<<<< Updated upstream
    return (
=======
    return this.props.usertype === "customers" ? (
>>>>>>> Stashed changes
      <Container>
        <Form>
          <Form.Field>
            <input
              style={{ marginTop: 20 }}
<<<<<<< Updated upstream
              placeholder="Search categories/restaurants"
=======
              placeholder="Search categories / restaurants"
>>>>>>> Stashed changes
            />
          </Form.Field>
        </Form>

        {this.state.cat.length === 0 || this.state.rest.length === 0 ? (
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        ) : (
          <Fragment>
            <Header>Categories</Header>
            <Grid columns="equal" padded="vertically">
              <Grid.Row columns={Math.min(3, this.state.cat.length)}>
                {this.state.cat.map((i) => (
                  <CatalogueItem className="listItem" text={i} key={i} />
                ))}
              </Grid.Row>
            </Grid>

            <Header>Restaurants</Header>
            <Grid columns="equal" padded="vertically">
              <Grid.Row columns={Math.min(3, this.state.cat.length)}>
                {this.state.rest.map((i) => (
                  <CatalogueItem className="listItem" text={i} key={i} />
                ))}
              </Grid.Row>
            </Grid>
          </Fragment>
        )}
      </Container>
<<<<<<< Updated upstream
=======
    ) : (
      <Redirect to="/" />
>>>>>>> Stashed changes
    );
  }
}

export default Catalogue;
