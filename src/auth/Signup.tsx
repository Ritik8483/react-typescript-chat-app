import React from "react";
import styles from "./Login.module.scss";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import InputField from "../reusable/InputField";
import { toast } from "react-toastify";
import { googleImage } from "../images/icons/Logos";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const schema = yup.object().shape({
    name: yup.string().min(2).required("Name is required "),
    email: yup.string().email().required("Email is required "),
    password: yup.string().min(5).required("Password is required "),
    confirmPassword: yup
      .string()
      .min(5)
      .required("confirmPassword is required "),
  });
  const submitForm = (val: any, { resetForm }: any) => {
    toast.success("USer logged in successfully");
    // resetForm();
  };
  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h2>Signup</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submitForm}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
              isSubmitting,
            }) => (
              <Form className={styles.formGroup} onSubmit={handleSubmit}>
                <InputField
                  className={styles.inputFieldClass}
                  name="name"
                  placeholder="John walker"
                  controlId="ControlInput01"
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name}
                  type="text"
                  error={errors.name}
                  label="Enter your name"
                />
                <InputField
                  className={styles.inputFieldClass}
                  name="email"
                  placeholder="name@example.com"
                  controlId="ControlInput02"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                  type="email"
                  error={errors.email}
                  label="Email address"
                />
                <InputField
                  className={styles.inputFieldClass}
                  name="password"
                  placeholder="Enter Password"
                  controlId="ControlInput03"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                  type="password"
                  error={errors.password}
                  label="Password"
                />
                <InputField
                  className={styles.inputFieldClass}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  controlId="ControlInput04"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={!!errors.confirmPassword}
                  type="password"
                  error={errors.confirmPassword}
                  label="Confirm Password"
                />
                <div className="d-flex flex-column gap-3 w-100 mt-4 justify-content-center">
                  <Button
                    className="w-100"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                  <Button onClick={() => navigate("/")} type="button">
                    Already have an account?Login
                  </Button>
                  <div className={styles.googleContainer}>
                    <img
                      height="30"
                      width="30"
                      src={googleImage}
                      alt="googleImage"
                    />
                    <p className="m-0">Sign in with Google</p>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
