import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: "white",
    textTransform: 'none'
  },
  listItem: {
    color: 'black',
    fontWeight: 'bold' 
  },
  inline: {
    display: 'inline',
  },
  product: {
    textDecoration: 'none',
    color: 'black'
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
}));

export default useStyles