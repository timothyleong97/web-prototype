import React from 'react'
import { Card, Image, Grid } from 'semantic-ui-react'

const RestaurantItem = props => (
    <Grid.Column>
  <Card style={{height: 400}}>
    <Image src={props.img} wrapped ui={false}/>
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>
        <span className='date'>${props.price}</span>
      </Card.Meta>
    </Card.Content>
  </Card>
  </Grid.Column>

)

export default RestaurantItem