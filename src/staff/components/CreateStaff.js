import { useForm } from "react-hook-form";
import {
  Stack,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import axios from "../../api/AxiosConfig";

const roles = [
  {
    value: "CLINIC",
    label: "Clinic",
  },
  {
    value: "ADMIN",
    label: "Administrator",
  },
  {
    value: "RESEARCHER",
    label: "Researcher",
  },
];

export default function CreateStaff() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      role: "",
      createdDate: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      data.createdDate = new Date().toISOString();
      const response = await axios.post("/api/staff/register", data);
      console.log("Data submitted:", response.data);
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h2>Create User Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5} justifyContent="center" alignItems="center">
          <TextField
            fullWidth
            id="firstName"
            label="First Name"
            {...register("firstName", { required: "Field is required." })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            fullWidth
            id="lastName"
            label="Last Name"
            {...register("lastName", { required: "Field is required." })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            fullWidth
            id="username"
            label="Username"
            {...register("username", { required: "Field is required." })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            fullWidth
            id="email"
            label="Email"
            type="email"
            {...register("email", {
              required: "Field is required.",
              pattern: {
                value: /^[\w\.-]+@[\w\.-]+\.\w+$/,
                message: "Please enter a valid email address.",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            {...register("password", { required: "Field is required." })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            select
            fullWidth
            id="role"
            label="Role"
            size="normal"
            {...register("role", {
              required: "Please select an option.",
            })}
            error={!!errors.role}
            helperText={errors.role?.message}
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <input type="hidden" {...register("createdDate")} />

          <Button variant="contained" type="submit" color="primary">
            Create User Account
          </Button>
        </Stack>
      </form>
    </>
  );
}
