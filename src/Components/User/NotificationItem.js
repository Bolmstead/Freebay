import React, { useContext } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Context from "../../Context";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Hidden from '@material-ui/core/Hidden';


// Displays a feed of a user's viewed and unviewed notifications. 
// If a user has not viewed a notification, the notification will be highlighted.

export default function NotificationItem({n, shortened}) {

  const { currentUser } = useContext(Context);

  if (!currentUser) {
    return <div></div>
  }

  let icon;

  if (n.category === "bid") {
    icon = <AttachMoneyIcon />
  } else if (n.category === "outbid") {
    icon = <SentimentDissatisfiedIcon />
  } else if (n.category === "win") {
    icon = <InsertEmoticonIcon />
  } else if (n.category === "gift") {
    icon = <CardGiftcardIcon />
  }

  if ((shortened) && (n.text.length > 50)) {
    n.text = n.text.substring(0, 47) + "..."
  }

  return (
    <ListItem dense="true">
      <Hidden Hidden only={['xs']}>
        <ListItemAvatar>
          <Avatar>
            {icon}
          </Avatar>
        </ListItemAvatar>
      </Hidden>
      <ListItemText
        primary={n.text}
      />
    </ListItem>
  );
}
