import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import FreebayAPI from "../../Api.js";
import Context from "../../Context";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import UserBidsOrWinsFeed from "../Feeds/UserBidsOrWinsFeed";
import LoadingText from "../Common/LoadingText";
import Notifications from "./Notifications";
import ProfileImageCard from "./ProfileImageCard";
import useStyles from "./Stylings/styleProfile";

// A users profile. Notifications feed will only be shown
// if it is the logged in user's profile.

function Profile() {
  const classes = useStyles();
  const history = useHistory();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const { username } = useParams();
  const { currentUser } = useContext(Context);

  useEffect(() => {
    async function getUserProfile(username) {
      try {
        let userObject = await FreebayAPI.getUser(username);
        setUserProfile(userObject);
      } catch (err) {
        return history.push("/notFound");
      }
    }
    getUserProfile(username);
    setLoading(false);
  }, []);

  if (!userProfile) return <LoadingText />;

  const { productsWon, bids } = userProfile;

  return (
    <Container>
      <br />
      {currentUser ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="row"
          spacing={3}
          className={classes.feedGrid}
        >
          {currentUser.username === userProfile.username ? (
            <Grid item xs={12} md={4}>
              <ProfileImageCard userProfile={userProfile} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <ProfileImageCard userProfile={userProfile} />
            </Grid>
          )}
          {currentUser.username === userProfile.username ? (
            <Grid item xs={12} md={7}>
              <Notifications />
            </Grid>
          ) : (
            <div></div>
          )}

          <Grid
            item
            xs={12}
            md={6}
            spacing={3}
            justify="center"
            alignItems="top"
            direction="row"
            className={classes.feedGrid}
          >
            <UserBidsOrWinsFeed
              products={productsWon}
              loading={loading}
              title={"Products Won"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            spacing={3}
            justify="center"
            alignItems="top"
            direction="row"
            className={classes.feedGrid}
          >
            <UserBidsOrWinsFeed
              products={bids}
              loading={loading}
              title={"Highest Bids"}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="row"
          spacing={3}
          className={classes.feedGrid}
        >
          <Grid item xs={12}>
            <ProfileImageCard userProfile={userProfile} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            spacing={3}
            justify="center"
            alignItems="top"
            direction="row"
            className={classes.feedGrid}
          >
            <UserBidsOrWinsFeed
              products={productsWon}
              loading={loading}
              title={"Products Won"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            spacing={3}
            justify="center"
            alignItems="top"
            direction="row"
            className={classes.feedGrid}
          >
            <UserBidsOrWinsFeed
              products={bids}
              loading={loading}
              title={"Highest Bids"}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Profile;
