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


// Displays a list item to be seen in a menu drop down
// when a user clicks on the notifications icon

export default function NotificationAppBarItem({n, shortened}) {

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

  if ((shortened) && (n.text.length > 45)) {
    n.text = n.text.substring(0, 42) + "..."
  }

  return (
    <ListItem>
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
