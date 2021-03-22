import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './Stylings/styleBidsOrWinsFeed.js'


// List item displaying product's title and its highest bid. 
// Rendere within the <UserBidsFeed/> and <UserWinsFeed/> components.

export default function FeedItem(product) {
    const classes = useStyles();
    let {p} = product

    return (
    <Link href={"/Product/" + p.id} className={classes.product} 
    style={{ textDecoration: 'none' }}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Product Image" src={p.imageUrl}
                className={classes.large} />
            </ListItemAvatar>
        <ListItemText primary={p.name} className={classes.product} color="textPrimary" 
            secondary={
            <React.Fragment>
                <Typography variant="caption" className={classes.inline} 
                color="textPrimary" className={classes.product}>
                    ${p.bidPrice}
                </Typography>
            </React.Fragment>
            }
        />
        </ListItem>
    </Link>
    )}
