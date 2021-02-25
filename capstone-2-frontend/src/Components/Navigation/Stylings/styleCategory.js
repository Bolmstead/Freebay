import { makeStyles } from '@material-ui/core/styles';

// A category of the CategoriesBar component.
// shows a submenu of sub-categories when clicked.

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(0),
  },
}));

export default {
  useStyles
};