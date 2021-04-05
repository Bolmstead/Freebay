import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {
    useStyles,
    FiCard,
    FiCardActions,
    FiCardContent,
    FiCardMedia
  } from "./Stylings/styleHomepagePic";
import Link from '@material-ui/core/Link';

// Picture to show on the homepage below CategoriesBar
// Serves as a link to send users to a certain part of the freeBay website

function HomePagePic1() {
  const classes = useStyles();
  return (
      <div>
        <Link style={{textDecoration: 'none'}} 
              href={"/products?subCategory=Sports%20&%20Hobbies"}>
          <Box my={0}>
            <FiCard className={classes.card}>
              <FiCardMedia 
                media="picture"
                alt="Check out our Tech!"
                image="/Images/workout.jpg"
                title="Check out our Tech!"
              />
            <FiCardContent className={classes.fiCardContent}>
              <Typography variant="h4" className={classes.header}>
                New Goals. Cheap Gear.
              </Typography>
              <Typography
                variant="body1"
                className={classes.headerSecondary}
                component="p"
                display="inline" 
              >
                Bid for home workout equipment here <ArrowForwardIcon />
              </Typography >
            </FiCardContent>
          </FiCard>
        </Box>
      </Link>
    </div>
  );
}

export default HomePagePic1;
