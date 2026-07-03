import * as yup from "yup";

export const bookingSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

export type BookingFormValues = yup.InferType<typeof bookingSchema>;
