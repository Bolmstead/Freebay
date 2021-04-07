import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  userName: {
    fontWeight: "bold"
  },
  media: {
    height: 300,
    width: 300,
    borderRadius: 2,
    border: 1,
  },
  smiley: {
    fontSize: 200,
    color: "#FFD066"
  },
  cover: {
    width: 151,
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  tabPanel: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  profileImage: {
    maxWidth: 200,
    margin: "auto",
    borderRadius: "50%"
  },
  profileContainer: {
    width: 270,
    height: 320,
    margin: "auto",
    backgroundColor: "#F6F6F6",
    position: "relative"
  },
  errorText: {
    color: "grey"
  },
  profileAvatar:{
      width: theme.spacing(17),
      height: theme.spacing(17),
      margin: "auto",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  },
  imageAndName:{
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto"
  },
  feedContainer: {
    margin: "auto",
    backgroundColor: "#F6F6F6",
    position: "relative"
  },
}))

export default useStyles;

