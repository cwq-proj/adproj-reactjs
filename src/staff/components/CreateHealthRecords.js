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
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import api from '../../api/AxiosConfig';

const theme = createTheme({
  palette: {
    primary: {
      main: '#199A8E',
    },
  },
});

const firstTabStyle = {
  width: '400px',
  margin: '15px 0'
};

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

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

const CreateHealthRecords = () => {
  const paperStyle = {
    padding: '5px',
    width: 1000,
    margin: '40px auto',
    borderRadius: '10px',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    reset,
    setValue,
    getValues,
    control
  } = useForm();

  const [tabIndex, setTabIndex] = useState(0);
  const [isDataAvail, setIsDataAvail] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    diabetes: '',
    education: '',
    bpMeds: '',
    currentSmoker: '',
    preStr: '',
    chd: '',
    preHyp: ''
  });

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const nric = watch('nric', '');

  const onSubmit = (data) => {
    console.log(data);
    alert("success");
  };

  const retrieveRecord = async () => {
    try {
      const response = await api.get(`dashboard/createHealthRecord/${nric}`);
      const data = response.data;

      setValue('firstName', data.firstName);
      setValue('lastName', data.lastName);
      if (data.phoneNumber == 0) {
        setValue('phoneNumber', '');
      } else {
        setValue('phoneNumber', data.phoneNumber);
      }
      if (data.nric) {
        setIsDataAvail(true);
      } else {
        setIsDataAvail(false);
      }
    } catch (error) {
      console.error('Error checking nric availability:', error);
    }
  };

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleNextButtonClick = (event, newValue) => {
    setTabIndex(1);
  };

  const handlePrevButtonClick = (event, newValue) => {
    setTabIndex(0);
  };

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await api.put('/dashboard/createHealthRecord', data);

  //     if (response.status === 200) {
  //       console.log('Update successful');
  //       reset();
  //       setValue('firstName', '');
  //       setValue('lastName', '');
  //       setValue('phoneNumber', '');
  //       alert('Successfully Updated Patient Details');
  //     } else {
  //       console.error('Update failed');
  //       alert('Update failed');
  //     }
  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //     alert('Error occurred');
  //   }
  // };

  console.log(watch('gender'));

  return (
    <div>
      <Paper elevation={1} style={paperStyle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', padding: '10px' }}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: '30px' }}>
              <Typography variant="h6" sx={{ mt: '20px', ml: '40px', mb: '20px' }}>Create Health Record</Typography>
              <Tabs value={tabIndex} onChange={handleChange} centered TabIndicatorProps={{ style: { marginBottom: '10px' } }}>
                <Tab
                  label={
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '-15px' }}>1</span>
                      <span style={{ fontSize: '14px', marginLeft: '15px', marginTop: '5px' }}>Enter Patient Details</span>
                    </Typography>
                  }
                  sx={{ minWidth: '400px', alignItems: 'start', mr: '30px', textTransform: 'none' }}
                />
                <Tab label={
                  <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '-15px' }}>2</span>
                    <span style={{ fontSize: '14px', marginLeft: '15px', marginTop: '5px' }}>Enter Health Record</span>
                  </Typography>
                }
                  sx={{ minWidth: '400px', alignItems: 'start', mr: '30px', textTransform: 'none' }} />

              </Tabs>
              <TabPanel value={tabIndex} index={0}>
                <Typography variant="h6" sx={{ mt: '20px', ml: '40px' }}>Patient Details</Typography>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ mt: '40px', ml: '40px', flex: 1 }}>
                  <Typography variant="body2">NRIC</Typography>
                    <TextField
                      id="nric"
                      style={{ ...firstTabStyle }}
                      label="NRIC"
                      {...register("nric", {
                        required: "NRIC is required.",
                        pattern: {
                          value: /^[A-Za-z]\d{7}[A-Za-z]$/,
                          message: 'NRIC should be exactly 9 characters, first and last character must be alphabetic character and characters in between must be digits',
                        },
                      })}
                      onBlur={() => {
                        retrieveRecord();
                        trigger('nric');
                      }}
                      error={!!errors.nric}
                      helperText={errors.nric ? errors.nric.message : ''}
                    />
                    <Typography variant="body2">First Name</Typography>
                    <TextField
                      id="first_name"
                      label="First Name"
                      value={watch('firstName', '')}
                      {...register("firstName", {
                        required: "First Name is required.",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: 'First Name should contain only alphabetic characters.',
                        },
                      })}
                      style={{ ...firstTabStyle }}
                      onBlur={() => trigger('firstName')}
                      disabled={isDataAvail}
                      error={!!errors.firstName}
                      helperText={errors.firstName ? errors.firstName.message : ''}
                    />
                    <Typography variant="body2">Last Name</Typography>
                    <TextField
                      id="last_name"
                      style={{ ...firstTabStyle }}
                      label="Last Name"
                      value={watch('lastName', '')}
                      {...register("lastName", {
                        required: "Last Name is required.",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: 'Last Name should contain only alphabetic characters.',
                        },
                      })}
                      disabled={isDataAvail}
                      onBlur={() => trigger('lastName')}
                      error={!!errors.lastName }
                      helperText={errors.lastName ? errors.lastName.message : ''}
                    />
                  </Box>
                  <Box sx={{ mt: '143px', ml: '40px', mr: '40px', flex: 1 }}>
                    <Typography variant="body2">Phone Number</Typography>
                    <TextField
                      id="phoneNumber"
                      style={{ ...firstTabStyle }}
                      label="Phone Number"
                      value={watch('phoneNumber', '')}
                      {...register("phoneNumber", {
                        required: "Phone Number is required.",
                        pattern: {
                          value: /^\d{8}$/,
                          message: 'Phone Number should be exactly 8 digits.',
                        },
                      })}
                      disabled={isDataAvail}
                      onBlur={() => trigger('phoneNumber')}
                      error={!!errors.phoneNumber }
                      helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '40px', mr: '40px' }}>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: 'none', height: '40px' }}
                      onClick={handleNextButtonClick}
                    >
                      <Typography fontFamily="Arial">Next Step</Typography>
                    </Button>
                  </ThemeProvider>
                </Box>
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <Typography variant="h6" sx={{ mt: '20px', ml: '40px' }}>Health Record</Typography>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ mt: '40px', ml: '40px', flex: 1 }}>
                    <Typography variant="body2">Gender</Typography>
                    <TextField
                      select
                      id="male"
                      label="Gender"
                      value={formData.gender}
                      onChange={handleSelectChange}
                      {...register("male", {
                        required: "Please select an option.",
                      })}
                      sx={{ margin: '15px 0' }}
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
                      {...register("age", {
                        required: "Age is required.",
                        pattern: {
                          value: /^(?!-)[0-9]{1,3}$/,
                          message: 'Age cannot be negative and must contain 1-3 digits.',
                        },
                      })}
                      onBlur={() => trigger('age')}
                      fullWidth
                      error={!!errors.age}
                      helperText={errors.age ? errors.age.message : ''}
                    />
                    <Typography variant="body2">Education Level</Typography>
                    <TextField
                      select
                      id="education"
                      defaultValue=""
                      sx={{ margin: '15px 0' }}
                      label="Education Level"
                      {...register("education", {
                        required: "Please select an option.",
                      })}
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
                      defaultValue=""
                      sx={{ margin: '15px 0' }}
                      label="Current Smoker"
                      {...register("currentSmoker", {
                        required: "Please select an option.",
                      })}
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
                      {...register("cigsPerDay", {
                        required: "Field is required.",
                        pattern: {
                          value: /^(?!-)[0-9]{1,3}$/,
                          message: 'Value cannot be negative and must contain 1-3 digits.',
                        },
                      })}
                      sx={{ margin: '15px 0' }}
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
                      defaultValue=""
                      {...register("tenYearCHD", {
                        required: "Please select an option.",
                      })}
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
                      fullWidth
                      error={!!errors.BMI}
                      helperText={errors.BMI ? errors.BMI.message : ''}
                    />
                    <Typography variant="body2">Glucose Level</Typography>
                    <TextField
                      id="glucose"
                      sx={{ margin: '15px 0' }}
                      label="Glucose Lvl"
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
                      onBlur={() => trigger('glucose')}
                      fullWidth
                      error={!!errors.glucose}
                      helperText={errors.glucose ? errors.glucose.message : ''}
                    />
                    <Typography variant="body2">BP Medication</Typography>
                    <TextField
                      select
                      id="BPMeds"
                      defaultValue=""
                      sx={{ margin: '15px 0' }}
                      label="BP Medication"
                      {...register("BPMeds", {
                        required: "Please select an option.",
                      })}
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
                      defaultValue=""
                      label="Prevalent Stroke"
                      {...register("prevalentStroke", {
                        required: "Please select an option.",
                      })}
                      sx={{ margin: '15px 0' }}
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
                      defaultValue=""
                      sx={{ margin: '15px 0' }}
                      label="Prevalent Hyp"
                      {...register("prevalentHyp", {
                        required: "Please select an option.",
                      })}
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
                      defaultValue=""
                      sx={{ margin: '15px 0' }}
                      label="Diabetes"
                      {...register("diabetes", {
                        required: "Please select an option.",
                      })}
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
                      onBlur={() => trigger('sysBP')}
                      fullWidth
                      error={!!errors.sysBP}
                      helperText={errors.sysBP ? errors.sysBP.message : ''}
                    />
                    <Typography variant="body2">Diastolic BP</Typography>
                    <TextField
                      id="diaBP"
                      label="Diastolic BP"
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
                      fullWidth
                      onBlur={() => trigger('diaBP')}
                      error={!!errors.diaBP}
                      helperText={errors.diaBP ? errors.diaBP.message : ''}
                    />
                    <Typography variant="body2">Heart Rate</Typography>
                    <TextField
                      id="heartRate"
                      label="Heart Rate"
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
                      fullWidth
                      onBlur={() => trigger('heartRate')}
                      error={!!errors.heartRate}
                      helperText={errors.heartRate ? errors.heartRate.message : ''}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '40px', mr: '40px' }}>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: 'none', height: '40px', mr: '30px' }}
                      onClick={handlePrevButtonClick}
                    >
                      <Typography fontFamily="Arial">Previous Step</Typography>
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: 'none', height: '40px', width: '15%' }}
                      type="submit"
                    >
                      <Typography fontFamily="Arial">Update</Typography>
                    </Button>
                  </ThemeProvider>
                </Box>
              </TabPanel>
            </Box>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default CreateHealthRecords;