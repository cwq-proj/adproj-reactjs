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
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

const theme = createTheme({
  palette: {
    primary: {
      main: '#199A8E',
    },
  },
});

const genders = [
  {
    value: 1,
    label: 'Male',
  },
  {
    value: 0,
    label: 'Female',
  },
];

const options = [
  {
    value: 1,
    label: "Yes",
  },
  {
    value: 0,
    label: "No",
  },
];

const educationLevels = [
  {
    value: 1,
    label: "0 to 11 years",
  },
  {
    value: 2,
    label: "High School Diploma, GED",
  },
  {
    value: 3,
    label: "Some College, Vocational School",
  },
  {
    value: 4,
    label: "College (BS, BA) Degree or more",
  },
];

const UpdateHealthRecords = () => {
  const paperStyle = {
    padding: '5px',
    width: 1000,
    margin: '40px auto',
    borderRadius: '10px',
  };

  const [initialValues, setInitialValues] = useState({});
  const [userData, setUserData] = useState({});
  const [delayCompleted, setDelayCompleted] = useState(false);

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

  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setValue('male', event.target.value);
  };


  // const onSubmit = async (data) => {
  //   try {
  //     const response = await api.put('/dashboard/updateHealthRecord', data);

  //     if (response.status === 200) {
  //       console.log('Update successful');
  //       reset();
  //       setValue('firstName', '');
  //       setValue('lastName', '');
  //       setValue('phoneNumber', '');
  //       setValue('nric', '');
  //       alert('Successfully Updated Health Record');
  //     } else {
  //       console.error('Update failed');
  //       alert('Update failed');
  //     }
  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //     alert('Error occurred');
  //   }
  // };

  const onSubmit = (data) => {
    console.log(data);
  }

  // const { id } = useParams();

  const id = '64cbbf9508dc8591ccf93779';

  useEffect(() => {

    const getUser = async () => {
      try {
        const response = await api.get(`/dashboard/updateHealthRecord/${id}`);
        setUserData(response.data);
        setSelectedGender(response.data.male);
        setValue('male', response.data.male);
        setValue('age', response.data.age);
        setValue('education', response.data.education);
        setValue('currentSmoker', response.data.currentSmoker);
        setValue('cigsPerDay', response.data.cigsPerDay);
        setValue('BPMeds', response.data.BPMeds);
        setValue('prevalentStroke', response.data.prevalentStroke);
        setValue('prevalentHyp', response.data.prevalentHyp);
        setValue('diabetes', response.data.diabetes);
        setValue('totChol', response.data.totChol);
        setValue('sysBP', response.data.sysBP);
        setValue('diaBP', response.data.diaBP);
        setValue('BMI', response.data.bmi);
        setValue('heartRate', response.data.heartRate);
        setValue('glucose', response.data.glucose);
        setValue('tenYearCHD', response.data.tenYearCHD);
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

  return (
    <div >
      {delayCompleted}
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
                Update Health Record
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ mt: '40px', ml: '40px', flex: 1 }}>
                  <Typography variant="body2">Gender</Typography>
                  <TextField
                    select
                    id="male"
                    label="Gender"
                    {...register("male", {
                      required: "Please select an option.",
                    })}
                    sx={{ margin: '15px 0' }}
                    variant="outlined"
                    fullWidth
                    error={!!errors.male}
                    helperText={errors.male ? errors.male.message : ''}
                  >
                    {genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography variant="body2">Age</Typography>
                  <TextField
                    id="age"
                    sx={{ margin: '15px 0' }}
                    label="Age"
                    defaultValue={String(userData.age)}
                    {...register("age", {
                      required: "Age is required.",
                      pattern: {
                        value: /^(?!-)[0-9]{1,3}$/,
                        message: 'Age cannot be negative and must contain 1-3 digits.',
                      },
                    })}
                    onBlur={() => trigger('age')}
                    variant="outlined"
                    fullWidth
                    error={!!errors.age}
                    helperText={errors.age ? errors.age.message : ''}
                  />
                  <Typography variant="body2">Education Level</Typography>
                  <TextField
                    select
                    id="education"
                    sx={{ margin: '15px 0' }}
                    label="Education Level"
                    value={String(userData.education) || ''}
                    {...register("education", {
                      required: "Please select an option.",
                    })}
                    variant="outlined"
                    fullWidth
                    error={!!errors.education}
                    helperText={errors.education?.message}
                  >
                    {educationLevels.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography variant="body2">Current Smoker</Typography>
                  <TextField
                    select
                    id="currentSmoker"
                    sx={{ margin: '15px 0' }}
                    label="Current Smoker"
                    defaultValue={String(userData.currentSmoker)}
                    {...register("currentSmoker", {
                      required: "Please select an option.",
                    })}
                    variant="outlined"
                    fullWidth
                    error={!!errors.currentSmoker}
                    helperText={errors.currentSmoker?.message}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography variant="body2">No. of Cigarettes/Day</Typography>
                  <TextField
                    id="cigsPerDay"
                    label="Cigs Per Day"
                    defaultValue={String(userData.cigsPerDay)}
                    {...register("cigsPerDay", {
                      required: "Field is required.",
                      pattern: {
                        value: /^(?!-)[0-9]{1,3}$/,
                        message: 'Value cannot be negative and must contain 1-3 digits.',
                      },
                    })}
                    sx={{ margin: '15px 0' }}
                    variant="outlined"
                    fullWidth
                    onBlur={() => trigger('cigsPerDay')}
                    error={!!errors.cigsPerDay}
                    helperText={errors.cigsPerDay ? errors.cigsPerDay.message : ''}
                  />
                  <Typography variant="body2">10 Year Coronary Heart Disease</Typography>
                  <TextField
                    select
                    id="tenYearCHD"
                    sx={{ margin: '15px 0' }}
                    label="10 Year CHD"
                    defaultValue={String(userData.tenYearCHD)}
                    {...register("tenYearCHD", {
                      required: "Please select an option.",
                    })}
                    variant="outlined"
                    fullWidth
                    error={!!errors.tenYearCHD}
                    helperText={errors.tenYearCHD?.message}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ mt: '40px', ml: '40px', flex: 1 }}>
                  <Typography variant="body2">BMI</Typography>
                  <TextField
                    id="BMI"
                    sx={{ margin: '15px 0' }}
                    label="BMI"
                    defaultValue={String(userData.bmi)}
                    InputProps={{
                      endAdornment: < InputAdornment position="end" > kg/m²</InputAdornment>
                    }}
                    {...register("BMI", {
                      required: "BMI is required.",
                      pattern: {
                        value: /^(?!-)(\d{1,3}|\d{0,2}\.\d{1,2})$/,
                        message: 'Value cannot be negative and must contain 1-3 digits.',
                      },
                    })}
                    onBlur={() => trigger('BMI')}
                    variant="outlined"
                    fullWidth
                    error={!!errors.BMI}
                    helperText={errors.BMI ? errors.BMI.message : ''}
                  />
                  <Typography variant="body2">Glucose Level</Typography>
                  <TextField
                    id="glucose"
                    sx={{ margin: '15px 0' }}
                    label="Glucose Level"
                    defaultValue={String(userData.glucose)}
                    InputProps={{
                      endAdornment: < InputAdornment position="end" > mg&#47;dL</InputAdornment>
                    }}
                    {...register("glucose", {
                      required: "Field is required.",
                      pattern: {
                        value: /^(?!-)[0-9]{1,3}$/,
                        message: 'Value cannot be negative and must contain 1-3 digits.',
                      },
                    })}
                    variant="outlined"
                    onBlur={() => trigger('glucose')}
                    fullWidth
                    error={!!errors.glucose}
                    helperText={errors.glucose ? errors.glucose.message : ''}
                  />
                  <Typography variant="body2">BP Medication</Typography>
                  <TextField
                    select
                    id="BPMeds"
                    sx={{ margin: '15px 0' }}
                    label="BP Medication"
                    defaultValue={String(userData.BPMeds)}
                    {...register("BPMeds", {
                      required: "Please select an option.",
                    })}
                    variant="outlined"
                    fullWidth
                    error={!!errors.BPMeds}
                    helperText={errors.BPMeds?.message}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography variant="body2">Prevalent Stroke</Typography>
                  <TextField
                    select
                    id="prevalentStroke"
                    label="Prevalent Stroke"
                    defaultValue={String(userData.prevalentStroke)}
                    {...register("prevalentStroke", {
                      required: "Please select an option.",
                    })}
                    sx={{ margin: '15px 0' }}
                    variant="outlined"
                    fullWidth
                    error={!!errors.prevalentStroke}
                    helperText={errors.prevalentStroke?.message}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography variant="body2">Prevalent Hypertension</Typography>
                  <TextField
                    select
                    id="prevalentHyp"
                    sx={{ margin: '15px 0' }}
                    label="Prevalent Hyp"
                    defaultValue={String(userData.prevalentHyp)}
                    {...register("prevalentHyp", {
                      required: "Please select an option.",
                    })}
                    variant="outlined"
                    fullWidth
                    error={!!errors.prevalentHyp}
                    helperText={errors.prevalentHyp?.message}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ mt: '40px', ml: '40px', mr: '40px', flex: 1 }}>
                <Typography variant="body2">Diabetes</Typography>
                  <TextField
                    select
                    id="diabetes"
                    sx={{ margin: '15px 0' }}
                    label="Diabetes"
                    defaultValue={String(userData.diabetes)}
                    {...register("diabetes", {
                      required: "Please select an option.",
                    })}
                    variant="outlined"
                    fullWidth
                    error={!!errors.diabetes}
                    helperText={errors.diabetes?.message}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography variant="body2">Total Cholesterol Level</Typography>
                  <TextField
                    id="totChol"
                    sx={{ margin: '15px 0' }}
                    label="Total Chol Level"
                    defaultValue={String(userData.totChol)}
                    InputProps={{
                      endAdornment: < InputAdornment position="end" > mg&#47;dL</InputAdornment>
                    }}
                    {...register("totChol", {
                      required: "Field is required.",
                      pattern: {
                        value: /^(?!-)[0-9]{1,3}(\.[0-9]{1})?$/,
                        message: 'Value should not be negative and contains 1-3 digits.',
                      },
                    })}
                    variant="outlined"
                    onBlur={() => trigger('totChol')}
                    fullWidth
                    error={!!errors.totChol}
                    helperText={errors.totChol ? errors.totChol.message : ''}
                  />
                  <Typography variant="body2">Systolic BP</Typography>
                  <TextField
                    id="sysBP"
                    sx={{ margin: '15px 0' }}
                    label="Systolic BP"
                    defaultValue={String(userData.sysBP)}
                    InputProps={{
                      endAdornment: < InputAdornment position="end" > mmHg</InputAdornment>
                    }}
                    {...register("sysBP", {
                      required: "Field is required.",
                      pattern: {
                        value: /^(?!-)[0-9]{1,3}$/,
                        message: 'Value cannot be negative and must contain 1-3 digits.',
                      },
                    })}
                    variant="outlined"
                    onBlur={() => trigger('sysBP')}
                    fullWidth
                    error={!!errors.sysBP}
                    helperText={errors.sysBP ? errors.sysBP.message : ''}
                  />
                  <Typography variant="body2">Diastolic BP</Typography>
                  <TextField
                    id="diaBP"
                    label="Diastolic BP"
                    defaultValue={String(userData.diaBP)}
                    InputProps={{
                      endAdornment: < InputAdornment position="end" > mmHg</InputAdornment>
                    }}
                    {...register("diaBP", {
                      required: "Field is required.",
                      pattern: {
                        value: /^(?!-)[0-9]{1,3}$/,
                        message: 'Value cannot be negative and must contain 1-3 digits.',
                      },
                    })}
                    sx={{ margin: '15px 0' }}
                    variant="outlined"
                    fullWidth
                    onBlur={() => trigger('diaBP')}
                    error={!!errors.diaBP}
                    helperText={errors.diaBP ? errors.diaBP.message : ''}
                  />
                  <Typography variant="body2">Heart Rate</Typography>
                  <TextField
                    id="heartRate"
                    label="Heart Rate"
                    defaultValue={String(userData.heartRate)}
                    InputProps={{
                      endAdornment: < InputAdornment position="end" > beats&#47;min</InputAdornment>
                    }}
                    {...register("heartRate", {
                      required: "Field is required.",
                      pattern: {
                        value: /^(?!-)[0-9]{1,3}$/,
                        message: 'Value cannot be negative and must contain 1-3 digits.',
                      },
                    })}
                    sx={{ margin: '15px 0' }}
                    variant="outlined"
                    fullWidth
                    onBlur={() => trigger('heartRate')}
                    error={!!errors.heartRate}
                    helperText={errors.heartRate ? errors.heartRate.message : ''}
                  />
                </Box>
              </Box>
              <input type="hidden" name="_id" value={String(initialValues._id)} />
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
      </Paper >
    </div>
  );
};

export default UpdateHealthRecords;