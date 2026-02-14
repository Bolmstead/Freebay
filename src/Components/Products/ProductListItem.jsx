import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import useStyles from "./Stylings/styleProductListItem.js";
import ReactLoading from "react-loading";

// Feed of a user's highest bids. To be displayed for anyone viewing the page

export default function ProductListItem(userProfile) {
  const classes = useStyles();

  const { highest_bids } = userProfile["userProfile"];

  return (
    <div className={classes.root}>
      <Paper className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <List className={classes.root}>
            {highest_bids ? (
              highest_bids.map((p) => (
                <Link href={"/Product/" + p.id} className={classes.product}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Product Image" src={p.imageUrl} className={classes.large} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={p.name}
                      className={classes.product}
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant="caption"
                            className={classes.inlineProduct}
                            color="textPrimary"
                          >
                            ${p.bidPrice}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Link>
              ))
            ) : (
              <ReactLoading type={"spinningBubbles"} color={"#BDBDBD"} height={100} />
            )}
          </List>
        </CardContent>
      </Paper>
    </div>
  );
}
