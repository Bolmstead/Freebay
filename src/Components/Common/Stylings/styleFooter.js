import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  hr: {
    height: "1px",
    borderWidth: 0,
    color: "lightgrey",
    backgroundColor: "#e6e6e6",
    marginTop: "20px",
    marginBottom: "0px",
    padding: 0,
  },
  footerText: {
    margin: "10px",
  },
  footerTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    color: "grey",
    margin: "10px",
  },

  pageContainer: {
    position: "relative",
    minHeight: "93vh",
  },

  contentWrap: {
    paddingBottom: "2.5rem",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "2.5rem",
  },
}));

export default useStyles;
