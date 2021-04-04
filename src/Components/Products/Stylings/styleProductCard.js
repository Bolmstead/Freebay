import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    minWidth: 250
  },
  media: {
    height: 200,
    width: 200,
    objectFit: "contain",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "8px"
  },
  ratingNumber: {
    top: 200
  },
  price: {
    fontWeight: "bold"
  },
  redText: {
    color: "#FF0000"
  }
});

export default useStyles;
