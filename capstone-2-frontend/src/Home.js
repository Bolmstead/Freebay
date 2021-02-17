import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import FreebayPic from './Components/Common/FreebayPic'
import FaqCard from './Components/Common/FaqCard'
import Grid from '@material-ui/core/Grid';
import ExampleFeed from './Components/User/ExampleFeed.js'
import { Typography } from "@material-ui/core";

/* Home page that will render a feed of users who have 
recently won products, an image link and a link to a FAQ's page */

function Home() {
  const useStyles = makeStyles((theme) => ({
    image: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
    },
  }));

  return (
    <Grid  container spacing={3}>
        <Grid item xs={12} alignItems="center" justify="center">
          <FreebayPic />
        </Grid>
        <Grid item sm={4} margin ={3}>
          <Typography>
            News Feed
          </Typography>
          <ExampleFeed />
        </Grid>
        <Grid item sm={8}>
          <FaqCard />
        </Grid>

    </Grid>
  );
}

export default Home;
