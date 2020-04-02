import React from 'react'
import {Container, Form, Grid } from 'semantic-ui-react'
import RestaurantCard from './Tiles/RestaurantCard'

/**
 * Display restaurants after searching in the catalogue
 */
class RestaurantView extends React.Component {
    state = {names : [
        {
            name: 'Burger King Jurong Point',
            img: '/restaurantsamplepics/bk.png',
            rating: '5.0'
        },
        {
            name: 'Pizza Hut Jurong Point',
            img: '/restaurantsamplepics/ph.jfif',
            rating: '4.3'
        }, 
        {
            name: 'Dominos Clementi Mall',
            img: '/restaurantsamplepics/dom.jfif',
            rating: '5.0'
        }, 
        {
            name: 'KFC JEM',
            img: '/restaurantsamplepics/kfc.png',
            rating: '5.0'
        }, 
        {
            name: 'McDonalds Jurong Point',
            img: '/restaurantsamplepics/mcd.png',
            rating: '4.7'
        }
    ]}

    render() {
        return (
            <Container>
                <Form>
                    <Form.Field>
                    <input style = {{marginTop: 30}}  placeholder='Search a restaurant' />
                    </Form.Field>
                </Form>

                <Grid columns={4}>
                    <Grid.Row>
                    {this.state.names.map(({name, img, rating}) => <RestaurantCard 
                    name = {name} 
                    img={img}
                    rating={rating}
                    />)}
                    </Grid.Row>
                </Grid>
            </Container>

        )

    }

}

export default RestaurantView