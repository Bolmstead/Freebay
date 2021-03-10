import React from 'react';
import Category from './Category'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import useStyles from './Stylings/styleCategoriesBar';

// Navigation bar for a user to get to certain product pages of certain categories.
// Rendered below the Search Navigation bar and renders multiple category components.

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
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar className="center" className= {classes.root}ariant="dense">
          <Container>
          <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
            <Grid item >
              <Category category={"Electronics"} className= "flexItem"
              subCategories = {["Cell Phones & Accessories", "Computers & Accessories", "Photo", "Smart Home"]}/>
            </Grid>
            <Grid item >
              <Category category={"Fashion"} className= "flexItem"
              subCategories = {["Women", "Men", "Boys", "Girls", "Baby"]}/>
            </Grid>
            <Grid item >
              <Category category={"Home & Garden"} className= "flexItem"
              subCategories = {["Appliances", "Household", "Home Improvement", "Kitchen & Dining"]}/>
            </Grid>
            <Grid item >
              <Category category={"Movies, TV, & Games"} className= "flexItem"
              subCategories = {["Movies & TV", "Toys & Games", "Video Games"]}/>
            </Grid>
            <Grid item >
              <Category category={"Misc."} className= "flexItem" 
              subCategories = {["Arts & Crafts", "Automotive", "Grocery", "Pet Supplies", "Sports & Hobbies"]}/>
            </Grid>
          </Grid>
          </Container>
        </Toolbar>
      </AppBar>
  );
}

export default ProductCategoriesBar;