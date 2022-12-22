import { useState, useEffect } from "react";
import { groviaLogo } from "../images/icons/Logos";
import styles from "./Login.module.scss";
import * as yup from "yup";
import { Button, Col, Form } from "react-bootstrap";
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
import {
  saveAuthToken,
  storeGoogleCreds,
  storeMobileUserImg,
  storeMobileUserNumber,
  storeMobileUserToken,
} from "../slice/authSlice";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { FirebaseDatabase, storage } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const MobileAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileToken, setMobileToken] = useState<any>();
  const [mobileOTP, setMobileOTP] = useState<any>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [validateForm, setValidateForm] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [value, setValue] = useState<any>();
  const [imageInput, setImageInput] = useState<any>("");
  const [callUseEffect, setCallUseEffect] = useState<boolean>(false);

  const auth: any = getAuth();
  const imageListRefer = ref(storage, "mobileUserImages/");
  const userRef = collection(FirebaseDatabase, "mobileUsers");

  const submitForm = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidateForm(true);
    setValidated(true);
    if (value?.length === 13) {
      setValidated(false);
      // return;
    }
    const capatcheVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    capatcheVerifier.render();
    try {
      if (value?.length === 13 && validateForm === false) {
        setValidated(false);
      }
      if (
        imageInput?.name === "" ||
        imageInput?.name === null ||
        imageInput?.name === undefined
      ) {
        setValidateForm(true);
        return;
      }
      const mobUserName = await addDoc(userRef, { name: nameInput });
      dispatch(storeMobileUserToken(mobUserName?.path?.split("/")[1]));
      const imageReference: any = ref(
        storage,
        `mobileUserImages/${imageInput?.name}`
      );
      uploadBytes(imageReference, imageInput).then(() => {});
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

  const handleOTP = async (e: any) => {
    e.preventDefault();
    if (mobileOTP === "" || mobileOTP === null) {
      return;
    }
    try {
      const resp = await mobileToken.confirm(mobileOTP);
      dispatch(storeMobileUserNumber(resp?.user?.phoneNumber));
      dispatch(saveAuthToken(resp?.user?.accessToken));
      localStorage.setItem(
        "authToken",
        JSON.stringify(resp?.user?.accessToken)
      );
      dispatch(storeGoogleCreds(resp?.user));
      toast.success("User Signed up successfully!");
      if (resp?.user?.accessToken) {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (value?.length === 13) {
      setValidated(false);
    }
  }, [value?.length]);

  useEffect(() => {
    listAll(imageListRefer).then((response) => {
      response?.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          dispatch(storeMobileUserImg(url));
        });
      });
    });
  }, []);

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
              <Button className="w-100 mt-4 mb-3" type="submit">
                Verify OTP
              </Button>
            </Form>
          ) : (
            <Form
              noValidate
              validated={validateForm}
              className={styles.formGroup}
              onSubmit={(e: any) => submitForm(e)}
            >
              <Form.Group controlId="validationCustom03">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={nameInput}
                  onChange={(e: any) => setNameInput(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3" controlId="validationCustom0300">
                <Form.Label>Upload User Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e: any) => setImageInput(e.target.files[0])}
                  placeholder="Please upload user image"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please upload your image
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Label className="mt-3">Mobile Number</Form.Label>
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
              />
              {validated ? (
                <p
                  style={{
                    color: "#dc3545",
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
              {validated && validateForm ? (
                <></>
              ) : (
                <div id="recaptcha-container"></div>
              )}
              <p
                onClick={() => navigate(-1)}
                className={`${styles.forgotPass} mb-3 mt-2`}
              >
                Back to Login
              </p>
              <Button className="w-100 mb-3" type="submit">
                Send OTP
              </Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileAuth;
