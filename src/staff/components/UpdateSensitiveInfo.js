import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import api from '../../api/AxiosConfig';

const theme = createTheme({
  palette: {
    primary: {
      main: '#199A8E',
    },
  },
});

const UpdateSensitiveInfo = () => {
  const paperStyle = {
    padding: '5px',
    width: 800,
    margin: '40px auto',
    borderRadius: '10px',
  };

  const [initialValues, setInitialValues] = useState({});
  const [userData, setUserData] = useState({});
  const [delayCompleted, setDelayCompleted] = useState(false);
  const [isNricValid, setIsNricValid] = useState(false);

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

  const nric = watch('nric', '');

  const onSubmit = async (data) => {
    try {
      const response = await api.put('/dashboard/updateSensitiveInfo', data);

      if (response.status === 200) {
        console.log('Update successful');
        reset();
        setValue('firstName', '');
        setValue('lastName', '');
        setValue('phoneNumber', '');
        setValue('nric', '');
        alert('Successfully Updated Patient Details');
      } else {
        console.error('Update failed');
        alert('Update failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('Error occurred');
    }
  };

  // const { id } = useParams();

  const id = '64cbbfa708dc8591ccf9480a';

  useEffect(() => {

    const getUser = async () => {
      try {
        const response = await api.get(`/dashboard/updateSensitiveInfo/${id}`);
        setUserData(response.data);
        setValue('firstName', response.data.firstName);
        setValue('lastName', response.data.lastName);
        setValue('phoneNumber', response.data.phoneNumber);
        setValue('nric', response.data.nric);
        setValue('id', response.data._id);
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

  const checkNricAvailability = async () => {
    try {
      if (nric !== initialValues.nric) {
        const response = await api.get(`/dashboard/checkNRIC/${nric}`);
        setIsNricValid(response.data);
      } else {
        setIsNricValid(false);
      }
    } catch (error) {
      console.error('Error checking nric availability:', error);
    }
  };

  const validateAvailability = async () => {
    await checkNricAvailability();
    if (!isNricValid) {
        return true;
    }
    return 'This nric is already taken.';
};

  return (
    <Paper elevation={1} style={paperStyle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', padding: '10px' }}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper', margin: '40px 0' }}>
            <Typography
              variant="h6"
              sx={{
                ml: '40px',
                fontFamily: 'Poppins',
                fontWeight: 700,
                color: '#4E898D',
                position: 'relative',
                "&::after": {
                  content: '""',
                  position: 'absolute',
                  left: '0',
                  bottom: '-4px',
                  width: '40%',
                  borderBottom: '3px solid #4E898D',
                },
              }}
            >
              Update Patient Details
            </Typography>
            <Typography variant="h5" sx={{ mt: '30px', ml: '80px' }}>{String(userData.firstName)} {String(userData.lastName)}</Typography>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mt: '40px', ml: '40px', flex: 1 }}>
                <Typography variant="body2">First Name</Typography>
                <TextField
                  id="first_name"
                  label="First Name"
                  defaultValue={String(userData.firstName)}
                  {...register("firstName", {
                    required: "First Name is required.",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: 'First Name should contain only alphabetic characters.',
                    },
                  })}
                  sx={{ margin: '15px 0' }}
                  variant="outlined"
                  fullWidth
                  onBlur={() => trigger('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ''}
                />
                <Typography variant="body2">Last Name</Typography>
                <TextField
                  id="last_name"
                  sx={{ margin: '15px 0' }}
                  label="Last Name"
                  defaultValue={String(userData.lastName)}
                  {...register("lastName", {
                    required: "Last Name is required.",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: 'Last Name should contain only alphabetic characters.',
                    },
                  })}
                  onBlur={() => trigger('lastName')}
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
                />
                <Typography variant="body2">Phone Number</Typography>
                <TextField
                  id="phoneNumber"
                  sx={{ margin: '15px 0' }}
                  label="Phone Number"
                  defaultValue={String(userData.phoneNumber)}
                  {...register("phoneNumber", {
                    required: "Phone Number is required.",
                    pattern: {
                      value: /^\d{8}$/,
                      message: 'Phone Number should be exactly 8 digits.',
                    },
                  })}
                  variant="outlined"
                  onBlur={() => trigger('phoneNumber')}
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                />
              </Box>
              <Box sx={{ mt: '40px', ml: '40px', mr: '40px', flex: 1 }}>
                <Typography variant="body2">NRIC</Typography>
                <TextField
                  id="nric"
                  sx={{ margin: '15px 0' }}
                  label="NRIC"
                  defaultValue={String(userData.nric)}
                  {...register("nric", {
                    required: "NRIC is required.",
                    pattern: {
                      value: /^[A-Za-z]\d{7}[A-Za-z]$/,
                      message: 'NRIC should be exactly 9 characters, first and last character must be alphabetic character and characters in between must be digits',
                    },
                    validate: validateAvailability,
                  })}
                  onBlur={async () => {
                    checkNricAvailability();
                    await new Promise(resolve => setTimeout(resolve, 100));
                    trigger('nric');
                }}
                  variant="outlined"
                  fullWidth
                  error={!!errors.nric}
                  helperText={errors.nric ? errors.nric.message : ''}
                />
                <input type="hidden" name="_id" value={String(initialValues._id)} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '40px', mr: '40px' }}>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: 'none', height: '40px', width: '20%' }}
                  type="submit"
                >
                  <Typography fontFamily="Arial">Update</Typography>
                </Button>
              </ThemeProvider>
            </Box>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default UpdateSensitiveInfo;