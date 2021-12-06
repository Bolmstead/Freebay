import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from 'react-router-dom';
import jwt from "jsonwebtoken";
import PrimarySearchAppBar from './Components/Navigation/PrimarySearchAppBar.js'
import CategoriesBar from './Components/Navigation/CategoriesBar.js'
import Routes from './Routes.js'
import Container from '@material-ui/core/Container';
import Context from "./Context.js";
import Footer from "./Components/Common/Footer.js";
import FreebayAPI from './Api'
import useLocalStorage from "./hooks/useLocalStorageHook";
import useStyles from './Stylings/styleApp.js'
import LoadingText from './Components/Common/LoadingText'

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "freebay-token";


/** FreeBay application.
 *
 * - infoLoaded: has data been pulled from API?
 *   (if not, shows "loading..." text)
 *
 * - currentUser: user obj from API. This becomes the way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 * 
 * - updateAppBar: Boolean value that, when changed, the useEffect 
 *   loadUserInfo() is triggered which pulls the user's most current 
 *   information held in the API. The currentUser state is
 *   then changed which triggers a rerender of the App bar to show show the most 
 *   current balance and notificaions
 *
 * App -> Routes
 */

function App() {
  const classes = useStyles();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [updateAppBar, setUpdateAppBar] = useState(false);
  const [products, setProducts] = useState([]);
  const [updateProductsList, setUpdateProductsList] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const history = useHistory()

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out or 
  // when a bid is placed (to update user info in App Bar), so
  // the value of the token and updateAppBar are dependencies for this effect.

  useEffect(function loadUserInfo() {
    console.debug("token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          FreebayAPI.token = token;
          let userResult = await FreebayAPI.getUser(username);
          setCurrentUser(userResult);
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true)
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the loading text.
    setInfoLoaded(false)
    getCurrentUser();

  }, [token, updateAppBar]);

  // Handles site-wide login
  async function login(loginData) {
    try {
      let loginToken = await FreebayAPI.login(loginData);
      setToken(loginToken);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  // Handles site-wide logout
  function logout() {
    setCurrentUser(null);
    setToken(null);
    history.push('/')
  }

  // Handles site-wide signup
  async function signup(data) {
    try {
      let token = await FreebayAPI.signup(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return (
    <LoadingText/>
  )

  return (
    <div className={classes.app}>
      <Context.Provider value={{ currentUser, setCurrentUser, signup, 
        login, logout, setUpdateAppBar, products, setProducts, updateProductsList, setUpdateProductsList}}>
        <Container className={classes.appWrapper}>
          <PrimarySearchAppBar />
          <hr className={classes.hr}/>
          <CategoriesBar/>
          <Routes/>
          <Footer className={classes.footer}/>
        </Container>
      </Context.Provider>
    </div>
  );
}

export default withRouter(App);
