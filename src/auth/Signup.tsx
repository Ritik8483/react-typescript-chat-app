import React, { useState } from "react";
import styles from "./Login.module.scss";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import InputField from "../reusable/InputField";
import { toast } from "react-toastify";
import { googleImage, groviaLogo } from "../images/icons/Logos";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseDatabase } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { storeUserToken } from "../slice/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const userRef = collection(FirebaseDatabase, "users");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const schema = yup.object().shape({
    name: yup.string().min(2).required("Name is required "),
    email: yup.string().email().required("Email is required "),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const submitForm = async (val: any, { resetForm }: any) => {
    try {
      const dd = await addDoc(userRef, { name: val?.name });
      dispatch(storeUserToken(dd?.path?.split("/")[1]));
      await createUserWithEmailAndPassword(auth, val?.email, val.password);
      toast.success("User signed up successfully");
      navigate(-1);
    } catch (error: any) {
      console.log(error?.message);
    }
    // resetForm();
  };
  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.logoDiv}>
            <img src={groviaLogo} alt="logo" height="45px" width="45px" />
            <h4>Grovia</h4>
          </div>
          <h4>Signup</h4>
          <p>
            Thank you for connecting with us Grovia,lets access our best
            recommendation contact for you.
          </p>
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
                  <div className={styles.signUpDiv}>
                    <p>
                      Already have an account?{" "}
                      <a
                        onClick={() => navigate("/")}
                        className={styles.signUpText}
                      >
                        Login
                      </a>
                    </p>
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
