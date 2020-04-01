import React, { Component } from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  TextArea,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

class Signup extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
      <Container text style = {{marginTop: 30}}>
      <Header as='h2' icon textAlign='center'>
      <Icon name='rocket' circular />
      <Header.Content>Become a Rocketeer</Header.Content>
    </Header>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='First name'
            placeholder='First name'
          />
          <Form.Field
            control={Input}
            label='Last name'
            placeholder='Last name'
          />
          <Form.Field
            control={Select}
            label='Gender'
            options={options}
            placeholder='Gender'
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            control={Input}
            label='Credit Card No.'
            placeholder='Credit Card'
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          label='About'
          placeholder='Tell us more about you...'
        />
        <Form.Field
          control={Checkbox}
          label='I agree to the Terms and Conditions'
        />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
      </Container>
    )
  }
}

export default Signup