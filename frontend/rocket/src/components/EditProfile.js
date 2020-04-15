import React, { useState, useRef } from "react";
import { Button, Header, Modal, Form, Input, Message } from "semantic-ui-react";
import axiosClient from './importables/axiosClient';

export default ({ setAppUsername }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const ref = useRef(null);

  return (
    <Modal
      ref={ref}
      closeIcon
      trigger={
        <Button color="purple" circular size="big">
          Edit Profile
        </Button>
      }
      basic
      size="small"
      centered
    >
      <Header icon="archive" content="Change username/password" />
      <Modal.Content>
        <Form
          error={errorMsg.length > 0}
          onSubmit={() => {
            setErrorMsg([]); //reset error message
            //1. Accumulate errors
            let errors = [];
            if (username === "") {
              errors.push("Please confirm your username.");
            }
            if (password === "") {
              errors.push("Please confirm your password.");
            }
            if (errors.length > 0) {
              setErrorMsg(errors);
            } else {
              //update in db
              ref.current.state.open = false;
              setUsername("");
              setPassword("");
              setAppUsername(username);
            }
          }}
        >
          <Form.Group>
            <Form.Field
              control={Input}
              label="Username"
              placeholder="Username"
              value={username}
              onChange={(_, { value }) => setUsername(value)}
            />
            <Form.Input
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(_, { value }) => setPassword(value)}
            />
          </Form.Group>
          <Message error header="Missing information">
            <Message.List>
              {errorMsg.map((x) => (
                <Message.List>{x}</Message.List>
              ))}
            </Message.List>
          </Message>

          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
