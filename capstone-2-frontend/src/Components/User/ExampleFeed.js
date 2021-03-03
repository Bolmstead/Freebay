import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './Stylings/styleExampleFeed.js'


export default function ExampleFeed() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange}>
          U
        </Avatar>
        <ListItemText
          primary="Username1"
          secondary={
            <React.Fragment>
              {"Purchased a 50 inch Samsung TV"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange}>
          B
        </Avatar>
        <ListItemText
          primary="Bob Urstead"
          secondary={
            <React.Fragment>
              {"Purchased a 50 foot Sears Washer..."}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange}>
          R
        </Avatar>
        <ListItemText
          primary="Ryan Smith"
          secondary={
            <React.Fragment>
              {"Purchased an iphone"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}