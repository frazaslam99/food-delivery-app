import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Signup from "./signup"
import Login from "./login"

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

export default function SimpleTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    let [loginemail, setEmail] = useState("");
    let [loginpassword, setpassword] = useState("");



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // const handleEmail = (e) => {
    //     setEmail(e.target.value)
    // }
    // const handlePass = (e) => {
    //     setPassword(e.target.value)
    //     console.log("state", e)
    //     console.log("pass", password)

    // }

    function onChangeData(evt) {

        switch (evt.target.name) {

            case "email":
                setEmail(evt.target.value);
                
                break;
            case "password":
                setpassword(evt.target.value);
                break;

        }

        console.log(loginemail)
    }

    function onDataAdded(data) {

        // users.push(data);

        // setUsers([...users])
        // setFormShow(false);
        // localStorage.setItem("users", JSON.stringify(users));

    }

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor:"grey"}}>
                <Tabs value={value} onChange={handleChange}  aria-label="simple tabs example">
                    <Tab label="Sign IN" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {/* <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Email"  onChange={onChangeData}  />
                    <TextField id="standard-basic" label="Password" onChange={onChangeData}  />
                    <Button variant="contained" color="primary" style={{marginTop:"20px"}}>
                        Sign IN
                    </Button>
                </form> */}
                <Login/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* <form className={classes.root} noValidate autoComplete="off" onSubmit={(evt) => {

                    evt.preventDefault();
                }}>
                <TextField id="standard-basic" label="UserName" />
                <TextField id="standard-basic" label="Email" name="email" value={loginemail}  required onChange={onChangeData} />
                <TextField id="standard-basic" label="Password" name="password" value={loginpassword}  required  onChange={onChangeData} />
                <Button variant="contained" color="primary" type="submit" style={{marginTop:"20px"}}>
                    Register
                </Button>
                </form> */}
                <Signup  onDataAdded={onDataAdded}/>
            </TabPanel>

        </div> 
    );
}
