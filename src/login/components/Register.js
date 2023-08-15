import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import api from '../../api/AxiosConfig';

const theme = createTheme({
    palette: {
        primary: {
            main: '#199A8E',
        },
    },
});

const Register = () => {
    const paperStyle = {
        padding: '5px',
        width: 600,
        margin: '20px auto',
        borderRadius: '26px',
    };
    const [showIconFirstName, setShowIconFirstName] = useState(true);
    const [showIconLastName, setShowIconLastName] = useState(true);
    const [showIconEmail, setShowIconEmail] = useState(true);
    const [showPassword, setShowPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        watch,
        reset,
    } = useForm();

    const password = watch('password', '');
    const email = watch('email', '');

    const validatePasswordsMatch = (value) => {
        if (value === password) {
            return true;
        }
        return 'Passwords do not match.';
    };

    const validateAvailability = async () => {
        await checkEmailAvailability();
        if (!isEmailValid) {
            return true;
        }
        return 'This email is already taken.';
    };

    const checkEmailAvailability = async () => {
        try {
            const response = await api.get(`/login/checkEmail/${email}`);
            setIsEmailValid(response.data);
        } catch (error) {
            console.error('Error checking email availability:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const response = await api.post('/login/create', data);

            if (response.status === 200) {
                console.log('Registration successful');
                reset();
                alert('Successfully Register User');
            } else {
                console.error('Registration failed');
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            alert('Error occurred');
        }
    };

    const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
    }

    const toggleConfirmPassword = (e) => {
        if (showConfirmPassword) {
            setShowConfirmPassword(false);
        } else {
            setShowConfirmPassword(true)
        }
    }

    const toggleIcon = (id) => {
        switch (id) {
            case 'first_name':
                setShowIconFirstName((prevShowIcon) => !prevShowIcon);
                break;
            case 'last_name':
                setShowIconLastName((prevShowIcon) => !prevShowIcon);
                break;
            case 'email':
                setShowIconEmail((prevShowIcon) => !prevShowIcon);
                break;
            default:
                break;
        }
    };


    return (
        <div >
            <Paper elevation={1} style={paperStyle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 style={{ textAlign: 'center', margin: '20px' }}>Create Your Account</h2>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '50ch' },
                        }}
                        autoComplete="off"
                        style={{ textAlign: 'center' }}
                    >
                        <TextField
                            id="first_name"
                            label="First Name"
                            type="text"
                            variant="outlined"
                            {...register("firstName", {
                                required: "First Name is required.",
                                pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message: 'First Name should contain only alphabetic characters.',
                                },
                            })}
                            sx={{ mt: '20px' }}
                            onFocus={() => toggleIcon('first_name')}
                            onBlur={() => {
                                toggleIcon('first_name');
                                trigger('firstName');
                            }}
                            InputProps={{
                                endAdornment: showIconFirstName && (
                                    <InputAdornment position="end" sx={{ marginRight: '-4px' }}>
                                        <PersonIcon edge="end" />
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.firstName}
                            helperText={errors.firstName ? errors.firstName.message : ''}
                        />
                        <TextField
                            id="last_name"
                            label="Last Name"
                            type="text"
                            variant="outlined"
                            {...register("lastName", {
                                required: "Last Name is required.",
                                pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message: 'Last Name should contain only alphabetic characters.',
                                },
                            })}
                            onFocus={() => toggleIcon('last_name')}
                            onBlur={() => {
                                toggleIcon('last_name');
                                trigger('lastName');
                            }}
                            InputProps={{
                                endAdornment: showIconLastName && (
                                    <InputAdornment position="end" sx={{ marginRight: '-4px' }}>
                                        <PersonIcon edge="end" />
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.lastName}
                            helperText={errors.lastName ? errors.lastName.message : ''}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            type="text"
                            variant="outlined"
                            {...register('email', {
                                required: 'Email is required.',
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: 'Email is not valid.',
                                },
                                validate: validateAvailability,
                            })}
                            onFocus={() => toggleIcon('email')}
                            onBlur={async () => {
                                checkEmailAvailability(); 
                                toggleIcon('email');
                                await new Promise(resolve => setTimeout(resolve, 100));
                                trigger('email');
                            }}
                            error={!!errors.email }
                            helperText={errors.email ? errors.email.message : ''}
                            InputProps={{
                                endAdornment: showIconEmail && (
                                    <InputAdornment position="end" sx={{ marginRight: '-4px' }}>
                                        <MailIcon edge="end" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            {...register('password', {
                                required: 'Password is required.',
                                minLength: {
                                    value: 6,
                                    message: 'Password should be at least 6 characters.',
                                },
                                pattern: {
                                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                                    message: 'Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.',
                                },
                            })}
                            onBlur={() => trigger('password')}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ''}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePassword} edge="end">
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant="outlined"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required.',
                                minLength: {
                                    value: 6,
                                    message: 'Confirm Password should be at least 6 characters.',
                                },
                                pattern: {
                                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                                    message: 'Confirm Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.',
                                },
                                validate: validatePasswordsMatch,
                            })}
                            onBlur={() => trigger('confirmPassword')}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleConfirmPassword} edge="end">
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box
                        sx={{ mx: 'auto', margin: '40px 0' }}
                        display="flex"
                        justifyContent="center"
                    >
                        <Stack
                            spacing={2}
                            direction="column"
                            sx={{ width: '50%', height: '125px' }}
                        >
                            <ThemeProvider theme={theme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ArrowForwardIosIcon />}
                                    sx={{ textTransform: 'none', height: '50%', borderRadius: '32px' }}
                                    type="submit"
                                >
                                    <Typography fontFamily="Arial">Create</Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ArrowBackIosNewIcon />}
                                    sx={{ textTransform: 'none', height: '50%', borderRadius: '32px' }}
                                >
                                    <Typography fontFamily="Arial">Back to Login</Typography>
                                </Button>
                            </ThemeProvider>
                        </Stack>
                    </Box>
                </form>
            </Paper>
        </div>
    );
}

export default Register;