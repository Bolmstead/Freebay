import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";

export const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    margin: "10px",
    color: "white",
    fontWeight: "bold",
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
    height: "auto",
  },
  card: {
    padding: 0,
    margin: 0,
    height: "250px",
  },
}));

export const FiCard = styled(Card)({
  position: "relative",
});

export const FiCardActionArea = styled(CardActionArea)({
  position: "relative",
});

export const FiCardActions = styled(CardActions)({
  position: "relative",
});

export const FiCardContent = styled(CardContent)({
  position: "relative",
  backgroundColor: "transparent",
});

export const FiCardMedia = styled(CardMedia)({
  position: "absolute",
  top: 0,
  right: 0,
  height: "100%",
  width: "100%",
  boxShadow: "0 3000px rgba(0, 0, 0, 0.3) inset",
});

// --- Exports --- //
export default {
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent,
  FiCardMedia,
};
