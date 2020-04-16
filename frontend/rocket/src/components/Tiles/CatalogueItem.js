import React from 'react'
import { Header, Segment, Grid } from 'semantic-ui-react'
import './styles.css';

import history from '../importables/history';
const square = { 
    width: 300, 
    height: 150, 
    backgroundColor: '#f2f2f2', 
    borderRadius:10, 
    verticalAlign:'middle',
    paddingTop: 55,
    color: 'black',
    marginTop: 15,
}

/**
 * Tile used to display the different cuisines in Catalogue. type is either 'restaurant' or 'cuisine'
 * @param {text} props 
 */

const CatalogueItem = ({text, type}) => (
    <Grid.Column>
        <Segment className='clickable' style={square} onClick={()=>type === "restaurant" ? history.push(`/menu/${encodeURI(text)}`) : history.push(`/categories/${encodeURI(text)}`)}>
            <Header  as='h2' textAlign='center'>
                {text}
            </Header>
        </Segment>
    </Grid.Column>
)

export default CatalogueItem