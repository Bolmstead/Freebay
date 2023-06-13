import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textTransform: "none",
  },
  listItem: {
    color: "black",
    fontWeight: "bold",
  },
  inline: {
    display: "inline",
  },
  product: {
    textTransform: "none",
  },
  card: {},
  large: {
    width: "50px",
    height: "50px",
  },
  itemList: {
    maxHeight: 150,
    overflow: "auto",
    minHeight: 150,
    textTransform: "none",
  },
  feedTitle: {
    fontWeight: "bold",
  },
  loadingSpinner: {
    height: 300,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
