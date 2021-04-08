import React from "react";
import Avatar from '@material-ui/core/Avatar';
import LoadingText from "../Common/LoadingText"
import useStyles from './Stylings/styleProfile.js'
import { Paper, CardContent, Typography } from '@material-ui/core/'


// Card showing a user's username, first and last name.
// If user provided an image URL, the image will be displayed.
// Otherwise, a default avatar will appear.

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

