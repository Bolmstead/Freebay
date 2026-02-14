import React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import useStyles from "./Stylings/styleUserBidsOrWinsFeed";
import FeedItem from "./FeedItem.jsx";
import ReactLoading from "react-loading";

/* Renders a list of <FeedItem/> components of product information.
   Will either show a user's highest bids or products won.
   To be displayed on every user's profile page */

export default function UserBidsOrWinsFeed({ ...props }) {
  const classes = useStyles();
  const { products, title, loading } = props;

  return (
    <Paper elevation={3} className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2" align="center" className={classes.feedTitle}>
          {title}
        </Typography>
        <List className={classes.itemList}>
          {loading ? (
            <ReactLoading type={"spinningBubbles"} color={"#BDBDBD"} height={100} />
          ) : null}
          {products.length > 0 ? products.map((p) => <FeedItem p={p} />) : null}
        </List>
      </CardContent>
    </Paper>
  );
}
