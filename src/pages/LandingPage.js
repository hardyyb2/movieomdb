import React, { useState } from 'react'
import { Grid, Button, makeStyles } from '@material-ui/core'
import FormModal from '../components/FormModal/FormModal'

import Login from './Login'
import Signup from './SignUp'

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Background from '../assets/background.jpg'

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

    const landing = (<>
        <Grid container justify="center" className={classes.root}

        >
            <Grid item style={{
                width: '50%',
                height: '100%',
                backgroundImage: `url(${Background})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%'
            }} ></Grid>
            <Grid container style={{ width: '50%', height: '100%', alignItems: 'center' }} justify="center" direction="column">
                <Grid item fullWidth style={{
                    height: '20%',
                    textAlign: 'center',
                    fontSize: '3rem',
                    fontWeight: 'bolder',
                    color: '#f50057'

                }}>
                    MoviesOMDB
                </Grid>
                <Grid item style={{ width: '50%', justifyContent: 'center', display: 'flex', marginBottom: '10px' }}>
                    <Button fullWidth variant="contained" color="primary" onClick={() => { setLogin(true) }} >Login</Button>
                </Grid>
                <Grid item style={{ width: '50%', justifyContent: 'center', display: 'flex' }}>
                    <Button fullWidth variant="outlined" color="primary" onClick={() => { setSignup(true) }} >Signup</Button>
                </Grid>
            </Grid>
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

    if (props.isAuthenticated) {
        return <Redirect to="/home" />
    } else {
        return landing
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(LandingPage)