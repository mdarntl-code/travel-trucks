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
          {/* Поле Name */}
          <div className={styles.inputWrapper}>
            <div className={styles.inputInner}>
              <input
                id="name"
                type="text"
                placeholder=" "
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                {...nameField}
              />
              <label htmlFor="name" className={`${styles.label} ${errors.name ? styles.labelError : ""}`}>
                Name*
              </label>
              {/* SVG іконка для поля Name */}
              {errors.name && (
                <svg className={styles.errorIcon} width="20" height="20">
                  <use href="/icons/sprite.svg#icon-error" />
                </svg>
              )}
            </div>
            {errors.name && (
              <span className={styles.errorMessage}>{errors.name.message}</span>
            )}
          </div>

          {/* Поле Email */}
          <div className={styles.inputWrapper}>
            <div className={styles.inputInner}>
              <input
                id="email"
                type="email"
                placeholder=" "
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                {...emailField}
              />
              <label htmlFor="email" className={`${styles.label} ${errors.email ? styles.labelError : ""}`}>
                Email*
              </label>
              {/* SVG іконка для поля Email */}
              {errors.email && (
                <svg className={styles.errorIcon} width="20" height="20">
                  <use href="/icons/sprite.svg#icon-error" />
                </svg>
              )}
            </div>
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email.message}</span>
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