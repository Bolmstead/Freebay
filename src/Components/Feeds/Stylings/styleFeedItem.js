import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textTransform: "none",
  },
  listItem: {
    backgroundColor: "#F6F6F6",
  },
  inline: {
    display: "inline",
  },
  product: {
    textDecoration: "none",
    color: "black",
    backgroundColor: "#F6F6F6",
  },
  card: {
    backgroundColor: "#F6F6F6",
  },
  large: {
    width: "50px",
    height: "50px",
  },
  cardContent: {
    maxHeight: 150,
    overflow: "auto",
    minHeight: 150,
  },
}));

export default useStyles;
