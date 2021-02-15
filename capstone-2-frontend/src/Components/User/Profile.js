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
import ProductsWon from "./ProductsWon";
import NotificationsList from "./NotificationsList";
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
  const [value, setValue] = React.useState(0);
  const {username} = useParams();
  const { currentUser } = useContext(Context);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getUserProfile(username) {
        let user = await FreebayAPI.getUser(username);
        setUserProfile(user);
    }
    getUserProfile(username);
    console.log("userProfile,", userProfile)
  }, []);

  if (!userProfile) return <CircularProgress />;


  return (
    <Container>
      <Grid container justify="center" alignItems="center"   direction="row">
        <Grid item xs={6}><br/>

        </Grid>
      </Grid>

      <div className={classes.tabPanel}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Profile Info" {...a11yProps(0)} />
            <Tab label="Activity" {...a11yProps(1)} />
            <Tab label="Notifications" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        <Card>
            
            <CardContent >
              <Typography variant="h5" component="h2" align="center">
              {userProfile["username"]}
              </Typography>
              <Typography className={classes.pos} color="textSecondary" align="center">
                  {userProfile["firstName"]} {userProfile["lastName"]}
                </Typography>
              <Grid container>
              <Grid item xs={6}>
                <Typography className={classes.pos} color="textSecondary" display="inline" align="center">
                  Balance:  
                </Typography>
                <Typography className={classes.pos} style={{color: "limegreen"}} display="inline" align="center">
                  ${userProfile["balance"]}
                </Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography className={classes.pos} color="textSecondary" align="center" display="inline">
                  Notifications: 
                </Typography>
                <Typography className={classes.pos} style={{color: "orange"}} display="inline" align="center">
                  {userProfile["notifications"] ? userProfile["notifications"].length() : 0}
                </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container  justify="center" alignItems="center" direction="row">
          <Grid item justify="center" alignItems="center" xs={6}><br/>
          <ProductsWon/>
          </Grid>
          <Grid item justify="center" alignItems="center"  xs={6}><br/>
          <ProductsWon/>
          </Grid>
      </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <NotificationsList />
        </TabPanel>
      </div>

        
      </Container>
  );
}

export default Profile;

