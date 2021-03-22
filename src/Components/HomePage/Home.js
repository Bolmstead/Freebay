import React from "react";
import HomePagePic from './HomePagePic'
import Grid from '@material-ui/core/Grid';
import AllWinsFeed from '../Feeds/AllWinsFeed.js'
import WhatsTrendingFeed from '../Feeds/WhatsTrendingFeed.js'
import Link from '@material-ui/core/Link';
import useStyles from './Stylings/styleHome.js'
import { Typography } from "@material-ui/core";

/* Home page rendering a large picture link (HomePagePic), a feed of the most recent 
auction winners (AllWinsFeed) and products with the most bids (WhatsTrendingFeed). 
Also contains a link at bottom of page to get information on how to use site*/

function Home() {
  const classes = useStyles();
  return (
    <div>
      <Grid  container spacing={3} direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={12} alignItems="center" justify="center">
          <HomePagePic />
        </Grid>
      </Grid>
      <Grid  container spacing={3} direction="row" justify="center">
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <Typography component="h5" variant="h5" className={classes.feedTitle}>
            New auction winners
          </Typography>
          <AllWinsFeed />
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={9}>
          <Typography component="h5" variant="h5" className={classes.feedTitle}>
            What's trending
          </Typography>
          <WhatsTrendingFeed/>
        </Grid>
      </Grid>
      <Grid container spacing={5} justify="center" align="center">
        <Grid item xs={12} margin={5} alignItems="center" justify="center">
          <Link href={"/Welcome/"} >
            <Typography variant="body2" color="textSecondary" component="p">
              Questions? Click here
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
