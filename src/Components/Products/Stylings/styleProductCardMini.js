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
  },

  loadingCard: {
    width: 200,
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  loadingCardContent:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

  },
});

export default useStyles;
