import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  image: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  feedTitle: {
    fontWeight: 600,
  },
  feedContainer:{
    marginBottom: "0px"
  }
}));

export default useStyles;
