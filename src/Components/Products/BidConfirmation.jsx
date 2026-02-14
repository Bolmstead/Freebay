import React from "react";
import useStyles from "./Stylings/styleBidConfirmation";
import { Grid, Typography } from "@mui/material";
import { useUserContext } from "../../Context";

// Displays page explaining a user's bid was successfully submitted

export default function BidConfirmation() {
  const classes = useStyles();
  const { currentUser } = useUserContext();

  return (
    <div className={classes.confirmContainer}>
      <br />
      <br />
      <br />
      <br />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <br />
        <Grid xs={12} item>
          <br />
          <br />
          <br />
          <br />
          <div className={classes.smiley}>😁</div>
          <Typography component="h3" variant="h5">
            Congrats {currentUser.firstName}, you're now the high bidder!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
