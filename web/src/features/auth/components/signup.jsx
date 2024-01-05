"use client";

import { AUTH, SINGUP } from "@/configs";
import { $axios } from "@/libs/axios";
import { isEmpty } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineEmail, MdPersonOutline } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { toast } from "react-toastify";
import { signupValidator } from "../validators";
import { useRouter } from "next/navigation";

export const Signup = () => {
  const router = useRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
      termsAndConditions: false,
    },
    resolver: zodResolver(signupValidator),
  });

  const termsAndConditions = watch("termsAndConditions");

  const onSubmit = async ({ confirmPassword, termsAndConditions, ...rest }) => {
    try {
      const { message } = await $axios.post(`/${AUTH}/${SINGUP}`, rest);

      toast(message, { type: "success" });
      router.replace("/");
    } catch (error) {
      isEmpty(error.messages)
        ? toast(error.message, {
            type: "error",
          })
        : error.messages.map((message) =>
            toast(message, {
              type: "error",
            })
          );
    }
  };

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="Firstname"
              variant="outlined"
              type="text"
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdPersonOutline />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="Lastname"
              variant="outlined"
              type="text"
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdPersonOutline />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="Email"
              variant="outlined"
              type="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineEmail />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="Date of Birth"
              variant="outlined"
              type="date"
              error={Boolean(errors.dateOfBirth)}
              helperText={errors.dateOfBirth?.message}
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BsCalendarDate />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="Password"
              variant="outlined"
              type="password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TbPassword />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="Confirm Password"
              variant="outlined"
              type="password"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TbPassword />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="termsAndConditions"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <FormControl {...rest} error={Boolean(errors.rememberMe)}>
              <FormControlLabel
                control={<Checkbox checked={value} onChange={onChange} />}
                label="Terms and Conditions"
              />
              {errors.rememberMe && (
                <FormHelperText>{errors.rememberMe.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          loading={isSubmitting}
          disabled={!termsAndConditions}
        >
          Submit
        </LoadingButton>
      </form>
    </>
  );
};
