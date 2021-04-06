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
    backgroundColor: "#F6F6F6",
  },
  itemList:{
    backgroundColor: "#F6F6F6",
    maxHeight: 290, 
    minHeight: 200, 
    overflow: 'auto'
  },
  cardContent: {
  },
  feedGrid: {
    verticalAlign: "top"
  },
  feedTitle: {
    fontWeight: "bold"
  }
}));

export default useStyles