import React from "react";
import { Formik } from "formik";
import { groviaLogo } from "../images/icons/Logos";
import styles from "./Login.module.scss";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import InputField from "../reusable/InputField";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  isSignInWithEmailLink,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
};

const EmailLinkAuth = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const submitForm = async (val: any) => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:3000/",
      // This must be true.
      handleCodeInApp: true,
    //   iOS: {
    //     bundleId: "com.example.ios",
    //   },
    //   android: {
    //     packageName: "com.example.android",
    //     installApp: true,
    //     minimumVersion: "12",
    //   },https://reactchatapp.page.link
      dynamicLinkDomain: "web-chat-app-457f3.firebaseapp.com",
    };

    const response = await sendSignInLinkToEmail(   
      auth,
      val?.email,
      actionCodeSettings
    )
      .then(() => {
        window.localStorage.setItem("emailForSignIn", val?.email);
      })
      .catch((error: any) => {
        console.log(error);

        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required "),
  });
  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.logoDiv}>
            <img src={groviaLogo} alt="logo" height="45px" width="45px" />
            <h4>Grovia</h4>
          </div>
          <h4 className="mt-2">Email Link Authentication</h4>
          <p>Authenticate with Grovia Using Email Link</p>
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
                  name="email"
                  placeholder="name@example.com"
                  controlId="ControlInput0100"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                  type="email"
                  error={errors.email}
                  label="Email address"
                />
                <p
                  onClick={() => navigate(-1)}
                  className={`${styles.forgotPass} mb-3`}
                >
                  Back to Login
                </p>
                <Button
                  disabled={isSubmitting}
                  className="w-100 mb-3"
                  type="submit"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EmailLinkAuth;
