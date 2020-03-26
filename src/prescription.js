import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import {
    FormControlLabel, makeStyles, Checkbox,
    Link, Grid, Box, Typography, TextField,
    CssBaseline, Container, FormControl,
    InputLabel, Select, MenuItem, Button,
    ButtonGroup, TextareaAutosize, AppBar, Tabs, Tab
} from '@material-ui/core'
import styles from './Prescription.module.css'
import AddPatient from './AddPatient'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Prescription = props => {
    //Adding hooks to save the username and password and userID

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Typography component="div" className={styles.Container}>
            <Typography component="div" className={styles.leftContainer}>
                <Typography component="div" className={styles.upperLeft}>
                    <AppBar position="static" >
                        <Tabs value={value} onChange={handleTabChange} variant="fullWidth"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="Item One"  {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        Item One
                     </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                </Typography>
                <Typography component="div" className={styles.lowerLeft} >
                    <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" />
                    <Grid item >
                        hi
                    </Grid>
                    <ButtonGroup color="primary" fullWidth={true} aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                    </ButtonGroup>


                </Typography>
            </Typography>
            <Typography component="div" className={styles.rightContainer} >
                <Grid item >
                    hi
                </Grid>
                <TextField
                    id="outlined-helperText"
                    label="Symptoms"
                    defaultValue="Default Value"
                    variant="outlined"
                    fullWidth={true}
                    margin='normal' />
                <TextField
                    id="outlined-helperText"
                    label="History Note"
                    defaultValue="Default Value"
                    variant="outlined"
                    fullWidth={true}
                    margin='normal'
                />
                <AddPatient />
            </Typography>

        </Typography>
    )

}

export default Prescription
