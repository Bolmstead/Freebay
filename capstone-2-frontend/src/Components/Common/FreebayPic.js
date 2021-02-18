import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
    FiCard,
    FiCardActions,
    FiCardContent,
    FiCardMedia
  } from "./FullImageCard";
import Link from '@material-ui/core/Link';



// Picture template to show on the homepage right below CategoriesBar
// Also acts as a link to send users to a certain part of the website


const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    margin: "0px"
  },
  imageTitle: {
    margin: 0,
    padding: "1rem",
    color: "white",
    textShadow: "2px 2px 4px",
  },
  img: {
    padding: 0,
    margin: 0,
    height: "auto",
  },
  card: {
    padding: 0,
    margin: 0,
    height: "250px",
  }
}));




function FreebayPic() {
  const classes = useStyles();


  return (
      <div>
        <Link style={{textDecoration: 'none'}} href={"/products?subCategory=Computers%20&%20Accessories"}>
        <Box my={0}>

        <FiCard className={classes.card}>
          <FiCardMedia
            media="picture"
            alt="Contemplative Reptile"
            image="/Images/clickbait/electronics.jpg"
            title="Contemplative Reptile"
          />
          <FiCardContent className={classes.fiCardContent}>
            <Typography               variant="h3"
 className={classes.header}>All the best tech for less</Typography>
            <Typography
              variant="body1"
              className={classes.fiCardContentTextSecondary}
              component="p"
            >
            Cellphones, Laptops, TV's, and more!
            </Typography>
          </FiCardContent>
          <FiCardActions className={classes.fiCardContent}>

          </FiCardActions>
        </FiCard>
      </Box>
      </Link>
    </div>
  );
}

export default FreebayPic;
