import React, { useState, useEffect, useContext } from "react";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import SearchForm from "../Common/SearchForm"
import FreebayAPI from '../../Api.js'
import Context from "../Common/Context";
import {Redirect, useHistory} from 'react-router-dom';


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

}));

function PrimarySearchAppBar() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [accountAnchorEl, setaccountAnchorEl] = React.useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(null);


  const { products, getProducts, currentUser, getCurrentUser, logout} = useContext(Context);
  const history = useHistory()
  let numOfNotifications;

  if (currentUser) {
    const numOfNotifications = currentUser["notifications"]
  }
  console.log("numOfNotifications",numOfNotifications)

  // Handle the Input in the Search Bar
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    // evt.preventDefault()
    console.log("searchTerm", searchTerm)
    let newUrl = `/products?name=` + searchTerm
    console.log("newUrl from the handlesubmit in searchbar",newUrl)
    return <Redirect to={newUrl}/>
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
    setNotificationsAnchorEl(event.currentTarget);
  };

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
    >
      { currentUser 
      ? <Link href={"/Profile/" + currentUser["username"]}><MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem></Link>
      : <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
      } 
      <Link href={"/"} className="m-2" onClick={logout}><MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem></Link>
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
      <MenuItem onClick={handleNotificationsMenuClose}>"example notification"</MenuItem>
      <MenuItem onClick={handleNotificationsMenuClose}>View all notifications</MenuItem>
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
                  {numOfNotifications 
                  ? <Badge badgeContent={numOfNotifications.length()} color="secondary" >      
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
                <Button color="default" href="/login" className={classes.button} onClick={logout}>Login</Button>
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