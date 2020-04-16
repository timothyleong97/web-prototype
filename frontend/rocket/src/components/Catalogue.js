import React, { Fragment } from "react";
import {
  Container,
  Form,
  Grid,
  Loader,
  Dimmer,
  Header,
  Dropdown,
} from "semantic-ui-react";
import CatalogueItem from "./Tiles/CatalogueItem";
import axiosClient from "./importables/axiosClient";


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

  componentDidMount() {
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
    return (
      <Container style={{marginTop: 50}}>
        {this.state.cat.length === 0 || this.state.rest.length === 0 ? (
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        ) : (
          <Fragment>
            <Header>Categories</Header>
            <Grid columns = {3} padded>
              <Grid.Row>
                {this.state.cat.map((i) => (
                  <CatalogueItem className="listItem" text={i} type='cuisine' key={i} />
                ))}
              </Grid.Row>
            </Grid>

            <Header>Restaurants</Header>
            <Grid columns={3} padded>
              <Grid.Row>
                {this.state.rest.map((i) => (
                  <CatalogueItem className="listItem" text={i} type='restaurant' key={i} />
                ))}
              </Grid.Row>
            </Grid>
          </Fragment>
        )}
      </Container>
    );
  }
}

export default Catalogue;
