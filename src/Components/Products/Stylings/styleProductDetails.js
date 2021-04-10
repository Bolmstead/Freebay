import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

  imageContainer: {
    height: '400px',
    width: '400px',
    margin: 'auto'
  },
  media: {
    maxHeight: 400,
    maxWidth: "100%",
    objectFit: "contain",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  root: {
    maxWidth: 500,
    margin: "auto"
  },
  cover: {
    width: 151,
  },
  price: {
    fontWeight: "bold",
  },
  hr: {
    height:'1px', 
    borderWidth:0, 
    color:'lightgrey', 
    backgroundColor: '#e6e6e6', 
    margin:0, 
    padding: 0
  },
  ratingContainer: {
    display: "table",
    alignItems: "center",
    position: "relative"
  },
  ratingNumber: {
    position: "absolute",
    top: 0,
    display: "inline",
    color: "gray"
    },
  redText: {
    color: "#FF0000"
  }
});

export default useStyles;

