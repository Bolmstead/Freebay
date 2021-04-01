import React from "react";
import HomePagePic3 from './HomePagePic3';
import HomePagePic2 from './HomePagePic2';
import HomePagePic1 from './HomePagePic1';


import Grid from '@material-ui/core/Grid';
import RecentWinsFeed from '../Feeds/RecentWinsFeed.js'
import RecentBiddersFeed from '../Feeds/RecentBiddersFeed.js'
import Link from '@material-ui/core/Link';
import useStyles from './Stylings/styleHome.js'
import { Typography } from "@material-ui/core";

/* Home page rendering a large picture link (HomePagePic), a feed of the most recent 
auction winners (RecentWinsFeed) and products with the most bids (RecentBiddersFeed). 
Also contains a link at bottom of page to get information on how to use site*/

function Home() {
  const classes = useStyles();

  let randomIndex = Math.floor(Math.random() * 3)
  let homepagePics = [<HomePagePic1 />, <HomePagePic2 />, <HomePagePic3 />]
  return (
    <div>
      <Grid  container spacing={3} direction="row" 
      justify="center" alignItems="flex-start">
        <Grid item xs={12} alignItems="center" justify="center">
          {homepagePics[randomIndex]}
        </Grid>
      </Grid>
      <Grid  container spacing={3} direction="row" justify="center">
        <Grid item xs={12} sm={8} md={4} lg={3}>
          <Typography component="h5" variant="h5" className={classes.feedTitle}>
            New Auction Winners!
          </Typography>
          <RecentWinsFeed />
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={9}>
          <Typography component="h5" variant="h5" className={classes.feedTitle}>
            Recent Bids Placed
          </Typography>
          <RecentBiddersFeed/>
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
