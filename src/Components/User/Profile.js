import React, { useState, useEffect, useContext } from "react";
import { makeStyles} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import FreebayAPI from '../../Api.js'
import Context from "../Common/Context";
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserBidsOrWinsFeed from "../Feeds/UserBidsOrWinsFeed";
import LoadingText from "../Common/LoadingText"
import Alert from "../Common/Alert"
import { Redirect } from "react-router-dom";
import {useHistory} from 'react-router-dom';

import Notifications from "./Notifications";
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import useStyles from './Stylings/styleProfile.js'

import {
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from '@material-ui/core/'


// A users profile. If the profile is the current user, notifications 
// are displayed. If the profile does not match the current user, 
// notifications would not be displayed.


function Profile() {
  const classes = useStyles();
  const history = useHistory()

  const [userProfile, setUserProfile] = useState(null);
  const {username} = useParams();
  const { currentUser } = useContext(Context);

  useEffect(() => {
    async function getUserProfile(username) {
      try {
        let userObject = await FreebayAPI.getUser(username);
        console.log("username from params in Profile component", username)
        setUserProfile(userObject);
      } catch(err){
        return  history.push("/notFound")
      }

    }
    getUserProfile(username);
    console.log("userProfile,", userProfile)
  }, []);


  if (!userProfile) return <LoadingText />;

  const {  firstName, lastName, products_won, highest_bids } = userProfile

  return (
    <Container >
      <Grid container justify="center" alignItems="center"   direction="row" spacing={5}>
        <Grid item xs={12} sm={9} md={6}><br/>
          <Paper variant="outlined"> 
            <CardContent className={classes.profileHeader}>
              <Typography className = {classes.userName} variant="h5" component="h2" align="center">
              {username}
              </Typography>
              <Typography className={classes.pos} color="textSecondary" align="center">
                  {firstName} {lastName}
                </Typography>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center"   direction="row" spacing={3} className={classes.feedGrid}>
        <Grid item xs={12} md={7}>
            <Notifications userProfile={userProfile}/>
        </Grid>
        <Grid item xs={12} md={6} spacing={3} justify="center" alignItems="top" direction="row" className={classes.feedGrid}>
        <Typography variant="h5" component="h2" align="center">
              Products Won
          </Typography>
            <UserBidsOrWinsFeed products={products_won}/>
        </Grid>
        <Grid item xs={12} md={6} spacing={3} justify="center" alignItems="top" direction="row" className={classes.feedGrid}>
          <Typography variant="h5" component="h2" align="center">
              Current Bids
          </Typography>
            <UserBidsOrWinsFeed products={highest_bids}/>
        </Grid>
      </Grid>

        
      </Container>
  );
}

export default Profile;

