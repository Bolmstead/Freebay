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


function ProfileImageCard({userProfile}) {
  const classes = useStyles();
  
  if (!userProfile) return <LoadingText />;

  const {  firstName, lastName, username, imageUrl } = userProfile

  return (
    <Paper elevation={3} className={classes.profileContainer}> 
    <div className={classes.imageAndName}>
        <Avatar alt="Profile Image" src={imageUrl} className={classes.profileAvatar}/><br/>
        <CardContent>
        <Typography className = {classes.userName} variant="h5" component="h2" align="center">
        {username}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" align="center">
            {firstName} {lastName}
            </Typography>
        </CardContent>
    </div>
    </Paper>
  );
}

export default ProfileImageCard;

