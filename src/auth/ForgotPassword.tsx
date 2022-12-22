import { Formik } from "formik";
import { groviaLogo } from "../images/icons/Logos";
import styles from "./Login.module.scss";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import InputField from "../reusable/InputField";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const initialValues = {
  forgotEmail: "",
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const submitForm = async (val: any) => {
    try {
      const { forgotEmail } = val;
      await sendPasswordResetEmail(auth, forgotEmail);
      toast.success("Email has been sent to your registered email address");
      navigate('/');
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const schema = yup.object().shape({
    forgotEmail: yup.string().email().required("Email is required "),
  });
  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.logoDiv}>
            <img src={groviaLogo} alt="logo" height="45px" width="45px" />
            <h4>Grovia</h4>
          </div>
          <h4 className="mt-2">Forgot Password?</h4>
          <p>Forgot your password,just follow the steps below to reset it</p>
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
                  name="forgotEmail"
                  placeholder="name@example.com"
                  controlId="ControlInput0100"
                  value={values.forgotEmail}
                  onChange={handleChange}
                  isValid={touched.forgotEmail && !errors.forgotEmail}
                  isInvalid={!!errors.forgotEmail}
                  type="email"
                  error={errors.forgotEmail}
                  label="Email address"
                />
                <p
                  onClick={() => navigate(-1)}
                  className={`${styles.forgotPass} mb-3`}
                >
                  Back to Login
                </p>
                <Button disabled={isSubmitting} className="w-100 mb-3" type="submit">
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

export default ForgotPassword;
