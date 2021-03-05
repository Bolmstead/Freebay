import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backGroundColor: "#F6F6F6",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  card: {
    backgroundColor: "white",
  },
  cardContent: {
    maxHeight: 150, 
    overflow: 'auto'
  },
  feedGrid: {
    verticalAlign: "top"
  }
}));

export default useStyles