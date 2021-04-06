import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  footer: {
    color: 'white',
    backgroundColor: '#dc3545',
    paddingTop: '3em',
    position: 'relative',
    bottom: 0,
    width: '100%,'
  },
  hr: {
    height:'1px', 
    borderWidth:0, 
    color:'lightgrey', 
    backgroundColor: '#e6e6e6', 
    marginTop: "20px", 
    padding: 0,
  },
  footerText: {
    display: 'inline',
    margin: "10px"
  },
  footerTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center", 
    display: 'inline',
  },
  footerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center", 
  },
  icon: {
    color: "grey",
    margin: "10px"
  }


}))

export default useStyles