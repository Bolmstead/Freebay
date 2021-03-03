import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import HomePagePic from '../Common/HomePagePic'
import FaqCard from '../Common/FaqCard'
import Grid from '@material-ui/core/Grid';
import ExampleFeed from '../User/ExampleFeed.js'
import BidsFeed from '../User/BidsFeed.js'
import WinsFeed from '../User/WinsFeed.js'
import useStyles from './Stylings/styleHome.js'
import { Typography } from "@material-ui/core";

/* Home page that will render a feed of users who have 
recently won products, an image link and a link to a FAQ's page */

function Home() {
  return (
    <Grid  container spacing={3}>
        <Grid item xs={12} alignItems="center" justify="center">
          <HomePagePic />
        </Grid>
        <Grid item sm={4} margin ={3}>
          <Typography>
            Recent Winners
          </Typography>
          <ExampleFeed />
        </Grid>
        <Grid item sm={4}>
          <FaqCard />
        </Grid>
        <Grid item sm={4} margin ={3}>
          <Typography>
            Recent Winners
          </Typography>
          <ExampleFeed />
        </Grid>

    </Grid>
  );
}

export default Home;
