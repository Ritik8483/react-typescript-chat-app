import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../components/Dashboard.module.scss";
import LeftComponent from "./leftComponents/LeftComponent";
import RightComponent from "./rightComponents/RightComponent";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { db, FirebaseDatabase } from "../firebaseConfig";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [channelValue, setChannelValue] = useState("");
  const [dropValue, setDropValue] = useState("");
  const [channelId, setChannelId] = useState("");
  const [selectedChannelName, setSelectedChannelName] = useState("");
  const [userList, setUserList] = useState<any>();

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

  const userRef = collection(FirebaseDatabase, "users");

  const getUserNameToken = useSelector(
    (state: any) => state?.authSlice?.userNameToken
  );
  const getUserSList = async () => {
    try {
      const userData: any = await getDocs(userRef);
      const dd = userData?.docs?.map((i: any) => ({ ...i.data(), id: i.id }));
      dd.map((da: any) => {
        if (da?.id === getUserNameToken) {
          return setUserList(da?.name);
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserSList();
  }, []);
  const getpersistedToken: any = useSelector(
    (state: any) => state.authSlice.authToken
  );
  const getLocalStoreToken: any = JSON.parse(
    localStorage.getItem("authToken") || "{}"
  );

  if (!(getLocalStoreToken && getpersistedToken)) {
    return <Navigate to="/" />;
  }

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
              userList={userList}
            />
            <div className={styles.lowerDashboard}></div>
          </div>
          <div className={styles.rightCompContainer}>
            <RightComponent
              selectedChannelName={selectedChannelName}
              channelId={channelId}
              userList={userList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
