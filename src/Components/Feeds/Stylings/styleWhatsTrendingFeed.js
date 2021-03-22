import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: "white",
    textTransform: 'none'
  },
  inline: {
    display: 'inline',
  },
  product: {
    textTransform: 'none'
  },
  card: {
    backgroundColor: "white",
  },
  large: {
    width: "50px",
    height: "50px",
  },
  cardContent: {
    maxHeight: 150, 
    overflow: 'auto',
    minHeight: 150
  },
  listItemName: {
    fontSize: 8
  },
  feedTitle: {
    fontWeight: 600
  },
}));

export default useStyles