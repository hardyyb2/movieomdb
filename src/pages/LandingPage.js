import React, { useState } from 'react'
import { Grid, Button, makeStyles } from '@material-ui/core'
import FormModal from '../components/FormModal/FormModal'

import Login from './Login'
import Signup from './SignUp'

const useStyles = makeStyles({
    root: {
        height: '100vh',
        alignItems: 'center'
    }
})

const LandingPage = props => {
    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const classes = useStyles()

    return (
        <>
            <Grid container justify="center" className={classes.root}>
                <Button variant="contained" color="primary" onClick={() => { setLogin(true) }} >Login</Button>
                <Button variant="outlined" color="primary" onClick={() => { setSignup(true) }} >Signup</Button>
            </Grid>

            {
                login ? (
                    <FormModal handleClose={() => { setLogin(false) }} >
                        <Login />
                    </FormModal>
                )
                    :
                    null
            }
            {
                signup ?
                    (
                        <FormModal handleClose={() => { setSignup(false) }} >
                            <Signup />
                        </FormModal>
                    )
                    :
                    null

            }
        </>
    )

}

export default LandingPage