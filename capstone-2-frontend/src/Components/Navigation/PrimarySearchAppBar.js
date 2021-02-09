import React from 'react';
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



const useStyles = makeStyles((theme) => ({
  balance: {
    color: "black"
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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

}));

function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" style= {{background: "#FFFFFF"}}>
        <Toolbar className= "flex">  
          <Link href="/">
            <img src="/images/logo.png" alt="logo" id="logo"></img>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for anything"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div>
            <span className={classes.balance}>$69.00</span>
            <IconButton aria-label="show 17 new notifications" color="black">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="black"
            >
              <AccountCircle />
            </IconButton>
          </div> 
          {/* <div >
          <Button color="black">Login</Button>
          <Button color="black">Signup</Button>
          </div> */}

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PrimarySearchAppBar;