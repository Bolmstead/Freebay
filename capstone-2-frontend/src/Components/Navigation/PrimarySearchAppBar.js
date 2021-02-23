import React, { useState, useContext, useEffect } from "react";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Context from "../Common/Context";
import {Redirect, useHistory} from 'react-router-dom';
import FreebayAPI from "../../Api.js"

// Search Bar to allow user to search products.
// If logged in, displays user's account balance, notifications 
// icon, and profile icon. When clicked on, the notifications icon 
// will show user's unread notifications. If not logged in, shows 
// login and signup links.

const useStyles = makeStyles((theme) => ({
  balance: {
    color: "#282828",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex"

  },
  grow: {
    flexGrow: 1,
  },
  button: {
    textTransform: 'none',
    color: '#282828'	
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.10),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.15),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    flex: 3,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(.65, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
  flex: {
      display: 'flex',
    },
  searchButton: {
    background: 'none',
    padding: '0px',
    border: 'none',
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  sectionDesktop: {
    display: 'flex',
  },

  link: {
    textTransform: 'none'
  }

}));

function PrimarySearchAppBar() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [accountAnchorEl, setaccountAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [redirect, setRedirect] = useState(false);


  const { currentUser, logout} = useContext(Context);

  console.log("currentUser from PrimarySearchAppBar", currentUser)

  const history = useHistory()

  let notifications;
  let newNotifications;

  if (currentUser){
    notifications = currentUser["notifications"];
    console.log("notifications from PrimarySearchAppBar", notifications)
    newNotifications = notifications.filter( n => !n.wasViewed)
    console.log("newNotifications from PrimarySearchAppBar", newNotifications)
  }



  function handleChange(evt) {
    setSearchTerm(evt.target.value);
    console.log("searchTerm", searchTerm)
  }

  // Handle functionality of the app bar
  const isAccountMenuOpen = Boolean(accountAnchorEl);
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl);


  const handleProfileMenuOpen = (event) => {
    setaccountAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setaccountAnchorEl(null);
  };

  const handleNotificationsMenuOpen = (event) => {
    console.log("handleNotificationsMenuOpen")
    setNotificationsAnchorEl(event.currentTarget);
  };

  

  useEffect(function viewNotifications() {
    async function viewNotificationsApi() {
        try {
          await FreebayAPI.viewNotifications(currentUser.email);
        } catch (err) {
          console.error("Error with FreebayAPI.viewNotifications()", err);
        }
      }
    viewNotificationsApi();
  }, [notificationsAnchorEl]);


  // Handle the Input in the Search Bar
  function handleSubmit(evt) {
    console.log("searchTerm from handleSubmit", searchTerm)
    let newUrl = `/products?name=` + searchTerm
    console.log("newUrl from the handlesubmit in searchbar",newUrl)
    setRedirect(true)
    if(redirect){
      return <Redirect to='products?name=tv'/>
   }
    }



  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };





  const menuId = 'primary-search-account-menu';
  const renderAccountMenu = (
    <Menu
      anchorEl={accountAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isAccountMenuOpen}
      onClose={handleProfileMenuClose}
      className={classes.link}
    >
      { currentUser 
      ? <Link href={"/Profile/" + currentUser["username"]}><MenuItem onClick={handleProfileMenuClose} className={classes.link}>Profile</MenuItem></Link>
      : <MenuItem onClick={handleProfileMenuClose} className={classes.link}>Profile</MenuItem>
      } 
      <Link className="m-2" onClick={logout} className={classes.link}><MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem></Link>
    </Menu>
  );




  const renderNotificationsMenu = (
    
    <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotificationsMenuOpen}
      onClose={handleNotificationsMenuClose}
    >
    { notifications 
    ?
      ( newNotifications.length > 0
      ?
        newNotifications.map( n => (<MenuItem onClick={handleNotificationsMenuClose}>{n.text}</MenuItem>))
      :
      <MenuItem onClick={handleNotificationsMenuClose}>No new notifications</MenuItem>
      )
    :
      <div></div>
    }
    </Menu>
  );


  console.debug(
    "PrimarySearchAppBar",
    "currentUser=", currentUser,
  );
    
  return (
    <div className={classes.grow}>
      <AppBar position="static" style= {{background: "#FFFFFF"}} elevation={0}>
        <Toolbar className= "flex">  
          <Link href="/">
            <img src="/images/logo.png" alt="logo" id="logo"></img>
          </Link>
          <div className={classes.search}>
          <form onSubmit={handleSubmit} >
            <div className={classes.searchIcon}>
              <button type="submit" className={classes.searchButton} >
                <SearchIcon />
              </button>
            </div>
            <InputBase
              placeholder="Search for anything"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
          </div>
          {currentUser 
          ?  <div>

                <div className={classes.sectionDesktop}>
                <Typography className={classes.balance}>{"$" + currentUser["balance"]}</Typography>
                <IconButton aria-label="show notifications">
                  {newNotifications.length > 0 
                  ? <Badge badgeContent={newNotifications.length} color="secondary" >      
                      <NotificationsIcon 
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      onClick={handleNotificationsMenuOpen}
                      aria-haspopup="true"/>
                    </Badge>
                  : <NotificationsIcon 
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    onClick={handleNotificationsMenuOpen}
                    aria-haspopup="true"/>}

                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  onClick={handleProfileMenuOpen}
                  aria-haspopup="true"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            </div>
          :  <div>
                <Button color="default" href="/login" className={classes.button}>Login</Button>
                <Button color="default" href="/signup" className={classes.button}>Signup</Button>
             </div>
          }
        </Toolbar>
      </AppBar>
      
      {renderNotificationsMenu}
      {renderAccountMenu}
    </div>
  )
}

export default PrimarySearchAppBar;