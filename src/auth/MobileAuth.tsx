import { useState, useEffect } from "react";
import { groviaLogo } from "../images/icons/Logos";
import styles from "./Login.module.scss";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useDispatch } from "react-redux";
import { saveAuthToken, storeGoogleCreds } from "../slice/authSlice";

const initialValues = {
  otp: "",
};

const MobileAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileToken, setMobileToken] = useState<any>();
  const [mobileOTP, setMobileOTP] = useState<any>("");
  const [validated, setValidated] = useState<boolean>(false);
  const auth: any = getAuth();

  const [value, setValue] = useState<any>();
  const submitForm = async (e: any) => {
    setValidated(true);
    e.preventDefault();
    const capatcheVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    capatcheVerifier.render();
    try {
      if (value?.length === 13) {
        setValidated(false);
      }
      const res: any = await signInWithPhoneNumber(
        auth,
        value,
        capatcheVerifier
      );
      setMobileToken(res);
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  const schema = yup.object().shape({
    otp: yup.string().min(6).required("OTP is required "),
  });

  const handleOTP = async (e: any) => {
    e.preventDefault();
    if (mobileOTP === "" || mobileOTP === null) {
      return;
    }
    try {
      const resp = await mobileToken.confirm(mobileOTP);
      dispatch(saveAuthToken(resp?.user?.accessToken));
      dispatch(storeGoogleCreds(resp?.user));
      toast.success("User Signed up successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (value?.length === 13) {
      setValidated(false);
    }
  }, [value?.length]);

  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.logoDiv}>
            <img src={groviaLogo} alt="logo" height="45px" width="45px" />
            <h4>Grovia</h4>
          </div>
          <h4 className="mt-2">
            {mobileToken?.verificationId
              ? "Verify your OTP"
              : "Signup with Mobile"}
          </h4>
          <p>
            {mobileToken?.verificationId
              ? "Please check your registered mobile number,we have sent you a 6 digit One Time Password(OTP)"
              : "Please enter your 10 digit mobile number to continue signup using mobile number."}
          </p>
          {mobileToken?.verificationId ? (
            <Form
              className={styles.formGroup}
              onSubmit={(e: any) => handleOTP(e)}
            >
              <Form.Label>Enter OTP here</Form.Label>
              <Form.Control
                placeholder="******"
                value={mobileOTP}
                onChange={(e: any) => setMobileOTP(e.target.value)}
                type="password"
              />
              <Button className="w-100 mt-4" type="submit">
                Verify OTP
              </Button>
            </Form>
          ) : (
            <Form
              className={styles.formGroup}
              onSubmit={(e: any) => submitForm(e)}
            >
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
              />
              {validated ? (
                <p
                  style={{
                    color: "red",
                    textAlign: "left",
                    fontSize: "14px",
                    marginTop: "3px",
                  }}
                >
                  Please enter a correct mobile number
                </p>
              ) : (
                <></>
              )}
              {validated ? <></> : <div id="recaptcha-container"></div>}
              <p
                onClick={() => navigate(-1)}
                className={`${styles.forgotPass} mb-3 mt-2`}
              >
                Back to Login
              </p>
              <Button className="w-100" type="submit">
                {/* {isSubmitting ? "Sending OTP..." : "Send OTP"} */}
                Send OTP
              </Button>
            </Form>
          )}

          {/* )}
          </Formik> */}
        </div>
      </div>
    </div>
  );
};

export default MobileAuth;
