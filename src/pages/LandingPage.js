import React, { useState } from 'react'
import { Grid, Button, makeStyles } from '@material-ui/core'
import FormModal from '../components/FormModal/FormModal'

import Login from './Login'
import Signup from './SignUp'

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Background from '../assets/background.png'

const useStyles = makeStyles(theme => ({
    flexDisplay: {
        boxSizing: 'border-box',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        ['@media (max-width: 780px)']: {
            flexDirection: 'column',
        }
    },
    backgroundContainer: {

        width: '50%',
        height: '100%',
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        fontSize: '5rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontWeight: 'bolder',
        ['@media (max-width: 780px)']: {
            height: '50%',
            width: '100%'
        },
        ['@media (max-width: 1080px)']: {
            fontSize: '4rem',
        },
        ['@media (max-width: 430px)']: {
            fontSize: '3rem',
        }


    },
    buttonContainer: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        ['@media (max-width: 780px)']: {
            height: '50%',
            width: '100%'
        }
    },
    rightTitle: {
        height: '20%',
        textAlign: 'center',
        fontSize: '3rem',
        fontWeight: 'bolder',
        color: '#f50057',
        marginBottom: '30px',
        ['@media (max-width: 780px)']: {
            display: 'none'
        }

    },
    subtitle: {
        fontSize: '1rem',
        width: '70%',
        textAlign: 'center'

    }

}))

const LandingPage = props => {
    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const classes = useStyles()

    const subtitle = (
        <Grid item className={classes.subtitle}>
            Search for your favorite movies and see all the trending movies.
            Save and Share your favorites with your friends.

        </Grid>
    )

    const landing = (
        <Grid container className={classes.flexDisplay}

        >
            <Grid container className={classes.backgroundContainer} >
                <Grid item >MoviesOMDB</Grid>
                {subtitle}
            </Grid>
            <Grid container className={classes.buttonContainer} justify="center" direction="column">
                <Grid item className={classes.rightTitle}>
                    MoviesOMDB
                </Grid>
                <Grid item style={{ width: '50%', justifyContent: 'center', display: 'flex', marginBottom: '10px' }}>
                    <Button fullWidth
                        style={{ padding: "10px" }}
                        variant="contained" color="primary" onClick={() => { setLogin(true) }} >Login</Button>
                </Grid>
                <Grid item style={{ width: '50%', justifyContent: 'center', display: 'flex' }}>
                    <Button fullWidth variant="outlined"
                        style={{ padding: "10px" }}
                        color="primary" onClick={() => { setSignup(true) }} >Signup</Button>
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


        </Grid>

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