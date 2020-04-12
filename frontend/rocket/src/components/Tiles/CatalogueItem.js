import React from 'react'
import { Header, Segment, Grid } from 'semantic-ui-react'

const square = { 
    width: 300, 
    height: 150, 
    backgroundColor: '#bfbfbf', 
    borderRadius:0, 
    verticalAlign:'middle',
    paddingTop: 55,
    color: 'black',
    marginTop: 15
}

/**
 * Tile used to display the different cuisines in Catalogue
 * @param {text} props 
 */
const CatalogueItem = props => (
    <Grid.Column>
        <Segment style={square}>
            <Header  as='h2' textAlign='center'>
                {props.text}
            </Header>
        </Segment>
    </Grid.Column>
)

export default CatalogueItem