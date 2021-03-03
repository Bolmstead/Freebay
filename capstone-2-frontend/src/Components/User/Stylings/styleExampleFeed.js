import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: "white",
  },
  inline: {
    display: 'inline',
  },
  large: {
    width: "50px",
    height: "50px",
  },
}));

export default useStyles