import React, { useState, useEffect, useContext } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FreebayAPI from '../../Api'
import Divider from '@material-ui/core/Divider';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import useStyles from './Stylings/styleWhatsTrendingFeed';
import ProductCardMini from '../Products/ProductCardMini.js';
import Grid from '@material-ui/core/Grid';


// Feed of a user's highest bids. To be displayed for anyone viewing the page

export default function WhatsTrendingFeed() {
  const classes = useStyles();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(() => {
    const handleGetWhatsTrending = async () => {
      const result = await FreebayAPI.getWhatsTrending()

      const mappedResult = result.map( p => ( 
        p.name = p.name.substring(0, 50) + "..."
      ))

      setTrendingProducts(result);
    }
    handleGetWhatsTrending();
  }, []);

  console.log("trendingProducts", trendingProducts)

  return (
    <Grid  container spacing={3} direction="row" justify="center" alignItems="flex-start">
    { trendingProducts.length > 0
      ?trendingProducts.map( product => (
        <ProductCardMini product={product} />      ))
      :<ListItem alignItems="flex-start">
          <ListItemText secondary="Loading..."/>
        </ListItem>
      }
    </Grid>
  )
}



