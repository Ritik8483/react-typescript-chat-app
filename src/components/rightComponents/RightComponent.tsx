import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import styles from "../Dashboard.module.scss";
import ChatContent from "./ChatContent";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";
import { saveAuthToken, storeGoogleCreds } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";
import { userIcon } from "../../images/icons/Logos";

const RightComponent = ({ channelId, selectedChannelName, userList }: any) => {
  const chatContentRef: any = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msgText, setMsgText] = useState("");

  const getUserName = useSelector(
    (state: any) => state?.authSlice?.googleCreds
  );

  const [roomDetails] = useDocument(
    channelId && db?.collection("rooms")?.doc(channelId)
  );
  const [roomMessages] = useCollection(
    channelId &&
      db
        .collection("rooms")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  const submitTextMessage = (e: any) => {
    e.preventDefault();
    if (!selectedChannelName) {
      setMsgText("");
      toast.error("No channel is selected");
    }
    if (!channelId) {
      return false;
    }
    if (msgText?.length > 0) {
      db.collection("rooms")
        .doc(channelId)
        .collection("messages")
        .add({
          message: msgText,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: getUserName?.displayName ? getUserName?.displayName : userList,
          userImage: getUserName?.photoURL ? getUserName?.photoURL : userIcon,
        });
    } else {
      toast.error("Please write something!");
    }
    setMsgText("");
  };

  const autoScrollHeight = () => {
    const scrollAutoHeight =
      chatContentRef?.current?.scrollHeight -
      chatContentRef?.current?.clientHeight;
    chatContentRef.current.scrollTo(0, scrollAutoHeight);
  };
  useEffect(() => {
    autoScrollHeight();
  }, [roomMessages?.docs?.length]);

  const handleLogout = () => {
    dispatch(storeGoogleCreds(""));
    dispatch(saveAuthToken(""));
    toast.success("User logged out successfully");
    navigate("/");
  };

  return (
    <div>
      <div className={styles.chatContainer}>
        <div className={styles.headerRightBoxes}>
          <div className={styles.headerRight}>
            <span className={styles.userImgSpan}>
              <img
                src={getUserName?.photoURL ? getUserName?.photoURL : userIcon}
                alt=""
              />
            </span>
            <div className={styles.activeUserChannelBox}>
              <h5 className={styles.activeuserName}>
                {getUserName.displayName
                  ? getUserName.displayName
                  : userList === undefined
                  ? "...loading"
                  : userList}
              </h5>
              <div className={styles.activeChannelBox}>
                <span
                  style={{
                    backgroundColor: selectedChannelName ? "green" : "red",
                  }}
                  className={styles.activeImg}
                ></span>
                <h6>
                  {selectedChannelName
                    ? `#${selectedChannelName}`
                    : "No selected channel to show!"}
                </h6>
              </div>
            </div>
          </div>
          <h5 onClick={handleLogout}>Logout</h5>
        </div>

        <ChatContent
          msgText={msgText}
          selectedChannelName={selectedChannelName}
          chatContentRef={chatContentRef}
          submitTextMessage={submitTextMessage}
          setMsgText={setMsgText}
          roomMessages={roomMessages}
          userList={userList}
        />
      </div>
    </div>
  );
};

export default RightComponent;
