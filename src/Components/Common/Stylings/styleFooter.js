import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({

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
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "grey",
    margin: "10px",
    width: "22px",
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
    height: "2.5rem",
  },
}));

export default useStyles;
