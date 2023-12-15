"use client";

import { isEmpty, mapIntoForm, mapIntoFormData } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import { productEntryValidator } from "../validators";

export const ProductEntry = ({ edit, data }) => {
  const [image, setImage] = useState();
  const router = useRouter();
  const {
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      tags: [],
      price: 0,
      category: "",
      quantity: 0,
      image: "",
      rating: 0,
    },
    resolver: zodResolver(productEntryValidator),
  });

  useEffect(() => {
    if (!isEmpty(data)) {
      mapIntoForm(setValue, data);
    }
  }, [data, setValue]);

  const onSubmit = ({ image: _image, ...rest }) => {
    try {
      const formData = new FormData();
      formData.set("image", image);
      mapIntoFormData(formData, rest);
      for (const value of formData.values()) {
        console.log(value, typeof value);
      }
      toast(
        edit ? "Product updated successfully" : "Product created successfully",
        { type: "success" }
      );
      router.replace("/admin/products");
    } catch (error) {
      toast("Couldn't create product", { type: "error" });
    }
  };

  const handleImage = (event) => {
    const { files } = event.target;
    setValue("image", URL.createObjectURL(files[0]));
    setImage(files[0]);
  };

  const handleNumberChange = (event) => {
    const { name, value } = event.target;
    setValue(`${name}`, parseInt(value));
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <Box className="flex flex-row gap-2 items-end">
            <Avatar
              alt={watch("name")}
              src={field.value}
              variant="square"
              className="w-32 h-32"
            />

            <Box>
              <Button
                component="label"
                variant="contained"
                startIcon={<MdOutlineFileUpload />}
                onChange={handleImage}
              >
                Upload image
                <input type="file" hidden accept="image/*" />
              </Button>
            </Box>
          </Box>
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            id={field.name}
            label="Name"
            variant="outlined"
            type="text"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            id={field.name}
            label="Description"
            variant="outlined"
            type="text"
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            multiline
            rows={4}
            {...field}
          />
        )}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.tags)}>
            <InputLabel id={field.name}>Tags</InputLabel>
            <Select
              labelId={field.name}
              id={field.name}
              multiple
              label="Tags"
              {...field}
            >
              <MenuItem value="popular">Most popular</MenuItem>
              <MenuItem value="recent">Recent</MenuItem>
              <MenuItem value="highly-rated">Highly rated</MenuItem>
            </Select>

            {errors.tags && (
              <FormHelperText>{errors.tags.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <TextField
            id={rest.name}
            label="Price"
            variant="outlined"
            type="number"
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
            onChange={handleNumberChange}
            {...rest}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.category)}>
            <InputLabel id={field.name}>Category</InputLabel>
            <Select
              labelId={field.name}
              id={field.name}
              label="Category"
              {...field}
            >
              <MenuItem value="electronic">Electronics</MenuItem>
              <MenuItem value="clothes">Clothes</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
            </Select>

            {errors.category && (
              <FormHelperText>{errors.category.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="quantity"
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <TextField
            id={rest.name}
            label="Quantity"
            variant="outlined"
            type="number"
            error={Boolean(errors.quantity)}
            helperText={errors.quantity?.message}
            onChange={handleNumberChange}
            {...rest}
          />
        )}
      />

      <Controller
        name="rating"
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <TextField
            id={rest.name}
            label="Rating"
            variant="outlined"
            type="number"
            error={Boolean(errors.rating)}
            helperText={errors.rating?.message}
            {...rest}
            onChange={handleNumberChange}
          />
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
    </form>
  );
};
