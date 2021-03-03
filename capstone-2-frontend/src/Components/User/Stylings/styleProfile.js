import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height: 300,
    width: 300,
    borderRadius: 2,
    border: 1,
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
});

export default useStyles;

