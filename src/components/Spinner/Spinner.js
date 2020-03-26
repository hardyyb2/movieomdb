import React from 'react'
import classes from './Spinner.module.css'
import { Grid } from '@material-ui/core'

const Spinner = () => {
  return <Grid className={classes.loader}></Grid>
}
export default Spinner
