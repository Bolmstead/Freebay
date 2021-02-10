import React from 'react';
import Category from './Category'
import './CategoriesBar.css'



import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


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
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';




const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#FFFFFF"
  },
  menuButton: {
    maxWidth: '30px', 
    maxHeight: '30px', 
    minWidth: '30px', 
    minHeight: '30px'
  },
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  flexItem: {
    flex: 1
    },

}));

function ProductCategoriesBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className="center" className= {classes.root}>
          <Container>
          <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
          
          <Category category={"Electronics"} className= "flexItem"
          subCategories = {["Cellphones & Accessories", "Computers & Accessories", "Photo", "Smart Home"]}/>
          
          <Category category={"Fashion"} className= "flexItem"
          subCategories = {["Women", "Men", "Boys", "Girls", "Baby"]}/>
          
          <Category category={"Home & Garden"} className= "flexItem"
          subCategories = {["Appliances", "Household", "Home Improvement", "Kitchen & Dining", "Lawn & Garden"]}/>
          
          <Category category={"Movies, TV, & Games"} className= "flexItem"
          subCategories = {["Movies & TV", "Toys & Games", "Videogames"]}/>
          
          <Category category={"Misc."} className= "flexItem"
          subCategories = {["Arts & Crafts", "Automotive", "Books", "Grocery", "Muiscal Instruments", "Pet Supplies", "Sports & Hobbies"]}/>
          </Grid>
          </Container>
        </Toolbar>
      </AppBar>
  );
}

export default ProductCategoriesBar;