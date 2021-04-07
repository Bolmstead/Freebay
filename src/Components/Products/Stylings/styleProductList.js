import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    button: {
      textTransform: 'none',
      marginTop: "20px"
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    listTitle: {
      fontWeight: 600
    }
}))

export default useStyles;