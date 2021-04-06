import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: "#F6F6F6",
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
    textTransform: 'none'
  },
  card: {
    backgroundColor: "#F6F6F6",
  },
  large: {
    width: "50px",
    height: "50px",
  },
  itemList:{
    backgroundColor: "#F6F6F6",
    maxHeight: 290, 
    overflow: 'auto',
    minHeight: 200,
    textTransform: 'none'
  },
  feedTitle: {
    fontWeight: "bold"
  }
}));

export default useStyles