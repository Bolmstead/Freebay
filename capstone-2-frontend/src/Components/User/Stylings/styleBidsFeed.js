import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    textTransform: 'none'
  },
  inline: {
    display: 'inline',
  },
  product: {
    textTransform: 'none'
  },
  large: {
    width: "50px",
    height: "50px",
  },
}));

export default useStyles