import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  hr: {
    height:'1px', 
    borderWidth: 0, 
    color:'lightgrey', 
    backgroundColor: '#e6e6e6', 
    marginTop: "20px", 
    marginBottom: "0px",
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