import React from "react";
import useStyles from "./Stylings/styleFooter";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

// Personal contact information to be displayed at the
// bottom of every page

function Footer() {
  const classes = useStyles();

  return (
    <Container className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.footerTextContainer}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            align="center"
            className={classes.footerText}
          >
            Developed by Berkley Olmstead
          </Typography>
        </div>{" "}
        <Link href="www.berkleyolmstead.com">
          <img className={classes.icon} src={"/Images/websiteicon.png"} />
        </Link>
        <Link href="https://www.linkedin.com/in/berkleyolmstead/">
          <img className={classes.icon} src={"/Images/linkedin.png"} />
        </Link>
        <Link href="https://github.com/Bolmstead/freebay-frontend">
          <img className={classes.icon} src={"/Images/github.png"} />
        </Link>
      </div>
    </Container>
  );
}

export default Footer;
