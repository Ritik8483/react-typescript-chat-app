import styles from "./Login.module.scss";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import InputField from "../reusable/InputField";
import { toast } from "react-toastify";
import {
  facebook,
  github,
  googleImage,
  groviaLogo,
  microsoft,
  mobileLogo,
} from "../images/icons/Logos";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GithubAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { UseFirebaseContextService } from "../firebase/FirebaseService";
import { auth } from "../firebaseConfig";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { saveAuthToken, storeGoogleCreds } from "../slice/authSlice";
import { useEffect } from "react";
import { FacebookAuthProvider } from "firebase/auth";

const Login = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(); //don't use this auth use firebaseConfig auth in contextApi,use in direct
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const gitProvider = new GithubAuthProvider();
  const microProvider = new OAuthProvider("microsoft.com");

  const initialValues = {
    email: "",
    password: "",
  };
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required "),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });
  const getpersistedToken: any = useSelector(
    (state: any) => state.authSlice.authToken
  );
  const getLocalStoreToken: any = JSON.parse(
    localStorage.getItem("authToken") || "{}"
  );

  const submitForm = async (val: any) => {
    const auth = getAuth();
    try {
      if (auth?.currentUser?.emailVerified) {
        const result: any = await signInWithEmailAndPassword(
          auth,
          val?.email,
          val?.password
        );
        dispatch(storeGoogleCreds(result?.user));
        dispatch(saveAuthToken(result?.user?.accessToken));
        localStorage.setItem(
          "authToken",
          JSON.stringify(result?.user?.accessToken)
        );
        if (result?.user?.accessToken) {
          navigate("dashboard");
          toast.success("User logged in successfully");
        }
      } else {
        toast.error("E-mail address is not verified!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const handleGoogle = async () => {
    const resp: any = await signInWithPopup(auth, provider); //use async await or it dont show token
    dispatch(saveAuthToken(resp?.user?.accessToken));
    dispatch(storeGoogleCreds(resp?.user));
    localStorage.setItem("authToken", JSON.stringify(resp?.user?.accessToken));
    toast.success("User signed in successfully");
    navigate("dashboard");
  };

  if (getLocalStoreToken && getpersistedToken) {
    return <Navigate to="dashboard" />;
  }
  const handleEmailLink = () => {
    navigate("email-link");
  };
  const handleFb = async () => {
    await signInWithPopup(auth, fbProvider)
      .then((result: any) => {
        dispatch(saveAuthToken(result?.user?.accessToken));
        dispatch(storeGoogleCreds(result?.user));
        localStorage.setItem(
          "authToken",
          JSON.stringify(result?.user?.accessToken)
        );
        navigate("dashboard");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  const handleGithub = async () => {
    const gitVar = await signInWithPopup(auth, gitProvider)
      .then((result: any) => {
        dispatch(saveAuthToken(result?.user?.accessToken));
        dispatch(storeGoogleCreds(result?.user));
        localStorage.setItem(
          "authToken",
          JSON.stringify(result?.user?.accessToken)
        );
        navigate("dashboard");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  const handleMicrosoft = async () => {
    await signInWithPopup(auth, microProvider)
      .then((result: any) => {
        dispatch(saveAuthToken(result?.user?.accessToken));
        dispatch(storeGoogleCreds(result?.user));
        localStorage.setItem(
          "authToken",
          JSON.stringify(result?.user?.accessToken)
        );
        navigate("dashboard");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.logoDiv}>
            <img src={groviaLogo} alt="logo" height="45px" width="45px" />
            <h4>Grovia</h4>
          </div>
          <h4>Login</h4>
          <p>
            Welcome Back! login with your data that you entered during
            registration.
          </p>
          <div className={styles.optionsDiv}>
            <div
              onClick={handleGoogle}
              className={styles.googleParentContainer}
            >
              <img src={googleImage} alt="googleImage" height="23" width="23" />
              <p className="mb-0">Sign in with Google</p>
            </div>
            <div
              onClick={() => navigate("phone-auth")}
              className={styles.mobileContainer}
            >
              <img src={mobileLogo} alt="mobileLogo" height="23" width="23" />
              <p className="mb-0">Sign in with Phone number</p>
            </div>
          </div>
          <div className={styles.otherOpt}>
            <div onClick={handleFb} className={styles.otherBox}>
              <img src={facebook} alt="mobileLogo" height="26" width="26" />
              <p className="mb-0">Facebook</p>
            </div>
            <div onClick={handleMicrosoft} className={styles.otherBox}>
              <img src={microsoft} alt="mobileLogo" height="26" width="26" />
              <p className="mb-0">Microsoft</p>
            </div>
            <div onClick={handleGithub} className={styles.otherBox}>
              <img src={github} alt="mobileLogo" height="26" width="26" />
              <p className="mb-0">Github</p>
            </div>
          </div>
          <span></span>
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
                <p
                  onClick={() => navigate("forgot-password")}
                  className={styles.forgotPass}
                >
                  Forgot Password?
                </p>
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
                      Don't have an account?{" "}
                      <a
                        onClick={() => navigate("signup")}
                        className={styles.signUpText}
                      >
                        Signup
                      </a>
                    </p>
                    <p>
                      <a
                        onClick={() => handleEmailLink()}
                        className={styles.signUpText}
                      >
                        Email link authentication
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

export default Login;
