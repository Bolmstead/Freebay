import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  hr: {
    height:'1px', 
    borderWidth:0, 
    color:'lightgrey', 
    backgroundColor: '#e6e6e6', 
    margin:0, 
    padding: 0,
  },
  grey:{
    backgroundColor: "#e6e6e6"
  },
  appWrapper:{
    backgroundColor: "#FFFFFF",
    height: "100vh"
  }
}));

export default useStyles