import React from 'react'
import {
  Container,
  Grid,
  Header,
  Image,
  Menu,
} from 'semantic-ui-react'
import RestaurantItem from './Tiles/RestaurantItem'

const RestaurantMenu = props => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image circular size='mini' src='/logo.jpg' style={{ marginRight: '1.5em' }} />
          Rocket
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>{props.restaurant}</Header>
        <p>Minimum Order: ${props.minOrder}</p>
      <a href='/'>
        See all reviews
      </a>
      <Grid columns={2} style={{marginTop:8}}>

      {props.items.map(({name, img, price}) => <RestaurantItem name={name} img = {img} price = {price}/>)}
      </Grid>
    </Container>
  </div>
)

export default RestaurantMenu