import React, { Component } from "react";
import { Message, List, Segment, Container, Header, Form, Grid, Button, Select, Radio, Checkbox } from "semantic-ui-react";
import axiosClient from "./importables/axiosClient";
import history from './importables/history';
const options = [
    { key: 'f20', text: 'February 2020', value: 'feb20' },
    { key: 'm20', text: 'March 2020', value: 'mar20' },
    { key: 'a20', text: 'April 2020', value: 'apr20' },
]

const startDayOptions = [
    { key: 'sun', text: 'Sunday', value: 'sun' },
    { key: 'mon', text: 'Monday', value: 'mon' },
    { key: 'tue', text: 'Tuesday', value: 'tue' },
    { key: 'wed', text: 'Wednesday', value: 'wed' },
    { key: 'thu', text: 'Thursday', value: 'thu' },
    { key: 'fri', text: 'Friday', value: 'fri' },
    { key: 'sat', text: 'Saturday', value: 'sat' },
]
class ModifyRiderSchedule extends Component {

    handleStartDayChange = (e, { value }) => this.setState({ startDay: value })
    handleDayOneChange = (e, { value }) => this.setState({ day1: value })
    handleDayTwoChange = (e, { value }) => this.setState({ day2: value })
    handleDayThreeChange = (e, { value }) => this.setState({ day3: value })
    handleDayFourChange = (e, { value }) => this.setState({ day4: value })
    handleDayFiveChange = (e, { value }) => this.setState({ day5: value })
    handleChecked = (e, { value }) => this.setState({ checked: !this.state["checked"] })
    display = {
        startDay: "Starting day choice",
        day1: "Day one shift",
        day2: "Day two shift",
        day3: "Day three shift",
        day4: "Day four shift",
        day5: "Day five shift",
        checked: "Your agreement to change your schedule ",
    };
    state = {
        startDay: "",
        day1: "",
        day2: "",
        day3: "",
        day4: "",
        day5: "",
        checked: false,
        error: [],
    };

