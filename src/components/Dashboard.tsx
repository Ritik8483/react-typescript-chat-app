import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../components/Dashboard.module.scss";
// import { storeChannelName } from "../slice/authSlice";
import LeftComponent from "./leftComponents/LeftComponent";
import RightComponent from "./rightComponents/RightComponent";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [channelValue, setChannelValue] = useState("");
  const [dropValue, setDropValue] = useState("");
  const [channelId, setChannelId] = useState("");
  const [selectedChannelName, setSelectedChannelName] = useState("");

  const dispatch = useDispatch();

  const [channels, loading, error] = useCollection(
    collection(getFirestore(), "rooms")
  );

  const handleAdd = () => {
    if (channelValue?.length > 2) {
      db.collection("rooms").add({
        name: channelValue,
      });
      toast.success("Channel is added successfully");
    } else {
      toast.error("Please write atleast 3 characters");
    }
    setChannelValue("");
  };
  let selectedChannelByname = "";
  const handleSelectChannel = (allTheChannels: any) => {
    setDropValue(allTheChannels?.data()?.name);
    setSelectedChannelName(allTheChannels?.data()?.name);
    setChannelId(allTheChannels?.id);
  };

  return (
    <div>
      <div className={styles.dahsboardHeader}>
        <div className={styles.dashboardCard}>
          <div className={styles.leftCompContainer}>
            <LeftComponent
              handleAdd={handleAdd}
              channels={channels}
              channelValue={channelValue}
              setChannelValue={setChannelValue}
              handleSelectChannel={handleSelectChannel}
              dropValue={dropValue}
            />
            <div className={styles.lowerDashboard}></div>
          </div>
          <div className={styles.rightCompContainer}>
            <RightComponent
              selectedChannelName={selectedChannelName}
              channelId={channelId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
