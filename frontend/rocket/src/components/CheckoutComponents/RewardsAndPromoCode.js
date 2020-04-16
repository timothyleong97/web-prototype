import React, { useState } from "react";
import { Header, Grid, Form, Button } from "semantic-ui-react";
import axiosClient from "../importables/axiosClient";
import PromoFunctions from "./Promofunctions";

const RewardsAndPromoCode = ({ rewards, setSubtotal, subtotal, setPromoApplied, pointsUsed, setPointsUsed }) => {

  const [promo, setPromo] = useState("");
  const [promoState, setPromoState] = useState(0); //0 means haven't tried, 1 means applied, 2 means rejected
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3} verticalAlign="middle">
          <Header as="h4">Reward Points Used (max {rewards})</Header>
        </Grid.Column>
        <Grid.Column width={11} />
        <Grid.Column width={2} style={{ textAlign: "right" }}>
          <Form>
            <Form.Input
              fluid
              value={pointsUsed}
              onChange={(_, { value }) =>
                setPointsUsed(
                  Number.isInteger(value)
                    ? value > rewards
                      ? rewards
                      : value
                    : rewards
                )
              }
            />
          </Form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3} verticalAlign="middle">
          <Header as="h4">
            Promo Code {" "}
            {promoState === 0
              ? ""
              : promoState === 1
              ? "(Applied!)"
              : "(That code doesn't work.)"}
            
          </Header>
        </Grid.Column>
        <Grid.Column width={11} />
        <Grid.Column width={2} style={{ textAlign: "right" }}>
          <Form>
            <Form.Input fluid value={promo} onChange={(_, { value }) =>setPromo(value)} />
          </Form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3} verticalAlign="middle"></Grid.Column>
        <Grid.Column width={11} />
        <Grid.Column width={2} style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              //if a code has not been applied, send a request
              if (promoState !== 1) {
                axiosClient
                  .post("/promo", { code: promo })
                  .then(({ data }) => {
                    //data is {promo_detail: 'MINSPEND10PERCENTOFF4'} for eg
                    console.log(data)
                    if (data.promo_detail !== "") {
                      
                      if (
                        subtotal > PromoFunctions(data.promo_detail)(subtotal)
                      ) {
                        //promo works
                        //disallow further promos
                        setPromoState(1);
                        setPromoApplied(true); //stops resetting of subtotal
                        setSubtotal(
                          PromoFunctions(data.promo_detail)(subtotal)
                        );
                      } else {
                        setPromoState(2);
                      }
                    } else setPromoState(2)
                  })
                  .catch((err) => console.log(err));
              } 
            }}
          >
            Apply Promo Code
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RewardsAndPromoCode;
