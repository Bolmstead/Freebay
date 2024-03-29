import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";

export const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    margin: "10px",
    color: "white",
    fontWeight: "bold"
  },
  headerSecondary: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    margin: "10px",
    color: "white",
  },
  imageTitle: {
    margin: 0,
    padding: "1rem",
    color: "white",
    textShadow: "2px 2px 4px",
  },
  img: {
    padding: 0,
    margin: 0,
    height: "auto"
  },
  card: {
    padding: 0,
    margin: 0,
    height: "250px",
  }
}));

export const FiCard = withStyles({
  root: {
    position: "relative"
  }
})(Card);

export const FiCardActionArea = withStyles({
  root: {
    position: "relative"
  }
})(CardActionArea);

export const FiCardActions = withStyles({
  root: {
    position: "relative"
  }
})(CardActions);

export const FiCardContent = withStyles({
  root: {
    position: "relative",
    backgroundColor: "transparent"
  }
})(CardContent);

export const FiCardMedia = withStyles({
  root: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "100%",
    boxShadow: "0 3000px rgba(0, 0, 0, 0.3) inset"
    
  }
})(CardMedia);

// --- Exports --- //
export default {
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent,
  FiCardMedia
};

