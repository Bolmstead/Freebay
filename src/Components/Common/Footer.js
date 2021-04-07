import React from "react";
import useStyles from './Stylings/styleFooter';
import { Typography } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';

function Footer() {
    const classes = useStyles();

  return (
      <div>
      <hr className={classes.hr}/>
      <div className={classes.footerContainer}>
          <div className={classes.footerTextContainer}>
            <Typography variant="body2" color="textSecondary" component="p" align="center" className={classes.footerText}>
           Developed by Berkley Olmstead 
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p" align="center" className={classes.footerText}>
           |
              </Typography>
          </div>
        <Link href="https://github.com/Bolmstead/freebay-frontend" >
          <GitHubIcon className={classes.icon}/>
        </Link>
        <a href="mailto:olms2074@gmail.com" >
          <EmailIcon className={classes.icon}/>
        </a>
        <Link href="https://www.linkedin.com/in/berkleyolmstead/" >
          <LinkedInIcon className={classes.icon}/>
        </Link>
        </div>
      </div>
  )
}

export default Footer;