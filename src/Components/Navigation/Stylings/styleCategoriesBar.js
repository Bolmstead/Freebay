import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
  center: {
    alignItems: 'center',
    display: 'flex'
  },
  appBar: {
    backgroundColor: "#FFFFFF",
    border: 1,
  },
  menuButton: {
    maxWidth: '30px', 
    maxHeight: '30px', 
    minWidth: '30px', 
    minHeight: '30px'
  },
  root: {
    display: 'flex',
    minHeight: '40px'
  },
  paper: {
    marginRight: theme.spacing(2),
    textTransform: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    textTransform: 'none',
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    backgroundColor: "#FFFFFF",
    border: 1,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  flexItem: {
    flex: 1,
    textTransform: 'none',
    },
  accordion: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))

export default  useStyles;