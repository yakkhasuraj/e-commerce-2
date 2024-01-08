"use client";

import { ACCESS_TOKEN, AUTH, LOGIN, ONE_SECOND } from "@/configs";
import { $axios } from "@/libs/axios";
import { decodeJwt, isEmpty } from "@/utils";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { toast } from "react-toastify";
import { useCookie } from "react-use";
import { loginValidator } from "../validators";

export const Login = () => {
  const [, updateCookie] = useCookie(ACCESS_TOKEN);
  const router = useRouter();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    resolver: zodResolver(loginValidator),
  });

  const onSubmit = async (data) => {
    try {
      const { message, token } = await $axios.post(`/${AUTH}/${LOGIN}`, data);

      const decoded = decodeJwt(token);

      updateCookie(token, {
        secure: true,
        sameSite: "Strict",
        expires: new Date(decoded.exp * ONE_SECOND),
      });
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
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
        name="rememberMe"
        control={control}
        render={({ field: { value, onChange, ...rest } }) => (
          <FormControl {...rest} error={Boolean(errors.rememberMe)}>
            <FormControlLabel
              control={<Checkbox checked={value} onChange={onChange} />}
              label="Remember me"
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
      >
        Submit
      </LoadingButton>

      <Link href="/auth/signup" className="text-primary-200">
        Create an account?
      </Link>
    </form>
  );
};
