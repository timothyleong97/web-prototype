import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

const square = { 
    width: 200, 
    height: 150, 
    backgroundColor: 'grey', 
    borderRadius:0, 
    verticalAlign:'middle',
    paddingTop: 55,
    color: 'black'
}

const CatalogueItem = props => (
<Segment style={square}>
    <Header  as='h2' inverted textAlign='center'>
    {props.text}
    </Header>
</Segment>

)

export default CatalogueItem