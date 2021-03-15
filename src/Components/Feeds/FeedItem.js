import React, { useState, useEffect } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './Stylings/styleWinsFeed.js'
import FreebayAPI from '../../Api'
import Divider from '@material-ui/core/Divider';

// Renders a list of products that have been won most recently. To be rendered on the Homepage

export default function FeedItem(product) {
    const classes = useStyles();
    let {p} = product

    return (
    <Link href={"/Product/" + p.id} className={classes.product} style={{ textDecoration: 'none' }}>
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt="Product Image" src={p.imageUrl}
            className={classes.large} />
        </ListItemAvatar>
        <ListItemText primary={p.name} className={classes.product} color="textPrimary" 
            secondary={
            <React.Fragment>
            <Typography variant="caption" className={classes.inline} color="textPrimary" className={classes.product}>
                ${p.bidPrice}
            </Typography>
            </React.Fragment>
            }
        />
        </ListItem>
    </Link>
    )}
