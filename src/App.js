import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, useHistory, withRouter } from 'react-router-dom';
import jwt from "jsonwebtoken";
import PrimarySearchAppBar from './Components/Navigation/PrimarySearchAppBar.js'
import CategoriesBar from './Components/Navigation/CategoriesBar.js'
import Routes from './Routes.js'
import Container from '@material-ui/core/Container';
import Context from "./Components/Common/Context.js";
import FreebayAPI from './Api'
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingSpinner from './Components/Common/LoadingSpinner.js';
import useStyles from './Components/Common/Stylings/styleApp.js'


export const TOKEN_STORAGE_ID = "freebay-token";

// Renders entire Application

function App() {
  const classes = useStyles();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [updateAppBar, setUpdateAppBar] = useState(false);
  const [searchObject, setSearchObject] = useState(null)

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  const history = useHistory()

  
  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          console.log("FreebayAPI.token", FreebayAPI.token)
          FreebayAPI.token = token;
          let userResult = await FreebayAPI.getUser(username);
          console.log("userResult",userResult)
          setCurrentUser(userResult);
          console.log("currentUser", currentUser, "token", token)
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true)
      // setUpdateAppBar(false)
    }

    setInfoLoaded(false)
    getCurrentUser();

  }, [token, updateAppBar]);

  async function login(loginData) {
    try {
      let loginToken = await FreebayAPI.login(loginData);
      console.log("currentUser", currentUser, "token", token)
      setToken(loginToken);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
    history.push('/')
  }

  async function signup(data) {
    try {
      let token = await FreebayAPI.signup(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }



// Product Hooks
  async function getProducts(query) {
    let res = await FreebayAPI.getProducts(query);
    setProducts(res);
    console.log("products", products)
  }

  async function getProduct(id) {
    let res = await FreebayAPI.getProduct(id);
    setProducts(res);
    console.log("products", products)
  }


  console.log("currentUser", currentUser)
  console.log("token", token)

  if (!infoLoaded) return <LoadingSpinner />;


  return (
    <div className={classes.appWrapper}>
      <Context.Provider value={{ currentUser, setCurrentUser, signup, login, logout, products, getProduct, getProducts, setUpdateAppBar, searchObject, setSearchObject}}>

        <BrowserRouter>

        <Container>
        <PrimarySearchAppBar />
        <hr className={classes.hr}/>
        <CategoriesBar/>
        </Container>
        <Container>
        <Routes/>
        </Container>
        </BrowserRouter>

        </Context.Provider>

    </div>
  );
}

export default withRouter(App);
