import React, { useState, useEffect, useContext } from "react";
import { makeStyles} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import FreebayAPI from '../../Api.js'
import Context from "../Common/Context";
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExampleFeed from "./ExampleFeed";
import BidsFeed from "./BidsFeed";
import WinsFeed from "./WinsFeed";

import Notifications from "./Notifications";
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from '@material-ui/core/'


// A users profile. If the profile is the current user, notifications 
// are displayed. If the profile does not match the current user, 
// notifications would not be displayed.


const useStyles = makeStyles({
  media: {
    height: 300,
    width: 300,
    borderRadius: 2,
    border: 1,
  },

  cover: {
    width: 151,
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  tabPanel: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
});




function Profile() {
  const classes = useStyles();
  const [userProfile, setUserProfile] = useState(null);
  const {username} = useParams();
  const { currentUser } = useContext(Context);

  useEffect(() => {
    async function getUserProfile(username) {
        let userObject = await FreebayAPI.getUser(username);
        console.log("username from params in Profile component", username)
        setUserProfile(userObject);
    }
    getUserProfile(username);
    console.log("userProfile,", userProfile)
  }, []);

  if (!userProfile) return <CircularProgress />;

  const {  firstName, lastName, email, balance, products_won, highest_bids, notifications } = userProfile

  return (
    <Container>
      <Grid container justify="center" alignItems="center"   direction="row">
        <Grid item xs={12} md={6} ><br/>
          <Card> 
            <CardContent >
              <Typography variant="h5" component="h2" align="center">
              {username}
              </Typography>
              <Typography className={classes.pos} color="textSecondary" align="center">
                  {firstName} {lastName}
                </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center"   direction="row">
        <Grid item xs={12} md={10}><br/>
          <Notifications userProfile={userProfile}/>
        </Grid>
          <Grid container  justify="center" alignItems="center" direction="row">
            <Grid item justify="center" alignItems="center" xs={6}><br/>
              <WinsFeed userProfile={userProfile}/>
            </Grid>
            <Grid item justify="center" alignItems="center"  xs={6}><br/>
              <BidsFeed userProfile={userProfile}/>
            </Grid>
          </Grid>
          </Grid>

        
      </Container>
  );
}

export default Profile;

