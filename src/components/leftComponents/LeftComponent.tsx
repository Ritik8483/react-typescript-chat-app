import React, { useState } from "react";
import styles from "../Dashboard.module.scss";
import { RiAddLine } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";
import { collection, getFirestore } from "firebase/firestore";
// import { storeChannelName } from "../../slice/authSlice";

export interface Task {
  title: string;
  message: string;
}
const LeftComponent = ({
  handleSelectChannel,
  channelValue,
  setChannelValue,
  channels,
  dropValue,
  handleAdd,
}: any) => {
  const getUserName = useSelector(
    (state: any) => state?.authSlice?.googleCreds
  );

  // const getUserImg = useSelector(
  //   (state: any) => state?.authSlice?.googleUserImage
  // );
  return (
    <div>
      <div className={styles.leftCardHeader}>
        <h3>Hello {getUserName?.displayName?.split(" ")[0]}</h3>
        <span>
          <img src={getUserName?.photoURL} alt="getUserImg" />
        </span>
        <h6>{getUserName?.email}</h6>
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.addChannelBox}>
          <h5>Add Channel</h5>
          <div className={styles.channelBox}>
            <input
              value={channelValue}
              onChange={(e: any) => setChannelValue(e.target.value)}
              type="text"
            />
            <RiAddLine onClick={handleAdd} className={styles.addIcon} />
          </div>
        </div>
        <div className={styles.channelistBox}>
          <h5>Selected Channel</h5>
          <Dropdown style={{ width: "100%" }}>
            <Dropdown.Toggle
              style={{ width: "100%", textAlign: "start" }}
              variant="success"
              id="dropdown-basic"
            >
              #{dropValue ? dropValue : "select any channel"}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "100%" }}>
              <div className={styles.adjustDrop}>
                {channels?.docs?.map((channel: any, index: any) => {
                  return (
                    <Dropdown.Item
                      onClick={() => handleSelectChannel(channel)}
                      key={index}
                    >
                      #{channel?.data()?.name}
                    </Dropdown.Item>
                  );
                })}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default LeftComponent;
