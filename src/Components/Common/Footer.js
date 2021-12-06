import React from "react";
import useStyles from "./Stylings/styleFooter";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

// Personal contact information to be displayed at the
// bottom of every page

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <hr className={classes.hr} />
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
        </div>
        <Link href="https://github.com/Bolmstead/freebay-frontend">
          <GitHubIcon className={classes.icon} />
        </Link>
        <Link href="https://www.linkedin.com/in/berkleyolmstead/">
          <LinkedInIcon className={classes.icon} />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
