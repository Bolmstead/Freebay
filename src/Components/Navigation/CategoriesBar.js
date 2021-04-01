import React from 'react';
import Category from './Category'
import MobileCategory from './MobileCategory'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import useStyles from './Stylings/styleCategoriesBar';
import { withStyles } from '@material-ui/core/styles';
import { fade, makeStyles } from '@material-ui/core/styles';
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
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';


/** Application bar located at the top of every page on site below the
 *  PrimarySearchAppBar. Displays <Category> components of all possible 
 *  product categories. When a category is clickend a menue dropdown 
 *  renders of subcategory links renders. 
 */

 const Accordion = withStyles({
  accordion: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);


function ProductCategoriesBar() {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMenu = (
    <AppBar position="static" className={classes.sectionDesktop} elevation={0}>
      <Toolbar className="center" className= {classes.root} variant="dense">
        <Container>
          <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
            <Grid item >
              <Category category={"Electronics"} className= "flexItem"
              subCategories = {["Cell Phones & Accessories", 
              "Computers & Accessories", "Photo", "Smart Home"]}/>
            </Grid>
            <Grid item >
              <Category category={"Fashion"} className= "flexItem"
              subCategories = {["Women", "Men", "Boys", "Girls", "Baby"]}/>
            </Grid>
            <Grid item >
              <Category category={"Home & Garden"} className= "flexItem"
              subCategories = {["Appliances", "Household", 
              "Home Improvement", "Kitchen & Dining"]}/>
            </Grid>
            <Grid item >
              <Category category={"Movies, TV, & Games"} className= "flexItem"
              subCategories = {["Movies & TV", "Toys & Games", "Video Games"]}/>
            </Grid>
            <Grid item >
              <Category category={"Misc."} className= "flexItem" 
              subCategories = {["Arts & Crafts", "Grocery", 
              "Pet Supplies", "Sports & Hobbies"]}/>
            </Grid>
          </Grid>
        </Container>
        </Toolbar>
      </AppBar>


  )
  const renderMobileMenu = (
    <div className={classes.sectionMobile}>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Electronics</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <MobileCategory
            subCategories = {["Cell Phones & Accessories", 
            "Computers & Accessories", "Photo", "Smart Home"]}/>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Fashion</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <MobileCategory
              subCategories = {["Women", "Men", "Boys", "Girls", "Baby"]}/>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Home & Garden</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <MobileCategory
              subCategories = {["Appliances", "Household", 
              "Home Improvement", "Kitchen & Dining"]}/>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Movies, TV, & Games</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <MobileCategory
              subCategories = {["Movies & TV", "Toys & Games", "Video Games"]}/>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Misc.</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <MobileCategory
              subCategories = {["Arts & Crafts", "Grocery", 
              "Pet Supplies", "Sports & Hobbies"]}/>
        </AccordionDetails>
      </Accordion>
      <br></br>
      
    </div>
  )

  return (
    <div>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default ProductCategoriesBar;