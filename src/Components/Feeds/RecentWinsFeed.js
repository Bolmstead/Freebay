import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import FreebayAPI from "../../Api";
import useStyles from "./Stylings/styleRecentWinsFeed.js";

/* Renders list of products that were most recently won by any 
user. To be displayed on the home page */

export default function RecentWinsFeed(haveBidsBeenChecked) {
  const classes = useStyles();
  const [recentWins, setRecentWins] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
    getRecentWins();
  }, [haveBidsBeenChecked]);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactLoading type={"spinningBubbles"} color={"#BDBDBD"} height={100} />{" "}
      </div>
    );
  }

  if (!loading && recentWins) {
    if (recentWins.length === 0) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <Typography
            variant="h6"
            component="h6"
            align="center"
            style={{ color: "gray", marginTop: "40px" }}
          >
            No winners yet
          </Typography>
          <br />
        </div>
      );
    }
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
                    src={product.userImageUrl || "👤"}
                  >
                    {" "}
                  </Avatar>
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
