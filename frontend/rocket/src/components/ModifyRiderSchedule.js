import React, { Component } from "react";
import { Message, Label, Container, Header, Form, Grid, Button, Select, Radio, Checkbox } from "semantic-ui-react";
import axiosClient from "./importables/axiosClient";
import history from './importables/history';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    // PART TIME

    handleWeekChange = date => { this.setState({ startWeek: date }); };
    handleMon10 = (e, { value }) => this.setState({ mon10: !this.state["mon10"] })
    handleMon11 = (e, { value }) => this.setState({ mon11: !this.state["mon11"] })
    handleMon12 = (e, { value }) => this.setState({ mon12: !this.state["mon12"] })
    handleMon13 = (e, { value }) => this.setState({ mon13: !this.state["mon13"] })
    handleMon14 = (e, { value }) => this.setState({ mon14: !this.state["mon14"] })
    handleMon15 = (e, { value }) => this.setState({ mon15: !this.state["mon15"] })
    handleMon16 = (e, { value }) => this.setState({ mon16: !this.state["mon16"] })
    handleMon17 = (e, { value }) => this.setState({ mon17: !this.state["mon17"] })
    handleMon18 = (e, { value }) => this.setState({ mon18: !this.state["mon18"] })
    handleMon19 = (e, { value }) => this.setState({ mon19: !this.state["mon19"] })
    handleMon20 = (e, { value }) => this.setState({ mon20: !this.state["mon20"] })
    handleMon21 = (e, { value }) => this.setState({ mon21: !this.state["mon21"] })
    handleTue10 = (e, { value }) => this.setState({ tue10: !this.state["tue10"] })
    handleTue11 = (e, { value }) => this.setState({ tue11: !this.state["tue11"] })
    handleTue12 = (e, { value }) => this.setState({ tue12: !this.state["tue12"] })
    handleTue13 = (e, { value }) => this.setState({ tue13: !this.state["tue13"] })
    handleTue14 = (e, { value }) => this.setState({ tue14: !this.state["tue14"] })
    handleTue15 = (e, { value }) => this.setState({ tue15: !this.state["tue15"] })
    handleTue16 = (e, { value }) => this.setState({ tue16: !this.state["tue16"] })
    handleTue17 = (e, { value }) => this.setState({ tue17: !this.state["tue17"] })
    handleTue18 = (e, { value }) => this.setState({ tue18: !this.state["tue18"] })
    handleTue19 = (e, { value }) => this.setState({ tue19: !this.state["tue19"] })
    handleTue20 = (e, { value }) => this.setState({ tue20: !this.state["tue20"] })
    handleTue21 = (e, { value }) => this.setState({ tue21: !this.state["tue21"] })
    handleWed10 = (e, { value }) => this.setState({ wed10: !this.state["wed10"] })
    handleWed11 = (e, { value }) => this.setState({ wed11: !this.state["wed11"] })
    handleWed12 = (e, { value }) => this.setState({ wed12: !this.state["wed12"] })
    handleWed13 = (e, { value }) => this.setState({ wed13: !this.state["wed13"] })
    handleWed14 = (e, { value }) => this.setState({ wed14: !this.state["wed14"] })
    handleWed15 = (e, { value }) => this.setState({ wed15: !this.state["wed15"] })
    handleWed16 = (e, { value }) => this.setState({ wed16: !this.state["wed16"] })
    handleWed17 = (e, { value }) => this.setState({ wed17: !this.state["wed17"] })
    handleWed18 = (e, { value }) => this.setState({ wed18: !this.state["wed18"] })
    handleWed19 = (e, { value }) => this.setState({ wed19: !this.state["wed19"] })
    handleWed20 = (e, { value }) => this.setState({ wed20: !this.state["wed20"] })
    handleWed21 = (e, { value }) => this.setState({ wed21: !this.state["wed21"] })
    handleThu10 = (e, { value }) => this.setState({ thu10: !this.state["thu10"] })
    handleThu11 = (e, { value }) => this.setState({ thu11: !this.state["thu11"] })
    handleThu12 = (e, { value }) => this.setState({ thu12: !this.state["thu12"] })
    handleThu13 = (e, { value }) => this.setState({ thu13: !this.state["thu13"] })
    handleThu14 = (e, { value }) => this.setState({ thu14: !this.state["thu14"] })
    handleThu15 = (e, { value }) => this.setState({ thu15: !this.state["thu15"] })
    handleThu16 = (e, { value }) => this.setState({ thu16: !this.state["thu16"] })
    handleThu17 = (e, { value }) => this.setState({ thu17: !this.state["thu17"] })
    handleThu18 = (e, { value }) => this.setState({ thu18: !this.state["thu18"] })
    handleThu19 = (e, { value }) => this.setState({ thu19: !this.state["thu19"] })
    handleThu20 = (e, { value }) => this.setState({ thu20: !this.state["thu20"] })
    handleThu21 = (e, { value }) => this.setState({ thu21: !this.state["thu21"] })
    handleFri10 = (e, { value }) => this.setState({ fri10: !this.state["fri10"] })
    handleFri11 = (e, { value }) => this.setState({ fri11: !this.state["fri11"] })
    handleFri12 = (e, { value }) => this.setState({ fri12: !this.state["fri12"] })
    handleFri13 = (e, { value }) => this.setState({ fri13: !this.state["fri13"] })
    handleFri14 = (e, { value }) => this.setState({ fri14: !this.state["fri14"] })
    handleFri15 = (e, { value }) => this.setState({ fri15: !this.state["fri15"] })
    handleFri16 = (e, { value }) => this.setState({ fri16: !this.state["fri16"] })
    handleFri17 = (e, { value }) => this.setState({ fri17: !this.state["fri17"] })
    handleFri18 = (e, { value }) => this.setState({ fri18: !this.state["fri18"] })
    handleFri19 = (e, { value }) => this.setState({ fri19: !this.state["fri19"] })
    handleFri20 = (e, { value }) => this.setState({ fri20: !this.state["fri20"] })
    handleFri21 = (e, { value }) => this.setState({ fri21: !this.state["fri21"] })
    handleSat10 = (e, { value }) => this.setState({ sat10: !this.state["sat10"] })
    handleSat11 = (e, { value }) => this.setState({ sat11: !this.state["sat11"] })
    handleSat12 = (e, { value }) => this.setState({ sat12: !this.state["sat12"] })
    handleSat13 = (e, { value }) => this.setState({ sat13: !this.state["sat13"] })
    handleSat14 = (e, { value }) => this.setState({ sat14: !this.state["sat14"] })
    handleSat15 = (e, { value }) => this.setState({ sat15: !this.state["sat15"] })
    handleSat16 = (e, { value }) => this.setState({ sat16: !this.state["sat16"] })
    handleSat17 = (e, { value }) => this.setState({ sat17: !this.state["sat17"] })
    handleSat18 = (e, { value }) => this.setState({ sat18: !this.state["sat18"] })
    handleSat19 = (e, { value }) => this.setState({ sat19: !this.state["sat19"] })
    handleSat20 = (e, { value }) => this.setState({ sat20: !this.state["sat20"] })
    handleSat21 = (e, { value }) => this.setState({ sat21: !this.state["sat21"] })
    handleSun10 = (e, { value }) => this.setState({ sun10: !this.state["sun10"] })
    handleSun11 = (e, { value }) => this.setState({ sun11: !this.state["sun11"] })
    handleSun12 = (e, { value }) => this.setState({ sun12: !this.state["sun12"] })
    handleSun13 = (e, { value }) => this.setState({ sun13: !this.state["sun13"] })
    handleSun14 = (e, { value }) => this.setState({ sun14: !this.state["sun14"] })
    handleSun15 = (e, { value }) => this.setState({ sun15: !this.state["sun15"] })
    handleSun16 = (e, { value }) => this.setState({ sun16: !this.state["sun16"] })
    handleSun17 = (e, { value }) => this.setState({ sun17: !this.state["sun17"] })
    handleSun18 = (e, { value }) => this.setState({ sun18: !this.state["sun18"] })
    handleSun19 = (e, { value }) => this.setState({ sun19: !this.state["sun19"] })
    handleSun20 = (e, { value }) => this.setState({ sun20: !this.state["sun20"] })
    handleSun21 = (e, { value }) => this.setState({ sun21: !this.state["sun21"] })

    // FULL TIME
    handleMonthChange = date => { this.setState({ startMonth: date }); };
    handleStartDayChange = (e, { value }) => this.setState({ startDay: value })
    handleDayOneChange = (e, { value }) => this.setState({ day1: value })
    handleDayTwoChange = (e, { value }) => this.setState({ day2: value })
    handleDayThreeChange = (e, { value }) => this.setState({ day3: value })
    handleDayFourChange = (e, { value }) => this.setState({ day4: value })
    handleDayFiveChange = (e, { value }) => this.setState({ day5: value })
    handleChecked = (e, { value }) => this.setState({ checked: !this.state["checked"] })
    partTimeDisplay = {
        startWeek: "Week",
    };
    fullTimeDisplay = {
        startDay: "Starting day choice",
        day1: "Day one shift",
        day2: "Day two shift",
        day3: "Day three shift",
        day4: "Day four shift",
        day5: "Day five shift",
        checked: "Your agreement to change your schedule ",
    };
    state = {
        mon10: false,
        mon11: false,
        mon12: false,
        mon13: false,
        mon14: false,
        mon15: false,
        mon16: false,
        mon17: false,
        mon18: false,
        mon19: false,
        mon20: false,
        mon21: false,
        tue10: false,
        tue11: false,
        tue12: false,
        tue13: false,
        tue14: false,
        tue15: false,
        tue16: false,
        tue17: false,
        tue18: false,
        tue19: false,
        tue20: false,
        tue21: false,
        wed10: false,
        wed11: false,
        wed12: false,
        wed13: false,
        wed14: false,
        wed15: false,
        wed16: false,
        wed17: false,
        wed18: false,
        wed19: false,
        wed20: false,
        wed21: false,
        thu10: false,
        thu11: false,
        thu12: false,
        thu13: false,
        thu14: false,
        thu15: false,
        thu16: false,
        thu17: false,
        thu18: false,
        thu19: false,
        thu20: false,
        thu21: false,
        fri10: false,
        fri11: false,
        fri12: false,
        fri13: false,
        fri14: false,
        fri15: false,
        fri16: false,
        fri17: false,
        fri18: false,
        fri19: false,
        fri20: false,
        fri21: false,
        sat10: false,
        sat11: false,
        sat12: false,
        sat13: false,
        sat14: false,
        sat15: false,
        sat16: false,
        sat17: false,
        sat18: false,
        sat19: false,
        sat20: false,
        sat21: false,
        sun10: false,
        sun11: false,
        sun12: false,
        sun13: false,
        sun14: false,
        sun15: false,
        sun16: false,
        sun17: false,
        sun18: false,
        sun19: false,
        sun20: false,
        sun21: false,
        startWeek: new Date(),

        startDay: "",
        day1: "",
        day2: "",
        day3: "",
        day4: "",
        day5: "",
        checked: false,
        startMonth: new Date(),
        error: [],
    };

    render() {
        console.log(this.props.ridertype);
        return (
            this.props.ridertype == "part_time" ?
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
                            for (const key of Object.keys(this.partTimeDisplay)) {
                                if (this.state[key] === "" || this.state[key] === false) {
                                    errors.push(`${this.partTimeDisplay[key]} cannot be empty.`);
                                }
                            }
                            //2. If error array is empty, no errors found, proceed to submit
                            if (errors.length !== 0) {
                                this.setState({ error: errors });
                            } else {
                                let mon = 0
                                for (let i = 10; i < 22; i++) {
                                    mon *= 10
                                    mon += this.state["mon" + i] ? 1 : 0
                                }
                                let tue = 0
                                for (let i = 10; i < 22; i++) {
                                    tue *= 10
                                    tue += this.state["tue" + i] ? 1 : 0
                                }
                                let wed = 0
                                for (let i = 10; i < 22; i++) {
                                    wed *= 10
                                    wed += this.state["wed" + i] ? 1 : 0
                                }
                                let thu = 0
                                for (let i = 10; i < 22; i++) {
                                    thu *= 10
                                    thu += this.state["thu" + i] ? 1 : 0
                                }
                                let fri = 0
                                for (let i = 10; i < 22; i++) {
                                    fri *= 10
                                    fri += this.state["fri" + i] ? 1 : 0
                                }
                                let sat = 0
                                for (let i = 10; i < 22; i++) {
                                    sat *= 10
                                    sat += this.state["sat" + i] ? 1 : 0
                                }
                                let sun = 0
                                for (let i = 10; i < 22; i++) {
                                    sun *= 10
                                    sun += this.state["sun" + i] ? 1 : 0
                                }
                                axiosClient.post("/modifyPartTimeRiderSchedule", {
                                    userid: this.props.username,
                                    week_of_work: this.state.startWeek,
                                    mon: mon,
                                    tue: tue,
                                    wed: wed,
                                    thu: thu,
                                    fri: fri,
                                    sat: sat,
                                    sun: sun,
                                }).then(
                                    ({ data }) => {
                                        if (data.status === 200) { //signup successful
                                            history.push('/riderSummary');
                                        } else if (data.status === 500) {
                                            errors.push(data.message)
                                            errors.push(`You can only submit a schedule for the future. You cannot submit the same work schedule twice.`)
                                            console.log("Server side error.")
                                        }
                                    }
                                ).catch((err) => {
                                    errors.push(err.message);
                                    errors.push(`You can only submit a schedule for the future. You cannot submit the same work schedule twice.`);
                                    console.error(err)
                                });
                            }
                        }}
                        error={this.state.error.length !== 0}>
                        <Form.Group widths='equal'>
                            <label>Week: </label>
                            <DatePicker
                                selected={this.state.startWeek}
                                onChange={this.handleWeekChange}
                            />
                        </Form.Group>
                        <Form.Group inline widths='equal'>
                            <label>Time:</label>
                            <Label size="huge"> 1000 </Label>
                            <Label size="huge"> 1100 </Label>
                            <Label size="huge"> 1200 </Label>
                            <Label size="huge"> 1300 </Label>
                            <Label size="huge"> 1400 </Label>
                            <Label size="huge"> 1500 </Label>
                            <Label size="huge"> 1600 </Label>
                            <Label size="huge"> 1700 </Label>
                            <Label size="huge"> 1800 </Label>
                            <Label size="huge"> 1900 </Label>
                            <Label size="huge"> 2000 </Label>
                            <Label size="huge"> 2100 </Label>
                        </Form.Group>
                        <Form.Group inline widths='equal'>
                            <label>MON</label>
                            <Form.Field control={Checkbox}
                                checked={this.state.mon10 === true}
                                onChange={this.handleMon10}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.mon11 === true}
                                onChange={this.handleMon11}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.mon12 === true}
                                onChange={this.handleMon12}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.mon13 === true}
                                onChange={this.handleMon13}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.mon14 === true}
                                onChange={this.handleMon14}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.mon15 === true}
                                onChange={this.handleMon15}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.mon16 === true}
                                onChange={this.handleMon16}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.mon17 === true}
                                onChange={this.handleMon17}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.mon18 === true}
                                onChange={this.handleMon18}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.mon19 === true}
                                onChange={this.handleMon19}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.mon20 === true}
                                onChange={this.handleMon20}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.mon21 === true}
                                onChange={this.handleMon21}
                            />
                        </Form.Group>
                        <Form.Group inline widths='equal'>
                            <label>TUE</label>
                            <Form.Field control={Checkbox}
                                checked={this.state.tue10 === true}
                                onChange={this.handleTue10}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.tue11 === true}
                                onChange={this.handleTue11}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.tue12 === true}
                                onChange={this.handleTue12}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.tue13 === true}
                                onChange={this.handleTue13}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.tue14 === true}
                                onChange={this.handleTue14}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.tue15 === true}
                                onChange={this.handleTue15}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.tue16 === true}
                                onChange={this.handleTue16}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.tue17 === true}
                                onChange={this.handleTue17}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.tue18 === true}
                                onChange={this.handleTue18}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.tue19 === true}
                                onChange={this.handleTue19}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.tue20 === true}
                                onChange={this.handleTue20}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.tue21 === true}
                                onChange={this.handleTue21}
                            />
                        </Form.Group>

                        <Form.Group inline widths='equal'>
                            <label>WED</label>
                            <Form.Field control={Checkbox}
                                checked={this.state.wed10 === true}
                                onChange={this.handleWed10}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.wed11 === true}
                                onChange={this.handleWed11}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.wed12 === true}
                                onChange={this.handleWed12}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.wed13 === true}
                                onChange={this.handleWed13}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.wed14 === true}
                                onChange={this.handleWed14}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.wed15 === true}
                                onChange={this.handleWed15}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.wed16 === true}
                                onChange={this.handleWed16}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.wed17 === true}
                                onChange={this.handleWed17}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.wed18 === true}
                                onChange={this.handleWed18}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.wed19 === true}
                                onChange={this.handleWed19}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.wed20 === true}
                                onChange={this.handleWed20}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.wed21 === true}
                                onChange={this.handleWed21}
                            />
                        </Form.Group>
                        <Form.Group inline widths='equal'>
                            <label>THU</label>
                            <Form.Field control={Checkbox}
                                checked={this.state.thu10 === true}
                                onChange={this.handleThu10}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.thu11 === true}
                                onChange={this.handleThu11}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.thu12 === true}
                                onChange={this.handleThu12}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.thu13 === true}
                                onChange={this.handleThu13}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.thu14 === true}
                                onChange={this.handleThu14}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.thu15 === true}
                                onChange={this.handleThu15}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.thu16 === true}
                                onChange={this.handleThu16}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.thu17 === true}
                                onChange={this.handleThu17}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.thu18 === true}
                                onChange={this.handleThu18}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.thu19 === true}
                                onChange={this.handleThu19}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.thu20 === true}
                                onChange={this.handleThu20}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.thu21 === true}
                                onChange={this.handleThu21}
                            />
                        </Form.Group>
                        <Form.Group inline widths='equal'>
                            <label>FRI</label>
                            <Form.Field control={Checkbox}
                                checked={this.state.fri10 === true}
                                onChange={this.handleFri10}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.fri11 === true}
                                onChange={this.handleFri11}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.fri12 === true}
                                onChange={this.handleFri12}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.fri13 === true}
                                onChange={this.handleFri13}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.fri14 === true}
                                onChange={this.handleFri14}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.fri15 === true}
                                onChange={this.handleFri15}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.fri16 === true}
                                onChange={this.handleFri16}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.fri17 === true}
                                onChange={this.handleFri17}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.fri18 === true}
                                onChange={this.handleFri18}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.fri19 === true}
                                onChange={this.handleFri19}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.fri20 === true}
                                onChange={this.handleFri20}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.fri21 === true}
                                onChange={this.handleFri21}
                            />
                        </Form.Group>
                        <Form.Group inline widths='equal'>
                            <label>SAT</label>
                            <Form.Field control={Checkbox}
                                checked={this.state.sat10 === true}
                                onChange={this.handleSat10}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sat11 === true}
                                onChange={this.handleSat11}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sat12 === true}
                                onChange={this.handleSat12}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sat13 === true}
                                onChange={this.handleSat13}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sat14 === true}
                                onChange={this.handleSat14}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sat15 === true}
                                onChange={this.handleSat15}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sat16 === true}
                                onChange={this.handleSat16}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sat17 === true}
                                onChange={this.handleSat17}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sat18 === true}
                                onChange={this.handleSat18}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sat19 === true}
                                onChange={this.handleSat19}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sat20 === true}
                                onChange={this.handleSat20}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sat21 === true}
                                onChange={this.handleSat21}
                            />
                        </Form.Group>
                        <Form.Group inline widths='equal'>
                            <label>SUN</label>
                            <Form.Field control={Checkbox}
                                checked={this.state.sun10 === true}
                                onChange={this.handleSun10}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sun11 === true}
                                onChange={this.handleSun11}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sun12 === true}
                                onChange={this.handleSun12}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sun13 === true}
                                onChange={this.handleSun13}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sun14 === true}
                                onChange={this.handleSun14}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sun15 === true}
                                onChange={this.handleSun15}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sun16 === true}
                                onChange={this.handleSun16}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sun17 === true}
                                onChange={this.handleSun17}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sun18 === true}
                                onChange={this.handleSun18}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sun19 === true}
                                onChange={this.handleSun19}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sun20 === true}
                                onChange={this.handleSun20}
                            />
                            <Form.Field control={Checkbox}
                                checked={this.state.sun21 === true}
                                onChange={this.handleSun21}
                            />
                        </Form.Group>
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
                            for (const key of Object.keys(this.fullTimeDisplay)) {
                                if (this.state[key] === "" || this.state[key] === false) {
                                    errors.push(`${this.fullTimeDisplay[key]} cannot be empty.`);
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
                                    month: this.state.startMonth
                                }).then(
                                    ({ data }) => {
                                        if (data.status === 200) { //signup successful
                                            history.push('/riderSummary');
                                        } else if (data.status === 500) {
                                            errors.push(data.message)
                                            errors.push(`You can only submit a schedule for the future. You cannot submit the same work schedule twice.`)
                                            console.log("Server side error.")
                                        }
                                    }
                                ).catch((err) => {
                                    errors.push(err.message);
                                    errors.push(`You can only submit a schedule for the future. You cannot submit the same work schedule twice.`);
                                    console.error(err)
                                });
                            }
                        }}
                        error={this.state.error.length !== 0}>
                        <Form.Group widths='equal'>
                            <DatePicker
                                selected={this.state.startMonth}
                                onChange={this.handleMonthChange}
                            />
                        </Form.Group>
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
