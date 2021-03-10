import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles((theme) => ({
  smiley: {
    fontSize: 200,
    color: "#FFD066"
  },
  bodyText: {
    color: "blueu"
  }
}));

export default useStyles;