import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {
    useStyles,
    FiCard,
    FiCardContent,
    FiCardMedia
  } from "./Stylings/styleHomepagePic";
import Link from '@material-ui/core/Link';

// Picture on homepage. Serves as link to send users to
// certain part of the website

function HomePagePic({imgHref, titleText, subText, linkRoute}) {
  const classes = useStyles();
  return (
      <div>
        <Link style={{textDecoration: 'none'}} 
              href={linkRoute}>
          <Box my={0}>
            <FiCard className={classes.card}>
              <FiCardMedia 
                media="picture"
                alt={titleText}
                image={imgHref}
                title={titleText}
              />
            <FiCardContent className={classes.fiCardContent}>
              <Typography variant="h4" className={classes.header}>
                {titleText}
              </Typography>
              <Typography
                variant="body1"
                className={classes.headerSecondary}
                component="p"
                display="inline" 
              >
                {subText} <ArrowForwardIcon />
              </Typography >
            </FiCardContent>
          </FiCard>
        </Box>
      </Link>
    </div>
  );
}

export default HomePagePic;
