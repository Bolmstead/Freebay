import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FreebayAPI from '../../Api';
import ProductCardMini from '../Products/ProductCardMini.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './Stylings/styleRecentBidsFeed.js';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import { createMuiTheme } from '@material-ui/core/styles';




/* Renders a list of <ProductCardMini/> components of products with
   the most recent bids. To be displayed on the Home page */
   

function RecentBiddersFeed() {
  const [recentProductsBiddedOn, setRecentProductsBiddedOn] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const handleGetRecentBidders = async () => {
      const result = await FreebayAPI.recentBidders()
      setRecentProductsBiddedOn(result);
    }
    handleGetRecentBidders();
  }, []);


  return (
    <Container className={classes.feedContainer}>
    { recentProductsBiddedOn.length > 0
      ?
      <Grid  container spacing={4} direction="row" justify="center" >
        { recentProductsBiddedOn[0] 
        ?
          <ProductCardMini product={recentProductsBiddedOn[0]} />
        : <div></div>
        }
        { recentProductsBiddedOn[1] 
        ?
          <ProductCardMini product={recentProductsBiddedOn[1]} />
        : <div></div>
        }
        { recentProductsBiddedOn[2] 
        ?
          <Hidden smDown>
            <ProductCardMini product={recentProductsBiddedOn[2]} />
          </Hidden>
        : <div></div>
        }
        { recentProductsBiddedOn[3] 
        ?
          <Hidden mdDown>
            <ProductCardMini product={recentProductsBiddedOn[3]} />
          </Hidden>
        : <div></div>
        }
      </Grid>
      :
      <Grid  container spacing={8} direction="row" justify="flex-start" mt="10" >
        <ListItem alignItems="flex-start">
            <ListItemText secondary="Loading..."/>
        </ListItem>
      </Grid>

      }
    </Container>
  )
}

RecentBiddersFeed.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(RecentBiddersFeed)


