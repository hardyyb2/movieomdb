import React, { useState, Component } from 'react'
import {
    Grid, Paper, TextField,
    Button, makeStyles, AppBar,

} from '@material-ui/core'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        borderRadius: '10px',
    }
})

const Login = props => {
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = e => {
        e.preventDefault()
        const { dispatch } = props;

        dispatch(loginUser(email, password));

    }

    const { loginError, isAuthenticated } = props;
    const login = (
        <Paper elevate={5} className={classes.root}>
            <Grid container direction="column" className={classes.container}>

                <AppBar position="static" style={{ padding: '20px', fontSize: '2rem' }}>
                    Login
            </AppBar>
                <Grid item style={{ margin: '10px', padding: '10px' }}>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth value={email} id="login-email" label="Email" placeholder="Email..." />
                </Grid>
                <Grid item style={{ margin: '10px', padding: '10px' }}>
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth value={password} id="login-password" label="Password" placeholder="Password..." />
                </Grid>
                <Grid item style={{ margin: '10px' }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )

    if (isAuthenticated) {
        return <Redirect to="/" />;
    } else {
        return login
    }


}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}
export default connect(mapStateToProps)(Login)