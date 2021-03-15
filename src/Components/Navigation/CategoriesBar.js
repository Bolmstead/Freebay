import React from 'react';
import Category from './Category'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import useStyles from './Stylings/styleCategoriesBar';


/** Application bar located at the top of every page on site below the
 *  PrimarySearchAppBar. Displays <Category> components of all possible 
 *  product categories. When a category is clickend a menue dropdown 
 *  renders of subcategory links renders. 
 */

function ProductCategoriesBar() {
  const classes = useStyles();
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