import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

const square = { width: 200, height: 150, backgroundColor: 'grey', borderRadius:0}

const RestaurantItem = props => (
<Segment inverted style={square}>
    <Header as='h2' inverted>
    {props.text}
    <Header.Subheader>$10.99</Header.Subheader>
    </Header>
</Segment>

)

export default RestaurantItem
