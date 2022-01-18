import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import useStyles from "./Stylings/styleRecentWinsFeed.js";
import FreebayAPI from "../../Api";
import Divider from "@material-ui/core/Divider";
import ReactLoading from "react-loading";

/* Renders list of products that were most recently won by any 
user. To be displayed on the home page */

export default function RecentWinsFeed(haveBidsBeenChecked) {
  const classes = useStyles();
  const [recentWins, setRecentWins] = useState(null);
  //Number of products
  const numOfRecentWins = 3;

  useEffect(() => {
    async function getRecentWins() {
      // Grab the most recent winners from API
      const result = await FreebayAPI.getRecentWins(numOfRecentWins);

      // Map the result shortening the name of each
      // product to better fit in homepage
      result.map(
        (product) => (product.name = product.name.substring(0, 70) + "...")
      );

      setRecentWins(result);
    }
    getRecentWins();
  }, [haveBidsBeenChecked]);

  if (!recentWins) {
    return (
      <List className={classes.loadingSpinner}>
        <ReactLoading type={"spinningBubbles"} color={"#BDBDBD"} height={100} />{" "}
      </List>
    );
  }

  return (
    <List className={classes.root}>
      {recentWins[0] ? (
        recentWins.map((product) => (
          <div>
            <ListItem alignItems="flex-start">
              <Link
                href={"/Profile/" + product.username}
                style={{ textDecoration: "none" }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Product Image"
                    className={classes.large}
                    src={
                      product.userImageUrl ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    }
                  ></Avatar>
                </ListItemAvatar>
              </Link>
              <Link
                href={"/Profile/" + product.username}
                style={{ textDecoration: "none" }}
              >
                <ListItemText
                  primary={product.username}
                  className={classes.listItem}
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="caption"
                        className={classes.inline}
                        color="textSecondary"
                      >
                        {product.name}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </Link>
            </ListItem>
            {/* render a divider for each list item unless it is last in array */}
            {recentWins.indexOf(product) === recentWins.length - 1 ? (
              <div></div>
            ) : (
              <Divider variant="inset" component="li" />
            )}
          </div>
        ))
      ) : (
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justify="flex-start"
        >
          <Grid item xs={12}>
            <ReactLoading
              type={"spinningBubbles"}
              color={"#BDBDBD"}
              height={100}
            />{" "}
          </Grid>
        </Grid>
      )}
    </List>
  );
}
