import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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

const UpdateUserDetails = () => {
    const paperStyle = {
        padding: '5px',
        width: 600,
        margin: '20px auto',
        borderRadius: '26px',
    };
    const [showIconFirstName, setShowIconFirstName] = useState(true);
    const [showIconLastName, setShowIconLastName] = useState(true);
    const [showIconEmail, setShowIconEmail] = useState(true);
    const [showCurrentPassword, setShowCurrentPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [userData, setUserData] = useState({});
    const [delayCompleted, setDelayCompleted] = useState(false);
    const [initialValues, setInitialValues] = useState({});


    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        watch,
        reset,
        setValue,
        getValues,
    } = useForm();

    const email = watch('email', '');

    const validatePasswordsMatch = (value) => {
        if (value === initialValues.oldPassword) {
            return true;
        }
        return 'Password does not match with Current Password';
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
            if (email !== initialValues.email) {
                const response = await api.get(`/login/checkEmail/${email}`);
                setIsEmailValid(response.data);
            } else {
                setIsEmailValid(false);
            }            
        } catch (error) {
            console.error('Error checking email availability:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const response = await api.put('/dashboard/updateUserDetails', data);

            if (response.status === 200) {
                console.log('Update successful');
                reset();
                setValue('firstName', '');
                setValue('lastName', '');
                setValue('email', '');
                setValue('oldPassword', '');
                alert('Successfully Updated User Details');
            } else {
                console.error('Update failed');
                alert('Update failed');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            alert('Error occurred');
        }
    };    

    useEffect(() => {

        const getUser = async () => {
            try {
                const response = await api.get('/dashboard/updateUserDetails');
                setUserData(response.data);
                setValue('firstName', response.data.firstName);
                setValue('lastName', response.data.lastName);
                setValue('email', response.data.email);
                setValue('oldPassword', response.data.password);
                const initialValues = getValues();
                setInitialValues(initialValues);
            } catch (err) {
                if (err.response) {
                    console.log("this is an error");
                }
            }
        };

        const delay = async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
            setDelayCompleted(true);
        };

        delay();
        getUser();
    }, []);

    const toggleCurrentPassword = (e) => {
        if (showCurrentPassword) {
            setShowCurrentPassword(false);
        } else {
            setShowCurrentPassword(true)
        }
    }

    const toggleNewPassword = (e) => {
        if (showNewPassword) {
            setShowNewPassword(false);
        } else {
            setShowNewPassword(true)
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
            {delayCompleted}
            <Paper elevation={1} style={paperStyle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 style={{ textAlign: 'center', margin: '20px' }}>Update User Details</h2>
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
                            defaultValue={String(userData.firstName)}
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
                            defaultValue={String(userData.lastName)}
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
                            defaultValue={String(userData.email)}
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
                            error={!!errors.email}
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
                            id="currentPassword"
                            label="Current Password"
                            type={showCurrentPassword ? 'text' : 'password'}
                            variant="outlined"
                            {...register('currentPassword', {
                                required: 'Current Password is required.',
                                minLength: {
                                    value: 6,
                                    message: 'Current Password should be at least 6 characters.',
                                },
                                pattern: {
                                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                                    message: 'Current Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.',
                                },
                                validate: validatePasswordsMatch,
                            })}
                            onBlur={() => trigger('currentPassword')}
                            error={!!errors.currentPassword}
                            helperText={errors.currentPassword ? errors.currentPassword.message : ''}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleCurrentPassword} edge="end">
                                            {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id="password"
                            label="New Password"
                            type={showNewPassword ? 'text' : 'password'}
                            variant="outlined"
                            {...register('password', {
                                required: 'New Password is required.',
                                minLength: {
                                    value: 6,
                                    message: 'New Password should be at least 6 characters.',
                                },
                                pattern: {
                                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                                    message: 'New Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.',
                                },
                            })}
                            onBlur={() => trigger('password')}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ''}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleNewPassword} edge="end">
                                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box
                        sx={{ mx: 'auto', margin: '30px 0' }}
                        display="flex"
                        justifyContent="center"
                    >
                        <Stack
                            spacing={2}
                            direction="column"
                            sx={{ width: '30%', height: '100px' }}
                        >
                            <ThemeProvider theme={theme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ textTransform: 'none', height: '50%', borderRadius: '32px' }}
                                    type="submit"
                                >
                                    <Typography fontFamily="Arial">Update Details</Typography>
                                </Button>
                            </ThemeProvider>
                        </Stack>
                    </Box>
                </form>
            </Paper>
        </div>
    );
}

export default UpdateUserDetails;