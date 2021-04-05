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

function HomePagePic3() {
  const classes = useStyles();

  

  return (
      <div>
        <Link style={{textDecoration: 'none'}} 
              href={"/products?subCategory=Pet%20Supplies"}>
          <Box my={0}>
            <FiCard className={classes.card}>
              <FiCardMedia 
                media="picture"
                alt="Need cat food for Mittens?"
                image="/Images/kitten.jpg"
                title="Need cat food for Mittens?"
              />
            <FiCardContent className={classes.fiCardContent}>
              <Typography variant="h4" className={classes.header}>
              Running Low on Kitty Litter?
              </Typography>
              <Typography
                variant="body1"
                className={classes.headerSecondary}
                component="p"
                display="inline" 
              >
                Hurry and grab it now!  <ArrowForwardIcon />
              </Typography >
            </FiCardContent>
          </FiCard>
        </Box>
      </Link>
    </div>
  );
}

export default HomePagePic3;
