import { useForm } from "react-hook-form";
import {
  Stack,
  MenuItem,
  Button,
  Toolbar,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const genders = [
  {
    value: 1,
    label: "Male",
  },
  {
    value: 0,
    label: "Female",
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

function Predict() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      male: 0,
      age: 0,
      education: 0,
      currentSmoker: 0,
      cigsPerDay: 0,
      BMI: 0,
      BPMeds: 0,
      prevalentStroke: 0,
      prevalentHyp: 0,
      diabetes: 0,
      totChol: 0,
      sysBP: 0,
      diaBP: 0,
      heartRate: 0,
      glucose: 0,
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/patient/predict/result");
  };

  return (
    <>
      <h2>Heart Disease Prediction</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5} justifyContent="center" alignItems="center">
          <TextField
            select
            fullWidth
            id="male"
            label="Gender"
            size="normal"
            {...register("male", {
              required: "Please select an option.",
            })}
            error={!!errors.male}
            helperText={errors.male?.message}
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            id="education"
            label="Attained Education"
            size="normal"
            {...register("education", {
              required: "Please select an option.",
            })}
            error={!!errors.education}
            helperText={errors.education?.message}
          >
            {educationLevels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type="number"
            id="age"
            label="Age"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            {...register("age", {
              required: "Field is required.",
              min: {
                value: 0,
                message: "Value cannot be negative.",
              },
              valueAsNumber: true,
            })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />

          <TextField
            select
            fullWidth
            id="currentSmoker"
            label="Current Smoking Status"
            size="normal"
            {...register("currentSmoker", {
              required: "Please select an option.",
            })}
            error={!!errors.currentSmoker}
            helperText={errors.currentSmoker?.message}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type="number"
            id="cigsPerDay"
            label="Cigarettes Per Day"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            {...register("cigsPerDay", {
              required: "Field is required.",
              valueAsNumber: true,
            })}
            error={!!errors.cigsPerDay}
            helperText={errors.cigsPerDay?.message}
          />

          <TextField
            fullWidth
            type="number"
            id="BMI"
            label="Body Mass Index (BMI)"
            InputProps={{
              inputProps: {
                min: 0,
                step: 0.01,
                pattern: "[0-9]+([,.][0-9]+)?", // Regular expression for numeric input
              },
              endAdornment: (
                <InputAdornment position="end">
                  kg&#47;m<sup>2</sup>
                </InputAdornment>
              ),
            }}
            {...register("BMI", {
              required: "Field is required.",
              min: {
                value: 0,
                message: "Value cannot be negative.",
              },
              valueAsNumber: true,
            })}
            error={!!errors.BMI}
            helperText={errors.BMI?.message}
          />

          <TextField
            select
            fullWidth
            id="BPMeds"
            label="BP Medication"
            size="normal"
            {...register("BPMeds", {
              required: "Please select an option.",
            })}
            error={!!errors.BPMeds}
            helperText={errors.BPMeds?.message}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            id="prevalentStroke"
            label="Prevalent Stroke"
            size="normal"
            {...register("prevalentStroke", {
              required: "Please select an option.",
            })}
            error={!!errors.prevalentStroke}
            helperText={errors.prevalentStroke?.message}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            id="prevalentHyp"
            label="Prevalent Hypertension"
            size="normal"
            {...register("prevalentHyp", {
              required: "Please select an option.",
            })}
            error={!!errors.prevalentHyp}
            helperText={errors.prevalentHyp?.message}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            id="diabetes"
            label="Diabetes"
            size="normal"
            {...register("diabetes", {
              required: "Please select an option.",
            })}
            error={!!errors.diabetes}
            helperText={errors.diabetes?.message}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            type="number"
            id="totChol"
            label="Total Cholesterol Level"
            InputProps={{
              inputProps: {
                step: 0.5,
                min: 0,
              },
              endAdornment: (
                <InputAdornment position="end">mg&#47;dL</InputAdornment>
              ),
            }}
            {...register("totChol", {
              required: "Field is required.",
              min: {
                value: 0,
                message: "Value cannot be negative.",
              },
              valueAsNumber: true,
            })}
            error={!!errors.totChol}
            helperText={errors.totChol?.message}
          />
          <TextField
            fullWidth
            type="number"
            id="sysBP"
            label="Systolic Blood Pressure"
            InputProps={{
              inputProps: {
                min: 0,
              },
              endAdornment: (
                <InputAdornment position="end">mmHg</InputAdornment>
              ),
            }}
            {...register("sysBP", {
              required: "Field is required.",
              min: {
                value: 0,
                message: "Value cannot be negative.",
              },
              valueAsNumber: true,
            })}
            error={!!errors.sysBP}
            helperText={errors.sysBP?.message}
          />
          <TextField
            fullWidth
            type="number"
            id="diaBP"
            label="Diastolic Blood Pressure"
            InputProps={{
              inputProps: {
                min: 0,
              },
              endAdornment: (
                <InputAdornment position="end">mmHg</InputAdornment>
              ),
            }}
            {...register("diaBP", {
              required: "Field is required.",
              min: {
                value: 0,
                message: "Value cannot be negative.",
              },
              valueAsNumber: true,
            })}
            error={!!errors.diaBP}
            helperText={errors.diaBP?.message}
          />
          <TextField
            fullWidth
            type="number"
            id="heartRate"
            label="Heart Rate"
            InputProps={{
              inputProps: {
                min: 0,
              },
              endAdornment: (
                <InputAdornment position="end">beats&#47;min</InputAdornment>
              ),
            }}
            {...register("heartRate", {
              required: "Field is required.",
              min: {
                value: 0,
                message: "Value cannot be negative.",
              },
              valueAsNumber: true,
            })}
            error={!!errors.heartRate}
            helperText={errors.heartRate?.message}
          />

          <TextField
            fullWidth
            type="number"
            id="glucose"
            label="Glucose"
            InputProps={{
              inputProps: {
                min: 0,
              },
              endAdornment: (
                <InputAdornment position="end">mg&#47;dL</InputAdornment>
              ),
            }}
            {...register("glucose", {
              required: "Field is required.",
              min: {
                value: 0,
                message: "Value cannot be negative.",
              },
              valueAsNumber: true,
            })}
            error={!!errors.glucose}
            helperText={errors.glucose?.message}
          />
          <Button variant="contained" type="submit" color="primary">
            Predict
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default Predict;
