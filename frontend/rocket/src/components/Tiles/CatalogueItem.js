import React from 'react'
import { Header, Segment, Grid } from 'semantic-ui-react'
import axiosClient from '../importables/axiosClient';
import history from '../importables/history';
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
 * Tile used to display the different cuisines in Catalogue. type is either 'restaurant' or 'cuisine'
 * @param {text} props 
 */


const getCuisine = (name) => {
    axiosClient.post('/cuisineitems', {name})
    .then(({data})=>console.log(data))
    .catch(err=> console.log(err))
}
const CatalogueItem = ({text, type}) => (
    <Grid.Column>
        <Segment style={square} onClick={()=>type === "restaurant" ? history.push(`/menu/${encodeURI(text)}`) : getCuisine(text)}>
            <Header  as='h2' textAlign='center'>
                {text}
            </Header>
        </Segment>
    </Grid.Column>
)

export default CatalogueItem