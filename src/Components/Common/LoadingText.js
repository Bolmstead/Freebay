import React from "react";
import { Grid } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";

/** Loading message displayed by components when fetching API data. */

const LoadingText = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default LoadingText;
