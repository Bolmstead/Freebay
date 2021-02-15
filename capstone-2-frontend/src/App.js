import React, { useState, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import jwt from "jsonwebtoken";
import PrimarySearchAppBar from './Components/Navigation/PrimarySearchAppBar.js'
import CategoriesBar from './Components/Navigation/CategoriesBar/CategoriesBar.js'
import TestAppBar from './Components/Navigation/CategoriesBar/Category.js'
import Routes from './Routes.js'
import Container from '@material-ui/core/Container';
import Context from "./Components/Common/Context.js";
import FreebayAPI from './Api'
import useLocalStorage from "./hooks/useLocalStorage";
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingSpinner from './Components/Common/LoadingSpinner.js'


export const TOKEN_STORAGE_ID = "freebay-token";


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  
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
          // put the token on the Api class so it can use it to call the API.
          console.log("FreebayAPI.token", FreebayAPI.token)
          FreebayAPI.token = token;
          let userResult = await FreebayAPI.getUser(username);
          console.log("userResult",userResult)
          setCurrentUser(userResult);
          console.log("right here is the issue")
          console.log("currentUser", currentUser, "token", token)
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true)
    }

    // once the data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false)
    getCurrentUser();

  }, [token]);

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



// PRODUCT HOOKS
  async function getProductsInCategory(category) {
    let res = await FreebayAPI.getProductsInCategory(category);
    setProducts(res);
    console.log("products", products)
  }

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
    <div className="App">
      <header className="App-header">
      <Context.Provider value={{ currentUser, setCurrentUser, signup, login, products, getProducts, getProductsInCategory, getProduct, logout}}>

        <BrowserRouter>

        <Container>
        <PrimarySearchAppBar />
        <hr style={{height:'1px', borderWidth:0, color:'lightgrey', backgroundColor: '#e6e6e6', margin:0, padding: 0,}}/>
        <CategoriesBar/>
        <Routes/>
        <Container>
        </Container>
        </Container>
        </BrowserRouter>

        </Context.Provider>

      </header>
    </div>
  );
}

export default App;
