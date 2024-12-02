import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import useStyles from "./Stylings/styleWelcomePage";

// Page explaining how to use website. Renders after a user registers.

export default function Welcome() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justify="center" align="center">
      <br />
      <br />
      <br />
      <Grid xs={12} item>
        <br />
        <br />
        <br />
        {/* <EmojiEmotionsIcon className={classes.smiley} color="disabled" /> */}
        <Typography component="h1" variant="h3" id="notify">
          Welcome to freeBay
        </Typography>
      </Grid>
      <Grid item xs={10} md={8}>
        <br />
        <Typography component="h1" variant="body1" className={classes.bodyText}>
          Click from the categories above or use the search bar to start fake
          bidding on fake products. Each product has an auction time limit and
          the user with the highest bid at the end of the auction, "wins" the
          product! To see your active bids, notifications, and products you've
          won, click on profile from the top right icon.
        </Typography>
        <br />
        <Typography component="h1" variant="body1" className={classes.bodyText}>
          Log in on a new day and you'll get a surprise! Thanks for playing!
        </Typography>
        <br />
        <br />
        <br />
      </Grid>
    </Grid>
  );
}
