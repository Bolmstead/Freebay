import React, { useState, useContext } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Hidden from '@material-ui/core/Hidden';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {useHistory} from 'react-router-dom';
import FreebayAPI from "../../Api.js"
import useStyles from "./Stylings/stylePrimarySearchAppBar.js"
import NotificationItem from "../User/NotificationItem"
import Context from "../../Context"


/** Application bar located at the top of every page on site above the 
 * CategoriesBar. If logged in, displays user's account balance, 
 * notifications icon, and profile icon. If not logged in, shows login 
 * and signup links. Contains a search bar for a user to search all 
 * products.
 *
 * - searchTerm: The text a user types into the search bar. updates
 *   as user types. The searchTerm will be used to call the API to
 *   search all products
 * 
 * - accountAnchorEl & notificationsAnchorEl: Sets anchor points
 *   on the account/notifications button for the Material UI dropdown menu
 *   to know where to dropdown from.
 * 
 * - newNotifications: holds the notifications that have not yet been 
 *   seen by the user. Number of new notifications held in this state 
 *   will show as a number badge on the notifications icon if any.
 */

function PrimarySearchAppBar() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const { currentUser, logout, setProducts, updateProductsList, setUpdateProductsList} = useContext(Context);

  const history = useHistory()

  let allNotifications;
  let unviewedNotifications;

  // If logged in, save allNotifications that have not been 
  // viewed to a variable and set that as the initial value for
  // the newNotifications state
  if (currentUser){
    allNotifications = currentUser.notifications;
    unviewedNotifications = allNotifications.filter( n => !n.wasViewed)

  }
  const [newNotifications, setNewNotifications] = useState(unviewedNotifications);

  // update searchTerm state as user types into search bar
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  // Value of these variables determine whether the dropdown menu 
  // should render
  const isAccountMenuOpen = Boolean(accountAnchorEl);
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl);

  // Set the anchor element to the account icon when clicked to open.
  // Then to set to null when clicked to close
  const handleProfileMenuOpen = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAccountAnchorEl(null);
  };

  // Set the anchor element to the notifications icon when clicked 
  // to open. Then to set to null when clicked to close.
  // Also set the NewNotifications state to 0 to make red badge disappear
  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
    viewNotificationsApi()
    setNewNotifications(0)
  };
  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  // will set all of a user's notifications to viewed
  async function viewNotificationsApi() {
    try {
      await FreebayAPI.viewNotifications(currentUser.email);
    } catch (err) {
    }
  }

  // When a user submits a search term in the search bar, go to new page
  // with the desired search info
  function handleSubmit(evt) {
    evt.preventDefault();
    let newUrl = (`/products?name=` + searchTerm)
    setUpdateProductsList(true);
    history.push(newUrl)
   }
    
  const menuId = 'primary-search-account-menu';
  const renderAccountMenu = (
    <Popover
      anchorEl={accountAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isAccountMenuOpen}
      onClose={handleProfileMenuClose}
      className={classes.link}
    >
      { currentUser 
      ? 
        <Link href={"/Profile/" + currentUser.username} 
        color="inherit" style={{ textDecoration: 'none' }}>
          <MenuItem onClick={handleProfileMenuClose} className={classes.link}>
            Profile
          </MenuItem>
        </Link>
      : 
        <MenuItem onClick={handleProfileMenuClose} className={classes.link}>
          Profile
        </MenuItem>
      } 
      <Link className="m-2" onClick={logout} color="inherit" 
      className={classes.link} style={{ textDecoration: 'none' }}>
        <MenuItem onClick={handleProfileMenuClose}>
          Logout
        </MenuItem>
      </Link>
    </Popover>
  );

  const renderNotificationsMenu = (
    <Popover
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotificationsMenuOpen}
      onClose={handleNotificationsMenuClose}
    >
    { currentUser
      ? ( unviewedNotifications.length > 0
        ?
          unviewedNotifications.map( n => (
          <MenuItem onClick={handleNotificationsMenuClose}>
            {( n.relatedProductId
            ? <Link href={"/product/"+ n.relatedProductId} 
                    color="inherit" 
                    style={{ textDecoration: 'none' }}
              >
                <NotificationItem n={n} shortened={true}/>
              </Link>
            : <Link href={"/profile"} 
                    color="inherit" 
                    style={{ textDecoration: 'none' }}
              >
                <NotificationItem n={n} shortened={true} />
              </Link>
            )}
          </MenuItem>))
        :
        <MenuItem onClick={handleNotificationsMenuClose}>    
          No new notifications
        </MenuItem>
        )
      : <div></div>
    }
    </Popover>
  );
    
  return (
    <div className={classes.grow}>
      <Hidden smUp>
        <AppBar position="static" style= {{background: "#FFFFFF"}} elevation={0} className={classes.mobileLogoBar}>
          <Toolbar className= "flex">  
            <Link href="/" >
              <img src="/images/logo.png" alt="logo" className={classes.logo}></img>
            </Link>
          </Toolbar>
       </AppBar>
      </Hidden>

      <AppBar position="static" style= {{background: "#FFFFFF"}} elevation={0}>
        <Toolbar className= "flex">  
        <Hidden only="xs">
          <Link href="/" >
            <img src="/images/logo.png" alt="logo" className={classes.logo}></img>
          </Link>
        </Hidden>
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
          ?  
            <div>
              <div className={classes.sectionDesktop}>
                <Typography className={classes.balance}>
                  {"$" + currentUser.balance}
                </Typography>
                <IconButton aria-label="show notifications"
                onClick={handleNotificationsMenuOpen} >
                 <Badge badgeContent={newNotifications.length} 
                 color="secondary" > 
                    { currentUser.imageUrl
                    ?
                      <NotificationsIcon 
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      className={classes.notificationsIcon}/>
                    :
                      <NotificationsIcon 
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true" />
                    }
                    </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  onClick={handleProfileMenuOpen}
                  aria-haspopup="true"
                >
                { currentUser.imageUrl
                ?
                  <Avatar alt="Avatar" className = {classes.profileAvatar}src={currentUser.imageUrl} />
                :
                  <AccountCircle/>                
                }
                </IconButton>
              </div>
            </div>
          :  
            <div>
              <Button color="default" href="/login" className={classes.button}>
                Login
              </Button>
              <Button color="default" href="/signup" className={classes.button}>
                Signup
              </Button>
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