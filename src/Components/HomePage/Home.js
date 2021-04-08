import React, { useState, useEffect } from "react";
import FreebayAPI from '../../Api';
import Grid from '@material-ui/core/Grid';
import RecentWinsFeed from '../Feeds/RecentWinsFeed.js'
import RecentBiddersFeed from '../Feeds/RecentBiddersFeed.js'
import useStyles from './Stylings/styleHome.js'
import { Typography } from "@material-ui/core";
import HomePagePic from "./HomePagePic"

/* Home page rendering the following:
   - large picture link <HomePagePic/>
   - feed of most recent auction winners <RecentWinsFeed/>
   - products with the most bids <RecentBiddersFeed/> */

function Home() {
  const classes = useStyles();

  // If state is true, then all bids have been checked if their auction
  // has ended. The useEffect hooks in the <RecentWinsFeed/> and 
  // <RecentBiddersFeed/> will execute once  state has changed
  const [haveBidsBeenChecked, setHaveBidsBeenChecked] = useState(false);

  useEffect(() => {
    // Check all bids if their auction has ended. If so, code will add
    // product to the user's products won
    const checkAllBidsForAuctionsEnded = async () => {
      await FreebayAPI.checkAllBids()
      setHaveBidsBeenChecked(true);
    }
    checkAllBidsForAuctionsEnded();
  }, []);

  // Randomly pick one of the below HomePagePic components to be displayed on the homepage
  const homePagePic1 = 
    <HomePagePic linkRoute={"/products?subCategory=Sports+and+Hobbies"} 
    titleText={"New Goals. Cheap Gear."} subText={"Bid for home workout equipment here "} 
    imgHref={"/Images/workout.jpg"}/>

  const homePagePic2 = 
    <HomePagePic linkRoute={"/products?subCategory=Pet+Supplies"} 
    titleText={"The Best Tech. For Less."} subText={"Get the newest gadgets here" } 
    imgHref={"/Images/electronics.jpg"}/>
  
  const homePagePic3 = 
    <HomePagePic linkRoute={"/products?subCategory=Computers+and+Accessories"} 
    titleText={"Running Low on Kitty Litter?"} subText={"Hurry and grab it now!"} 
    imgHref={"/Images/kitten.jpg"}/>
  
  let homePagePics = [homePagePic1, homePagePic2, homePagePic3]
  let randomIndex = Math.floor(Math.random() * 3)


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
