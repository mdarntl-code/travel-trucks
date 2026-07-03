"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { bookCamper } from "../../lib/api";
import {
  BookingFormValues,
  bookingSchema,
} from "../../validations/bookingSchema";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
  });

  const nameField = register("name");
  const emailField = register("email");

  const onSubmit = async (data: BookingFormValues) => {
    try {
      await bookCamper(camperId, data);
      toast.success("Booking request sent successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to send booking request. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputs}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Name*"
              className={styles.input}
              {...nameField}
              onFocus={(e) => (e.target.placeholder = "Name")}
              onBlur={(e) => {
                e.target.placeholder = "Name*";
                nameField.onBlur(e);
              }}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="email"
              placeholder="Email*"
              className={styles.input}
              {...emailField}
              onFocus={(e) => (e.target.placeholder = "Email")}
              onBlur={(e) => {
                e.target.placeholder = "Email*";
                emailField.onBlur(e);
              }}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
