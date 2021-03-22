import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 200
  },
  media: {
    height: 175,
    width: 200,
    objectFit: "contain",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "5px",
  },
  ratingNumber: {
    top: 200
  },
  price: {
    fontWeight: "bold",
    textDecoration: 'none'
  },
  noUnderline: {
    textDecoration: 'none'
  },
  cardContent:{
    minHeight: '100px'
  }
});

export default useStyles;
