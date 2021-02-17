import React from "react";
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ProductSlider from './Components/Products/ProductSlider.js'
import ProductCard from './Components/Products/ProductCard.js'
import ProductList from './Components/Products/ProductList.js'
import FreebayAPI from './Api'
import { makeStyles } from '@material-ui/core/styles';
import FreebayPic from './Components/Common/FreebayPic'
import FaqCard from './Components/Common/FaqCard'
import Grid from '@material-ui/core/Grid';










/* Home page that displays login and signup button links */

function Home() {
  const useStyles = makeStyles((theme) => ({
    image: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
    },
  }));

  return (
    <Grid  container spacing={3}>
        <Grid item xs={12} alignItems="center" justify="center">
          <FreebayPic />
        </Grid>
        <Grid item sm={4} margin ={3}>
        </Grid>
        <Grid item sm={8}>
          <FaqCard />
        </Grid>

    </Grid>
  );
}

export default Home;
