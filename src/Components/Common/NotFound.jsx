import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useStyles from "./Stylings/styleWelcomePage";

// Renders a 404 catch all if can't find route

export default function Welcome() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <br />
      <br />
      <br />
      <Grid xs={12} item>
        <br />
        <br />
        <br />
        <Typography component="h1" variant="h3">
          404
        </Typography>
      </Grid>
      <Grid item xs={10} md={6}>
        <Typography component="h1" variant="body1" className={classes.bodyText}>
          The resource requested could not be found on this server
        </Typography>
        <br />
      </Grid>
    </Grid>
  );
}
