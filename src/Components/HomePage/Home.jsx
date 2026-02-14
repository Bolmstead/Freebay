import React, { useEffect, useState } from "react";
import { checkAllBids } from "../../Api";
import Grid from "@mui/material/Grid";
import RecentWinsFeed from "../Feeds/RecentWinsFeed.jsx";
import RecentBiddersFeed from "../Feeds/RecentBiddersFeed.jsx";
import useStyles from "./Stylings/styleHome.js";
import { Typography } from "@mui/material";
import HomePagePic from "./HomePagePic";

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
      await checkAllBids();
      setHaveBidsBeenChecked(true);
    };
    checkAllBidsForAuctionsEnded();
  }, []);

  // Randomly pick one of the below HomePagePic components to be displayed on the homepage
  const homePagePic1 = (
    <HomePagePic
      linkRoute={"/products?subCategory=Sports+and+Fitness"}
      titleText={"New Goals. Cheap Gear."}
      subText={"Bid for home workout equipment here "}
      imgHref={"/Images/workout.jpg"}
    />
  );

  const homePagePic2 = (
    <HomePagePic
      linkRoute={"/products?subCategory=Computers+and+Accessories"}
      titleText={"The Best Tech. For Less."}
      subText={"Get the newest gadgets here "}
      imgHref={"/Images/electronics.jpg"}
    />
  );

  const homePagePic3 = (
    <HomePagePic
      linkRoute={"/products?subCategory=Kitchen+and+Dining"}
      titleText={"Tired of Half-Baked Recipes?"}
      subText={"Cook up some tasty meals with these "}
      imgHref={"/Images/cooking.jpg"}
    />
  );

  const homePagePics = [homePagePic1, homePagePic2, homePagePic3];
  const randomIndex = Math.floor(Math.random() * 3);

  return (
    <div>
      <Grid container spacing={3} direction="row" justifyContent="center" alignItems="flex-start">
        <Grid item xs={12} justifyContent="center">
          {homePagePics[randomIndex]}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        className={classes.feedContainer}
      >
        <Grid item xs={12} sm={8} md={4} lg={3}>
          <Typography component="h5" variant="h5" className={classes.feedTitle}>
            New Auction Winners!
          </Typography>
          <RecentWinsFeed haveBidsBeenChecked={haveBidsBeenChecked} />
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={9}>
          <Typography component="h5" variant="h5" className={classes.feedTitle}>
            Recent Bids Placed
          </Typography>
          <RecentBiddersFeed haveBidsBeenChecked={haveBidsBeenChecked} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
