import React, { useState, useEffect, useContext } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {useParams} from 'react-router-dom';
import FreebayAPI from '../Api.js'
import ProductsContext from "./Common/Context";
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import TextField from '@material-ui/core/TextField';
import ReactDOM from "react-dom";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from '@material-ui/core/'






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
});




function Profile() {
  const classes = useStyles();

  const {username} = useParams();
  const [userProfile, setUserProfile] = useState(null);

  const { currentUser } = useContext(ProductsContext);


  useEffect(() => {
    async function getUserProfile(username) {
        let user = await FreebayAPI.getCurrentUser(username);
        setUserProfile(user);
    }
    getUserProfile(username);
    console.log("userProfile",userProfile)
  }, []);


  return (
    <Container>
      <Grid container justify="center" alignItems="center"   direction="row">
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
              {userProfile["username"]}
              </Typography>
              <Typography variant="h5" component="h2">
                asdf
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                asdf
              </Typography>
              <Typography variant="body2" component="p">
                asdf
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Button</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

        
      </Container>
  );
}

export default Profile;

