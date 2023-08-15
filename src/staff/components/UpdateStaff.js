import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Stack, MenuItem, Button, TextField, Autocomplete } from "@mui/material";
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

function UpdateAccount() {
  const { id } = useParams();

  const [staff, setStaff] = useState();

  const fetchData = () => {
    axios.get(`/api/staff/${id}`).then((response) => {
      setStaff(response.data);
      console.log("Data fetched:", response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (staff) {
      // Set default values using setValue
      reset({
        firstName: staff.firstName,
        lastName: staff.lastName,
        username: staff.username,
        email: staff.email,
        password: "",
        role: staff.role,
        createdDate: staff.createdDate,
      });
    }
  }, [staff]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.createdDate = new Date().toISOString();
      const response = await axios.put(`/api/staff/${id}`, data);
      console.log("Data submitted:", response.data);
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h2>Update User Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Stack spacing={5} justifyContent="center" alignItems="center">
          <TextField
            fullWidth
            id="firstName"
            defaultValue={staff?.firstName || ""}
            {...register("firstName", { required: "Field is required." })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            fullWidth
            id="lastName"
            defaultValue={staff?.lastName || ""}
            {...register("lastName", { required: "Field is required." })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            fullWidth
            id="username"
            defaultValue={staff?.username || ""}
            {...register("username", { required: "Field is required." })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            fullWidth
            id="email"
            type="email"
            defaultValue={staff?.email || ""}
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
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            select
            fullWidth
            id="role"
            size="normal"
            defaultValue={staff?.role || ''}
            {...register("role", {
              required: "Please select an option.",
            })}
            error={!!errors.role}
            helperText={errors.role?.message}
          >
            {roles.map((option) =>
                (<MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>)
            )}
          </TextField>

          <input type="hidden" {...register("createdDate")} />

          <Button variant="contained" type="submit" color="primary">
            Update User Account
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default UpdateAccount;
