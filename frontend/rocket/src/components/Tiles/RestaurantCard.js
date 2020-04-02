import React from 'react'
import { Card, Icon, Image, Grid } from 'semantic-ui-react'

/**
 * Displays a restaurant in a card. Used in RestaurantView to display
 * search results of restaurants.
 * @param {name, img, rating} props 
 */

const RestaurantCard = (props) => (
<Grid.Column>
    <Card style={{marginTop: 15}}>
        <Image src={props.img} wrapped ui={false}/>
        <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
        <Icon name='star' />
            {props.rating}
        </Card.Content>
    </Card>
</Grid.Column>
)

export default RestaurantCard