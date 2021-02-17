import React, { useState, useEffect, useContext } from "react";
import { makeStyles} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import FreebayAPI from '../../Api.js'
import Context from "../Common/Context";
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExampleFeed from "./ExampleFeed";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}





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
        <Grid item xs={6}><br/>
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
        <Grid item xs={8}><br/>
          <Notifications/>
        </Grid>
      </Grid>
          <Grid container  justify="center" alignItems="center" direction="row">
            <Grid item justify="center" alignItems="center" xs={6}><br/>
              <Typography className={classes.pos} color="textSecondary" align="center">
                Products Won
              </Typography>
              <ExampleFeed />
            </Grid>
            <Grid item justify="center" alignItems="center"  xs={6}><br/>
              <Typography className={classes.pos} color="textSecondary" align="center">
                Current Bids
              </Typography>
              <ExampleFeed />
            </Grid>
          </Grid>

        
      </Container>
  );
}

export default Profile;

