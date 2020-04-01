import React from 'react'
import {Container, Form } from 'semantic-ui-react'

class BrowseRestaurants extends React.Component {
    state = {names : ['Pizza', 'Sushi', 'Thai', 'Mos Burger', 'McDonalds']}
    render() {
        return (
            <Container>
                <Form>
                    <Form.Field>
                    <input style = {{marginTop: 30}}  placeholder='Search a restaurant' />
                    </Form.Field>
                </Form>
                
                
            </Container>

        )

    }

}

export default BrowseRestaurants