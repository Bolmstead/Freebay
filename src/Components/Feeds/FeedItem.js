import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './Stylings/styleFeedItem.js'


// List item displaying product's title and its highest bid. 
// Renders within the <UserBidsFeed/> and <UserWinsFeed/> components.

export default function FeedItem(product) {
    const classes = useStyles();
    let {p} = product

    // set text of the item to smaller string
    let shortName = (p.name.substring(0, 80) + "...")

    return (
    <Link href={"/Product/" + p.id} className={classes.product} 
    style={{ textDecoration: 'none' }}>
        <ListItem alignItems="flex-start" className={classes.listItem}>
            <ListItemAvatar>
                <Avatar alt="Product Image" src={p.imageUrl}
                className={classes.large} />
            </ListItemAvatar>
        <ListItemText primary={shortName} className={classes.product} color="textPrimary"/>
        </ListItem>
    </Link>
    )}
