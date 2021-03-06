import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import HomePagePic from './HomePagePic'
import FaqCard from './FaqCard'
import Grid from '@material-ui/core/Grid';
import AllWinsFeed from '../Feeds/AllWinsFeed.js'
import WhatsTrendingFeed from '../Feeds/WhatsTrendingFeed.js'
import Paper from '@material-ui/core/Paper';
import ProductCardMini from '../Products/ProductCardMini'




import useStyles from './Stylings/styleHome.js'
import { Typography } from "@material-ui/core";

/* Home page that will render a feed of users who have 
recently won products, an image link and a link to a FAQ's page */

function Home() {
  const classes = useStyles();
  return (
    <div>
      <Grid  container spacing={3} direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={12} alignItems="center" justify="center">
          <HomePagePic />
        </Grid>
        {/* <Grid item xs={12} sm={10} md={6}>
          <FaqCard />
        </Grid> */}
      </Grid>
      <Grid  container spacing={3} direction="row" alignItems="flex-start">
        <Grid item xs={12} sm={10} md={4} lg={3} margin ={3}>
        <Typography component="h5" variant="h5">
          Recent auction winners
        </Typography>
          <AllWinsFeed />
        </Grid>
        <Grid item xs={12} md={4} lg={8} margin ={3}>
        <Typography component="h5" variant="h5">
          What's trending
        </Typography>
          <WhatsTrendingFeed/>
        </Grid>

      </Grid>
    </div>
  );
}

export default Home;
