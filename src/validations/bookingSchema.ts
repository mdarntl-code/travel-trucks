import * as yup from "yup";

export const bookingSchema = yup.object({
  name: yup
    .string()
    .required("Please enter your full name.")
    .test(
      "is-full-name",
      "Please enter your full name.",
      (value) => {
        if (!value) return false;
        const words = value.trim().split(/\s+/);
        return words.length >= 2;
      }
    ),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

export type BookingFormValues = yup.InferType<typeof bookingSchema>;