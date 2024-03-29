import * as React from "react";
import {
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
  Box,
  handleClickShowPassword,
  handleMouseDownPassword,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import LoadingButton from "@mui/lab/LoadingButton";
import AppAppBar from "./AppAppBar";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import api from '../../api/AxiosConfig';


function CustomTabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Login() {
  const theme = createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Mulish",
          },
        },
      },
    },
  });
  //set page navigation
  const navigate = useNavigate();
  //set State to control the password visibility
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState("");
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //set Email Validation
  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  };

  const validateEmail = (input) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  };

  async function handleClick() {
    const loginData = {
      email: email, 
      password: password, 
    };
    setLoading(true);
    if (value === 0) {
      //login type is staff
      try{
        const response = await api.post('/login/Adminlogin', loginData);
        
        if(response.status === 200){
          const token = response.data.data;
          localStorage.setItem('jwtToken', token);
          console.log(token);   
          setLoading(false);
          alert("login successful");    
          navigate("/staff")      
        }else{
          console.error("login failed");
          alert(response.data.message);
        }
      } catch (error){
        if (error.response && error.response.data && error.response.data.message) {
          console.error("Error occurred:", error.response.data.message);
          alert(error.response.data.message);
        } else {
          console.error("Unknown error occurred:", error);
          alert('Error');
        }
      }

    } else if (value === 1) {
      //login type is user
      try{
        const response = await api.post('/login/login', loginData);
        
        if(response.status === 200){
          const token = response.data.data;
          localStorage.setItem('jwtToken', token);
          console.log(token);
          setLoading(false);
          alert("login successful");  
          navigate("/user")         
        }else{
          console.error("login failed");
          alert(response.data.message);
        }
      } catch (error){
        if (error.response && error.response.data && error.response.data.message) {
          console.error("Error occurred:", error.response.data.message);
          alert(error.response.data.message);
        } else {
          console.error("Unknown error occurred:", error);
          alert('Error');
        }
      }
    }
    setLoading(false);
  }

  const handleClickTurnToForget = () => {
    navigate("/login/forgetpassword");
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const LoginForm = (
    <>
      <Box>
        <div>
          <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              onChange={handleEmailChange}
              endAdornment={
                <InputAdornment position="end">
                  <Email />
                </InputAdornment>
              }
              label="Password"
              sx={{ boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)" }}
            />
            {/* {!isValidEmail && <FormHelperText sx={{ color: 'red' }}>Please enter valid Email</FormHelperText>} */}
          </FormControl>
          <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              sx={{ boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)" }}
            />
          </FormControl>
        </div>
      </Box>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 10,
          textAlign: "left",
          p: 1,
          cursor: "pointer",
          "&:hover": {
            color: "#199a8e",
          },
        }}
        onClick={handleClickTurnToForget}
      >
        Forget Password?
      </Typography>
      <LoadingButton
        onClick={handleClick}
        endIcon={<ArrowRight />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
        sx={{
          background: "#199a8e",
          width: 250,
          marginTop: "4vw",
          ml:"10px",
          "&:hover": {
            background: "#1EA888",
          },
          "&:active": {
            background: "#137D73",
          },
        }}
      >
        <span>Login</span>
      </LoadingButton>
      <Typography sx={{ fontWeight: 500, fontSize: 10, marginTop: "2vw", ml:"10px" }}>
        New Member?
        <Link to="/register" style={{ color: "#1EA888", cursor: "pointer" }}>
          Register now
        </Link>
      </Typography>
    </>
  );

  const LoginCard = (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={3}
        sx={{
          width: 400,
          height: "75vh",
          marginTop: "20px auto",
          padding: "40px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 800, fontSize: 42 }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 300, color: "#252525", fontSize: 15 }}
        >
          Sign in to access your account
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="Staff" {...a11yProps(0)} />
              <Tab label="User" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {LoginForm}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {LoginForm}
          </CustomTabPanel>
        </Box>
      </Paper>
    </ThemeProvider>
  );

  return (
    <div>
      <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "#199a8e" }}
          >
            <Toolbar style={{justifyContent:'space-between'}}>
              <Typography variant="h6" noWrap component="div">
                WeCare
              </Typography>
            </Toolbar>
          </AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {LoginCard}
      </div>
    </div>
  );
}
