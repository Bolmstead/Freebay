import { Button, Grid } from "@material-ui/core/";
import React from "react";
import FreebayAPI from "../../Api.js";
import useStyles from "./Stylings/styleBidConfirmation";

// Displays page explaining a user's bid was successfully submitted

export default function BidConfirmation() {
  const classes = useStyles();
  // Seed products to Database
  async function seedProducts() {
    try {
      await FreebayAPI.seedProducts();
    } catch (err) {
      console.log(
        "🚀 ~ file: PrimarySearchAppBar.js:101 ~ seedProducg ~ err:",
        err
      );
    }
  }
  return (
    <div className={classes.confirmContainer}>
      <br />
      <br />
      <br />
      <br />
      <Grid container spacing={2} align="center">
        <br />
        <Grid xs={12} item>
          <br />
          <br />
          <br />
          <br />
          <Button
            variant="contained"
            style={{ backgroundColor: "lime" }}
            onClick={seedProducts}
          >
            Seed Products
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
