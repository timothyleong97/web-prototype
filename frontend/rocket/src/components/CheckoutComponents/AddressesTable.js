import React, { Fragment } from "react";
import { Table, Header, Button } from "semantic-ui-react";

const AddressesTable = ({ addresses, setBuilding, setPostal, setUnit, setStreet }) => {
  return (
    <Fragment>
      <Header>Past Addresses</Header>
      <Table celled padded columns={5}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Street Name</Table.HeaderCell>
            <Table.HeaderCell>Building</Table.HeaderCell>
            <Table.HeaderCell>Unit No.</Table.HeaderCell>
            <Table.HeaderCell>Postal Code</Table.HeaderCell>
            <Table.HeaderCell collapsing>Select</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {addresses.map((json) => {
            return (
              <Table.Row>
                <Table.Cell>{json.street_name}</Table.Cell>
                <Table.Cell singleLine>{json.building}</Table.Cell>
                <Table.Cell textAlign="left">{json.unit_num}</Table.Cell>
                <Table.Cell textAlign="left">{json.postal_code}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button onClick={
                      ()=> {
                          setBuilding(json.building);
                          setStreet(json.street_name);
                          setUnit(json.unit_num);
                          setPostal(json.postal_code);
                      }
                  }>Use this address</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default AddressesTable;
