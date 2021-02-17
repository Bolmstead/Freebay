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
        <Box my={0}>

        <FiCard className={classes.card}>
          <FiCardMedia
            media="picture"
            alt="Contemplative Reptile"
            image="/Images/clickbait/electronics.jpg"
            title="Contemplative Reptile"
          />
          <FiCardContent className={classes.fiCardContent}>
            <h1 className={classes.header}>All the best tech for less</h1>
            <Typography
              variant="body2"
              className={classes.fiCardContentTextSecondary}
              component="p"
            >
            Cellphones, Laptops, TV's, and more!
            </Typography>
          </FiCardContent>
          <FiCardActions className={classes.fiCardContent}>
            <Button size="small" color="inherit" variant="outlined">
              Learn More
            </Button>
          </FiCardActions>
        </FiCard>
      </Box>
    </div>
  );
}

export default FreebayPic;
