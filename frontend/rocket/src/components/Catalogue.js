import React from 'react'
import {Container, Form, Grid } from 'semantic-ui-react'
import CatalogueItem from './Tiles/CatalogueItem'

class Catalogue extends React.Component {
    state = {cat : [
        'Pizza',
        'Sushi',
        'Thai',
        'Western',
        'Asian',
        'Fast Food',
        'Desserts & Pastries'
    ]}
    render() {
        return (
            <Container>
                <Form>
                    <Form.Field>
                    <input style = {{marginTop: 30}}  placeholder='Search by category' />
                    </Form.Field>
                </Form>
                <Grid columns='equal' padded='vertically'>
                    <Grid.Row columns={3}>
                        { this.state.cat.map(i => <CatalogueItem className='listItem' text = {i}/>)}
                    </Grid.Row>
                </Grid>
                
            </Container>

        )

    }

}

export default Catalogue