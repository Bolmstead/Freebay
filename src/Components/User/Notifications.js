import React, { useContext } from "react";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Context from "../../Context";
import useStyles from './Stylings/styleNotifications.js'
import Paper from '@material-ui/core/Paper';
import NotificationItem from './NotificationItem'
import Link from '@material-ui/core/Link';


// Displays a feed of a user's viewed and unviewed notifications. 

export default function Notifications() {
  const classes = useStyles();
  const { currentUser } = useContext(Context);
  let { notifications } = currentUser

  return (
    <Paper elevation={3} className={classes.card} >  
      <CardContent className={classes.cardContent}>
        <Typography className={classes.feedTitle} variant="h5" component="h2" align="center">
          Notifications
        </Typography>
        <List className={classes.itemList} >
          {( notifications.map( n => (
              n.relatedProductId
              ? <Link href={"/product/"+ n.relatedProductId} 
                      color="inherit" 
                      style={{ textDecoration: 'none' }}
                >
                  <NotificationItem n={n} />
                </Link>
              : 
                <NotificationItem n={n} />
              ))
            )
          }
        </List>
      </CardContent>
    </Paper>
  );
}
