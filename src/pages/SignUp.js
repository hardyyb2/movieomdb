import React, { useState } from 'react'
import {
    Grid, Paper, TextField,
    Button, makeStyles, AppBar,

} from '@material-ui/core'

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signupUser } from "../actions";

const useStyles = makeStyles({
    root: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',

        justifyContent: 'center',
        alignItems: 'center',
        ['@media (max-width:780px)']: {
            width: '90%'
        }
    },
    container: {
        borderRadius: '10px',
    }
})

const SignUp = props => {
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSignUp = e => {
        e.preventDefault()
        const { dispatch } = props;

        dispatch(signupUser(email, password));

    }

    const signup = (<Paper elevate={5} className={classes.root}>
        <Grid container direction="column" className={classes.container}>

            <AppBar position="static" style={{ padding: '20px', fontSize: '2rem' }}>
                SignUp
            </AppBar>
            <Grid item style={{ margin: '10px', padding: '10px' }}>
                <TextField
                    onChange={e => setEmail(e.target.value)}
                    fullWidth value={email}
                    error={props.signupError}
                    helperText={props.signupError ? props.signupErrMessage : ' '}
                    id="login-email" label="Email" placeholder="Email..." />
            </Grid>
            <Grid item style={{ margin: '10px', padding: '10px' }}>
                <TextField
                    onChange={e => setPassword(e.target.value)}
                    error={props.signupError}
                    helperText={props.signupError ? props.signupErrMessage : ' '}

                    fullWidth value={password} id="login-password" label="Password" placeholder="Password..." />
            </Grid>
            <Grid item style={{ margin: '10px' }}>
                <Button
                    fullWidth
                    variant="contained"
                    style={{ background: 'green', color: 'white' }}
                    size="large"
                    onClick={handleSignUp}
                >
                    SignUp
                    </Button>
            </Grid>
        </Grid>
    </Paper>
    )

    if (props.isAuthenticated && props.user !== null) {
        return <Redirect to="/home" />;
    } else {
        return signup
    }



}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        signupError: state.auth.signupError,
        signupErrMessage: state.auth.signupErrMessage
    };
}

export default connect(mapStateToProps)(SignUp)