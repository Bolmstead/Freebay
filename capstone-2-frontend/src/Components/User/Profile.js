import React, { useState, useEffect, useContext } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import {useParams} from 'react-router-dom';
import FreebayAPI from '../../Api.js'
import Context from "../Common/Context";
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import TextField from '@material-ui/core/TextField';
import ReactDOM from "react-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import WinsFeed from "./WinsFeed";
import BidsFeed from "./BidsFeed";
import Notifications from "./Notifications";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from '@material-ui/core/'



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
              <WinsFeed userProfile={userProfile}/>
            </Grid>
            <Grid item justify="center" alignItems="center"  xs={6}><br/>
              <BidsFeed userProfile={userProfile}/>
            </Grid>
          </Grid>

        
      </Container>
  );
}

export default Profile;

