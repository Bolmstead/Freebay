import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { getRecentWins } from "../../Api";
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
    async function fetchRecentWins() {
      const result = await getRecentWins(numOfRecentWins);

      result.forEach((product) => {
        product.name = product.name.substring(0, 70) + "...";
      });

      setRecentWins(result);
      setLoading(false);
    }
    fetchRecentWins();
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
              <Link href={"/Profile/" + product.username} style={{ textDecoration: "none" }}>
                <ListItemAvatar>
                  <Avatar
                    alt="Product Image"
                    className={classes.large}
                    src={
                      product.userImageUrl === ""
                        ? "https://i.pinimg.com/474x/2a/bd/8b/2abd8bb2736468d7199cbf68bd2061a0.jpg"
                        : product.userImageUrl
                    }
                  >
                    {" "}
                  </Avatar>
                </ListItemAvatar>
              </Link>
              <Link href={"/Profile/" + product.username} style={{ textDecoration: "none" }}>
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
        <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start">
          <Grid item xs={12}>
            <ReactLoading type={"spinningBubbles"} color={"#BDBDBD"} height={100} />{" "}
          </Grid>
        </Grid>
      )}
    </List>
  );
}
