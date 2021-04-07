import React, { useState, useEffect, useContext } from "react";
import { makeStyles} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import FreebayAPI from '../../Api.js'
import Context from "../Common/Context";
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserBidsOrWinsFeed from "../Feeds/UserBidsOrWinsFeed";
import LoadingText from "../Common/LoadingText"
import Alert from "../Common/Alert"
import { Redirect } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Notifications from "./Notifications";
import ProfileImageCard from "./ProfileImageCard";
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import useStyles from './Stylings/styleProfile.js'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';


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
        console.log("userObject Profile component", userObject)
        setUserProfile(userObject);
      } catch(err){
        return  history.push("/notFound")
      }

    }
    getUserProfile(username);
    console.log("userProfile,", userProfile)
  }, []);


  if (!userProfile) return (<LoadingText />);
  if (!currentUser) return (    
  <Grid container spacing={2} justify="center" align="center"><br/><br/><br/>
    <Grid xs={12} item><br/><br/><br/>
    <SentimentVeryDissatisfiedIcon className={classes.smiley}
    color="disabled" 
    />
    </Grid>
    <Grid item xs={10} md={6}>
        <Typography component="h1" variant="body1" 
        className={classes.errorText}
        >
           Please login to view this profile
        </Typography><br/>
    </Grid>

  </Grid>);



  console.log("userProfile", userProfile)

  const {  firstName, lastName, productsWon, bids, imageUrl } = userProfile

  return (
    <Container >
    <br/>
      <Grid container justify="center" alignItems="center"   direction="row" spacing={3} className={classes.feedGrid}>

          { (currentUser.username === userProfile.username)
          ?
            <Grid item xs={12} md={4}>
              <ProfileImageCard userProfile={userProfile}/>
            </Grid>
          :
            <Grid item xs={12}>
              <ProfileImageCard userProfile={userProfile}/>
            </Grid>
          }
          { (currentUser.username === userProfile.username)
          ?
            <Grid item xs={12} md={7}>
              <Notifications/>
            </Grid>
          : <div></div>
          }

        <Grid item xs={12} md={6} spacing={3} justify="center" alignItems="top" direction="row" className={classes.feedGrid}>
            <UserBidsOrWinsFeed products={productsWon} title={"Products Won"}/>
        </Grid>
        <Grid item xs={12} md={6} spacing={3} justify="center" alignItems="top" direction="row" className={classes.feedGrid}>
            <UserBidsOrWinsFeed products={bids} title={"Highest Bids"}/>
        </Grid>
      </Grid>

        
      </Container>
  );
}

export default Profile;

