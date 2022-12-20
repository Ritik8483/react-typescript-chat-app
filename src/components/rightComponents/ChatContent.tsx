import React from "react";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { userIcon } from "../../images/icons/Logos";
import styles from "../Dashboard.module.scss";
import ChatInput from "./ChatInput";

const ChatContent = ({
  msgText,
  setMsgText,
  submitTextMessage,
  chatContentRef,
  roomMessages,
  selectedChannelName,
  userList,
}: any) => {
  return (
    <>
      <div ref={chatContentRef} className={styles.chatContainerBox}>
        {roomMessages?.docs?.length === 0 ? (
          <div
            className={`d-flex flex-column justify-content-center align-items-center ${styles.loadingDiv}`}
          >
            <p style={{ fontSize: "20px", marginBottom: "0" }}>
              Empty Messages
            </p>
            <p className="m-0">(Add messages to your channel)</p>
          </div>
        ) : roomMessages && selectedChannelName ? (
          roomMessages?.docs?.map((msg: any, index: any) => {
            const { message, timestamp, user, userImage } = msg?.data();
            let date = new Date(timestamp?.seconds * 1000);
            var timeStr = date.toTimeString().split(" ")[0];
            return (
              <div key={index} className={styles.allMsgList}>
                <div className={styles.chatImgTextBox}>
                  <div className={styles.userGoogleImg}>
                    <img src={userImage ? userImage : userIcon} />
                  </div>
                  <div className={styles.anotherChatField}>{message}</div>
                </div>
                <div className={styles.anotherUserTextDiv}>
                  <h6>
                    {user
                      ? user
                      : userList === undefined
                      ? "...loading"
                      : userList}
                  </h6>
                  <p className={styles.timeText}>
                    {String(new Date(timestamp?.toDate())).split("GMT")[0] !==
                    "Invalid Date"
                      ? String(new Date(timestamp?.toDate())).split("GMT")[0]
                      : "..."}
                  </p>
                </div>
              </div>
            );
          })
        ) : !selectedChannelName ? (
          <div
            className={`d-flex flex-column justify-content-center align-items-center ${styles.loadingDiv}`}
          >
            <h5>No messages to show</h5>
            <p>(Please select any channel to continue)</p>
          </div>
        ) : (
          <div
            className={`d-flex justify-content-center align-items-center ${styles.loadingDiv}`}
          >
            <Oval
              height={40}
              width={40}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}
      </div>
      <ChatInput
        msgText={msgText}
        setMsgText={setMsgText}
        submitTextMessage={submitTextMessage}
      />
    </>
  );
};

export default ChatContent;
