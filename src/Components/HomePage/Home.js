import React, { useState, useEffect } from "react";
import FreebayAPI from '../../Api';

import homePagePics from './HomePagePicOptions'
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
  const [haveBidsBeenChecked, setHaveBidsBeenChecked] = useState(false);

  useEffect(() => {
    const checkAllBidsForAuctionsEnded = async () => {
      await FreebayAPI.checkAllBids()
      setHaveBidsBeenChecked(true);
    }
    checkAllBidsForAuctionsEnded();
  }, []);

  let randomIndex = Math.floor(Math.random() * 3)
  console.log("homePagePics", homePagePics)

  return (
    <div>
      <Grid  container spacing={3} direction="row" 
      justify="center" alignItems="flex-start">
        <Grid item xs={12} alignItems="center" justify="center">
          {homePagePics[randomIndex]}
        </Grid>
      </Grid>
      <Grid  container spacing={3} direction="row" justify="center" className={classes.feedContainer}>
        <Grid item xs={12} sm={8} md={4} lg={3}>
          <Typography component="h5" variant="h5" className={classes.feedTitle}>
            New Auction Winners!
          </Typography>
          <RecentWinsFeed haveBidsBeenChecked={haveBidsBeenChecked}/>
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={9}>
          <Typography component="h5" variant="h5" className={classes.feedTitle}>
            Recent Bids Placed
          </Typography>
          <RecentBiddersFeed haveBidsBeenChecked={haveBidsBeenChecked}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
