import React from "react";
import Category from "./Category";
import MobileCategory from "./MobileCategory";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import useStyles from "./Stylings/styleCategoriesBar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

/** Application bar located at the top of every page on site below the
 *  PrimarySearchAppBar. Displays <Category> button components of all possible
 *  product categories. When a category is clickend a menu dropdown
 *  renders of subcategory links is displayed.
 */

const Accordion = styled(MuiAccordion)({
  border: "1px solid rgba(0, 0, 0, .125)",
  boxShadow: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "auto",
  },
});

const AccordionSummary = styled(MuiAccordionSummary)({
  backgroundColor: "rgba(0, 0, 0, .03)",
  borderBottom: "1px solid rgba(0, 0, 0, .125)",
  marginBottom: -1,
  minHeight: 56,
  "&.Mui-expanded": {
    minHeight: 56,
  },
  "& .MuiAccordionSummary-content": {
    "&.Mui-expanded": {
      margin: "12px 0",
    },
  },
});

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

function ProductCategoriesBar() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const renderMenu = (
    <AppBar position="static" className={classes.sectionDesktop} elevation={0}>
      <Toolbar className={classes.root} variant="dense">
        <Container>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <Category
                category={"Electronics"}
                className="flexItem"
                subCategories={[
                  "Cell Phones and Accessories",
                  "Computers and Accessories",
                  "Photo",
                  "Smart Home",
                ]}
              />
            </Grid>
            <Grid item>
              <Category
                category={"Fashion"}
                className="flexItem"
                subCategories={["Womens", "Mens", "Boys", "Girls", "Baby"]}
              />
            </Grid>
            <Grid item>
              <Category
                category={"Home & Garden"}
                className="flexItem"
                subCategories={[
                  "Appliances",
                  "Health and Household",
                  "Home Improvement",
                  "Kitchen and Dining",
                ]}
              />
            </Grid>
            <Grid item>
              <Category
                category={"Movies, TV, & Games"}
                className="flexItem"
                subCategories={["Movies and TV", "Toys and Games", "Video Games"]}
              />
            </Grid>
            <Grid item>
              <Category
                category={"Misc."}
                className="flexItem"
                subCategories={["Arts and Crafts", "Grocery", "Pet Supplies", "Sports and Fitness"]}
              />
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
  const renderMobileMenu = (
    <div className={classes.sectionMobile}>
      <Accordion square expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Electronics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MobileCategory
            subCategories={[
              "Cell Phones and Accessories",
              "Computers and Accessories",
              "Photo",
              "Smart Home",
            ]}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Fashion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MobileCategory subCategories={["Womens", "Mens", "Boys", "Girls", "Baby"]} />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Home & Garden</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MobileCategory
            subCategories={[
              "Appliances",
              "Health and Household",
              "Home Improvement",
              "Kitchen and Dining",
            ]}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Movies, TV, & Games</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MobileCategory subCategories={["Movies and TV", "Toys and Games", "Video Games"]} />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Misc.</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MobileCategory
            subCategories={["Arts and Crafts", "Grocery", "Pet Supplies", "Sports and Fitness"]}
          />
        </AccordionDetails>
      </Accordion>
      <br></br>
    </div>
  );

  return (
    <div>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default ProductCategoriesBar;
