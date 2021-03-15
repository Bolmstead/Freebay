import React from "react";
import { Grid } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';

/** Loading message used by components that fetch API data. */

const LoadingText = () => {
    return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
    >
        <Grid item xs={3}>
            <Typography variant="h3" color="textSecondary" gutterBottom>
                Loading...
            </Typography>  
        </Grid>   
    </Grid>
    )
}

export default LoadingText;