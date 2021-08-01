import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePass = (e) => {
        setPassword(e.target.value)
        console.log("state", e)
        console.log("pass", password)

    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Sign IN" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Email" value={email} />
                    <TextField id="standard-basic" label="Password" value={password} />
                    <Button variant="contained" color="primary">
                        Sign IN
                    </Button>
                </form>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <form className={classes.root} noValidate autoComplete="off">
                    {/* <TextField id="standard-basic" label="UserName" /> */}
                    <TextField id="standard-basic" label="Email" value={email} onChange={handleEmail} />
                    <TextField id="standard-basic" label="Password" value={password} onChange={handlePass} />
                    <Button variant="contained" color="primary" >
                        Register
                    </Button>
                </form>
            </TabPanel>

        </div>
    );
}
