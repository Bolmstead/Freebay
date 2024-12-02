import React, { useContext } from "react";
// import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import useStyles from "./Stylings/styleBidConfirmation";
import { Grid, Typography } from "@material-ui/core/";
import Context from "../../Context";

// Displays page explaining a user's bid was successfully submitted

export default function BidConfirmation() {
  const classes = useStyles();
  const { currentUser } = useContext(Context);

  return (
    <div className={classes.confirmContainer}>
      <br />
      <br />
      <br />
      <br />
      <Grid container spacing={2} justify="center" align="center">
        <br />
        <Grid xs={12} item>
          <br />
          <br />
          <br />
          <br />
          {/* <EmojiEmotionsIcon className={classes.smiley} color="disabled" /> */}
          <Typography component="h3" variant="h5">
            Congrats {currentUser.firstName}, you're now the high bidder!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
