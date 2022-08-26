import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: "#FFFFFF",
  },
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
    minHeight: "96vh",
    position: "relative",
  },
}));

export default useStyles