    render() {
        return (
            this.props.ridertype === "part-time" ?
                <Container>
                    <Grid>
                        <Grid.Row columns="equal">
                            <Grid.Column floated="left">
                                <Header as="h2" style={{ marginTop: 20 }}>Part Time</Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                :
                <Container>
                    <Grid>
                        <Grid.Row columns="equal">
                            <Grid.Column floated="left">
                                <Header as="h2" style={{ marginTop: 20 }}>Modifying your work schedule</Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Form
                        onSubmit={() => {
                            this.setState({ error: [] }); // reset the error message
                            //1. Accumulate errors
                            let errors = [];
                            for (const key of Object.keys(this.display)) {
                                if (this.state[key] === "" || this.state[key] === false) {
                                    errors.push(`${this.display[key]} cannot be empty.`);
                                }
                            }
                            //2. If error array is empty, no errors found, proceed to submit
                            if (errors.length !== 0) {
                                this.setState({ error: errors });
                            } else {
                                axiosClient.post("/modifyFullTimeRiderSchedule", {
                                    userid: this.props.username,
                                    startDay: this.state.startDay,
                                    day1: this.state.day1,
                                    day2: this.state.day2,
                                    day3: this.state.day3,
                                    day4: this.state.day4,
                                    day5: this.state.day5,
                                }).then(
                                    ({ data }) => {
                                        if (data.status === 200) { //signup successful
                                            history.push('/riderSummary');
                                        } else if (data.status === 500) {
                                            console.log("Server side error.")
                                        }
                                    }
                                ).catch((err) => console.error(err));
                            }
                        }}
                        error={this.state.error.length !== 0}>
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Select}
                                label='Starting Day'
                                options={startDayOptions}
                                onChange={this.handleStartDayChange}
                                placeholder='Starting Day'
                            />
                        </Form.Group>
                        <p>Shift 1: 10am to 2pm and 3pm to 7pm.</p>
                        <p>Shift 2: 11am to 3pm and 4pm to 8pm.</p>
                        <p>Shift 3: 12pm to 4pm and 5pm to 9pm.</p>
                        <p>Shift 4: 1pm to 5pm and 6pm to 10pm.</p>
                        <Form.Group inline>
                            <label>Day 1 Shift</label>
                            <Form.Field
                                control={Radio}
                                label='One'
                                value='1'
                                checked={this.state.day1 === '1'}
                                onChange={this.handleDayOneChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Two'
                                value='2'
                                checked={this.state.day1 === '2'}
                                onChange={this.handleDayOneChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Three'
                                value='3'
                                checked={this.state.day1 === '3'}
                                onChange={this.handleDayOneChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Four'
                                value='4'
                                checked={this.state.day1 === '4'}
                                onChange={this.handleDayOneChange}
                            />
                        </Form.Group>
                        <Form.Group inline>
                            <label>Day 2 Shift</label>
                            <Form.Field
                                control={Radio}
                                label='One'
                                value='1'
                                checked={this.state.day2 === '1'}
                                onChange={this.handleDayTwoChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Two'
                                value='2'
                                checked={this.state.day2 === '2'}
                                onChange={this.handleDayTwoChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Three'
                                value='3'
                                checked={this.state.day2 === '3'}
                                onChange={this.handleDayTwoChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Four'
                                value='4'
                                checked={this.state.day2 === '4'}
                                onChange={this.handleDayTwoChange}
                            />
                        </Form.Group>
                        <Form.Group inline>
                            <label>Day 3 Shift</label>
                            <Form.Field
                                control={Radio}
                                label='One'
                                value='1'
                                checked={this.state.day3 === '1'}
                                onChange={this.handleDayThreeChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Two'
                                value='2'
                                checked={this.state.day3 === '2'}
                                onChange={this.handleDayThreeChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Three'
                                value='3'
                                checked={this.state.day3 === '3'}
                                onChange={this.handleDayThreeChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Four'
                                value='4'
                                checked={this.state.day3 === '4'}
                                onChange={this.handleDayThreeChange}
                            />
                        </Form.Group>
                        <Form.Group inline>
                            <label>Day 4 Shift</label>
                            <Form.Field
                                control={Radio}
                                label='One'
                                value='1'
                                checked={this.state.day4 === '1'}
                                onChange={this.handleDayFourChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Two'
                                value='2'
                                checked={this.state.day4 === '2'}
                                onChange={this.handleDayFourChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Three'
                                value='3'
                                checked={this.state.day4 === '3'}
                                onChange={this.handleDayFourChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Four'
                                value='4'
                                checked={this.state.day4 === '4'}
                                onChange={this.handleDayFourChange}
                            />
                        </Form.Group>
                        <Form.Group inline>
                            <label>Day 5 Shift</label>
                            <Form.Field
                                control={Radio}
                                label='One'
                                value='1'
                                checked={this.state.day5 === '1'}
                                onChange={this.handleDayFiveChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Two'
                                value='2'
                                checked={this.state.day5 === '2'}
                                onChange={this.handleDayFiveChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Three'
                                value='3'
                                checked={this.state.day5 === '3'}
                                onChange={this.handleDayFiveChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='Four'
                                value='4'
                                checked={this.state.day5 === '4'}
                                onChange={this.handleDayFiveChange}
                            />
                        </Form.Group>
                        <Form.Field
                            control={Checkbox}
                            label='I would like to change my schedule'
                            checked={this.state.checked === true}
                            onChange={this.handleChecked}
                        />
                        <Message error header="Missing / Wrong information">
                            <Message.List>
                                {this.state.error.map((x) => (
                                    <Message.List>{x}</Message.List>
                                ))}
                            </Message.List>
                        </Message>
                        <Form.Field control={Button}>Submit</Form.Field>
                    </Form>
                </Container>
        );
    }
}

export default ModifyRiderSchedule;
