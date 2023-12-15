export const mapIntoFormData = (formData, data) =>
  Object.entries(data).map(([key, value]) =>
    Array.isArray(value)
      ? value.map((v) => formData.append(`${key}[]`, v))
      : formData.set(key, value)
  );

export const mapIntoForm = (setValue, data) =>
  Object.entries(data).map(([key, value]) => setValue(key, value));
