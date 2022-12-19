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
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { UseFirebaseContextService } from "../firebase/FirebaseService";
import { auth } from "../firebaseConfig";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  saveAuthToken,
  storeGoogleCreds,
} from "../slice/authSlice";

const Login = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(); //don't use this auth use firebaseConfig auth in contextApi,use in direct
  const provider = new GoogleAuthProvider();
  // const {signInWihGoogle}=UseFirebaseContextService();

  const initialValues = {
    email: "",
    password: "",
  };
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required "),
    password: yup.string().min(5).required("Password is required "),
  });
  const getpersistedToken = useSelector(
    (state: any) => state.authSlice.authToken
  );
  const submitForm = async (val: any, { resetForm }: any) => {
    console.log(val);
    toast.success("USer logged in successfully");
    const result = await createUserWithEmailAndPassword(
      auth,
      val?.email,
      val?.password
    );
    dispatch(saveAuthToken(result?.user?.email));
    // console.log('result',(result)?.user?.accessToken);   //why it's not accessing accessToken
    // resetForm();
  };

  // const handleGoogle = async () => {

  //   const resp = await signInWithPopup(auth, provider); //use async await or it dont show token
  //   // directly resp in typescript doesn't give any token but can give other info
  //   const credential = GoogleAuthProvider.credentialFromResult(resp); //it gives token
  //   console.log('resp',resp?.user);
  //   dispatch(storeGoogleCreds(resp))
  //   const token = credential?.idToken;
  //   dispatch(saveAuthToken(token));

  //   localStorage.setItem("authToken", JSON.stringify(token));
  //   if (getpersistedToken) {
  //     navigate("dashboard");
  //   }
  // };

  console.log("getpersistedToken", getpersistedToken);

  const { signInWihGoogle }: any = UseFirebaseContextService();
  const handleGoogle = async () => {
    try {
      const resp = await signInWihGoogle();
      // const credential = GoogleAuthProvider.credentialFromResult(resp);
      // const token = credential?.idToken;
      console.log(resp?.user?.accessToken);

      dispatch(saveAuthToken(resp?.user?.accessToken));
      dispatch(storeGoogleCreds(resp?.user));
      console.log("resp", resp);
      toast.success("User signed in successfully");
      navigate("dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDispatch = () => {
    dispatch(storeGoogleCreds(""));
    // dispatch(storeChannelName(""));
    // dispatch(storeChannelId(""));
    // dispatch(storeGoogleUserImage(""));
  };

  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h2>Login</h2>
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
                  controlId="ControlInput1"
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
                  controlId="ControlInput2"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                  type="password"
                  error={errors.password}
                  label="Password"
                />
                <div className="d-flex flex-column gap-3 w-100 mt-4 justify-content-center">
                  <Button
                    className="w-100"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {/* {isSubmitting ? "Saving..." : "Save"} */}
                    Save
                  </Button>
                  <Button onClick={() => navigate("signup")} type="button">
                    Signup
                  </Button>
                  <Button onClick={handleDispatch}>Empty</Button>
                  <div
                    onClick={handleGoogle}
                    className={styles.googleContainer}
                  >
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

export default Login;
