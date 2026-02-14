import { Button, Grid } from "@mui/material";
import React from "react";
import { seedProducts as apiSeedProducts } from "../../Api.js";
import useStyles from "./Stylings/styleBidConfirmation";

// Dev tool page for seeding products into the database

export default function Seed() {
  const classes = useStyles();

  async function handleSeed() {
    try {
      await apiSeedProducts();
    } catch {
      // seed failure is non-critical
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
          <Button variant="contained" style={{ backgroundColor: "lime" }} onClick={handleSeed}>
            Seed Products
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
