import * as React from 'react';
import { Paper, 
        TextField,
        Typography,
        createTheme, 
        ThemeProvider, 
        Box,
        FormControl,
        FormHelperText,
        InputLabel,
        OutlinedInput,
        InputAdornment,
        IconButton,
        Button,
     } from '@mui/material';
import {Visibility, VisibilityOff, Email} from '@mui/icons-material';
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AppAppBar from './AppAppBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/AxiosTokenConfig';


export default function ForgetPassword(){
    const theme = createTheme({
        components: {
            MuiTypography:{
                styleOverrides:{
                    root:{
                        fontFamily: 'Mulish'
                    }
                }
            }
        },
        palette:{
            primary:{
                main:'#199a8e'
            }
        }
    });
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [isValidEmail, setIsValidEmail] = React.useState(true);
    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        setEmail(inputEmail);
        setIsValidEmail(validateEmail(inputEmail));
      };
    
      const validateEmail = (input) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(input);
      };

      const [loading, setLoading] = React.useState(false);
      async function handleClick() {
        setLoading(true);
        try{
            const response = await api.get('api/staff',null);
            if (response.status === 200) {
                console.log(response);
                alert('Successfully');
            } else {
                console.error('failed');
                alert('failed');
            }

        }catch(error){
            console.error('Error fetching data:', error)
        }
        setLoading(false);
      }

    const handleClickTurnToLogin = () =>{
        navigate("/");
    }  


    const LoginCard = (
        <ThemeProvider theme={theme}>
            <Paper elevation={3}         
            sx={{
                width: 400,
                height: "65vh",
                marginTop: "20px auto",
                padding: "40px",
                }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, fontSize: 30 }}>
                    Forget Password?
                </Typography>
                <Box sx={{mt:'15%'}}>
                    <div>
                        <FormControl sx={{ m: 1, width: '95%' }} variant="outlined"> 
                        <TextField 
                            label="Email" 
                            color="primary"
                            type="email"
                            onChange={handleEmailChange}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Email />
                                  </InputAdornment>
                                ),
                              }}
                            placeholder='Please Enter your email'
                            error={!isValidEmail} />
                        </FormControl>                        
                        <Box component="span" sx={{ p: 2, 
                                                background: '#f7ffc9',
                                                width: '95%',
                                                display: 'flex', 
                                                alignItems: 'center',
                                                m: '2%' ,
                                                visibility: !isValidEmail ? 'visible' : 'hidden',
                                                }}>
                            <ErrorOutlineIcon  fontSize="small" sx={{color:"gray" }}/>
                            <Typography sx={{ fontSize: '10px',color:'gray',ml:'4%' }} variant="body1">Please double check that the email address is correct</Typography>
                        </Box>
                        
                    </div>    
                </Box> 
                <LoadingButton
                    onClick={handleClick}
                    endIcon={<ArrowRight />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    sx={{background:'#199a8e',width:300,marginTop:'1vw',ml:'10px',
                    '&:hover': {
                        background: '#1EA888', 
                    },
                    '&:active': {
                        background: '#137D73', 
                    }
                }}
                    
                >
                    <span>Reset Password</span>
                </LoadingButton>
                <Button
                    onClick={handleClickTurnToLogin}
                    startIcon={<ArrowLeft />}
                    variant="contained"
                    sx={{background:'#199a8e',width:300,marginTop:'1vw',ml:'10px',
                    '&:hover': {
                        background: '#1EA888', 
                    },
                    '&:active': {
                        background: '#137D73', 
                    }
                }}
                    
                >
                    <span>Back to Login</span>
                </Button>
                <Typography sx={{fontWeight:500, 
                                fontSize:10,
                                marginTop:'2vw'}}>
                    Don't have an account?
                    <span style={{ color: '#1EA888', cursor: 'pointer' }}> Sign up</span>
                </Typography>
            </Paper>
      </ThemeProvider>
    );

    return (
        <div>
            <AppAppBar />
            <div style={{ display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        height: '100vh' }}>
                {LoginCard}
            </div>
        </div>
    );
}



