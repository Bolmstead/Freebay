import React from 'react';
import Category from './Category'
import MobileCategory from './MobileCategory'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import useStyles from './Stylings/styleCategoriesBar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';


/** Application bar located at the top of every page on site below the
 *  PrimarySearchAppBar. Displays <Category> button components of all possible 
 *  product categories. When a category is clickend a menu dropdown 
 *  renders of subcategory links is displayed. 
 */

 const Accordion = withStyles({
  accordion: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    'and:not(:last-child)': {
      borderBottom: 0,
    },
    'and:before': {
      display: 'none',
    },
    'and$expanded': {
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
    'and$expanded': {
      minHeight: 56,
    },
  },
  content: {
    'and$expanded': {
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
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
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
              subCategories = {["Cell Phones and Accessories", 
              "Computers and Accessories", "Photo", "Smart Home"]}/>
            </Grid>
            <Grid item >
              <Category category={"Fashion"} className= "flexItem"
              subCategories = {["Womens", "Mens", "Boys", "Girls", "Baby"]}/>
            </Grid>
            <Grid item >
              <Category category={"Home & Garden"} className= "flexItem"
              subCategories = {["Appliances", "Health and Household", 
              "Home Improvement", "Kitchen and Dining"]}/>
            </Grid>
            <Grid item >
              <Category category={"Movies, TV, & Games"} className= "flexItem"
              subCategories = {["Movies and TV", "Toys and Games", "Video Games"]}/>
            </Grid>
            <Grid item >
              <Category category={"Misc."} className= "flexItem" 
              subCategories = {["Arts and Crafts", "Grocery", 
              "Pet Supplies", "Sports and Fitness"]}/>
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
            subCategories = {["Cell Phones and Accessories", 
            "Computers and Accessories", "Photo", "Smart Home"]}/>
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
              "Home Improvement", "Kitchen and Dining"]}/>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Movies, TV, & Games</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <MobileCategory
              subCategories = {["Movies and TV", "Toys and Games", "Video Games"]}/>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Misc.</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <MobileCategory
              subCategories = {["Arts and Crafts", "Grocery", 
              "Pet Supplies", "Sports and Hobbies"]}/>
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