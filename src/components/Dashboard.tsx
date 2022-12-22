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
  const [signupUserImage, setSignupUserImage] = useState("");
  const [mobUserImage, setMobUserImage] = useState("");
  const [mobUserName, setMobUserName] = useState<any>("");

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
  const userMobileRef = collection(FirebaseDatabase, "mobileUsers");

  const getUserNameToken = useSelector(
    (state: any) => state?.authSlice?.userNameToken
  );
  const getMobileNameToken = useSelector(
    (state: any) => state?.authSlice?.mobileUserToken
  );
  const getSignupUserImage = useSelector(
    (state: any) => state?.authSlice?.signupUserImg
  );
  const getMobileUserImg = useSelector(
    (state: any) => state?.authSlice?.mobileUserImg
  );

  const getUserSList = async () => {
    try {
      const userData: any = await getDocs(userRef);
      const dd = userData?.docs?.map((i: any) => ({ ...i.data(), id: i.id }));
      dd?.map((da: any) => {
        if (da?.id === getUserNameToken) {
          return setUserList(da?.name);
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  const getMobileUserSList = async () => {
    try {
      const userMobData: any = await getDocs(userMobileRef);
      const datas = userMobData?.docs?.map((i: any) => ({
        ...i.data(),
        id: i.id,
      }));

      datas?.map((da: any) => {
        if (da?.id === getMobileNameToken) {
          return setMobUserName(da?.name);
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserSList();
    getMobileUserSList();
    setSignupUserImage(getSignupUserImage);
    setMobUserImage(getMobileUserImg);
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
              signupUserImage={signupUserImage}
              mobUserImage={mobUserImage}
              mobUserName={mobUserName}
            />
            <div className={styles.lowerDashboard}></div>
          </div>
          <div className={styles.rightCompContainer}>
            <RightComponent
              selectedChannelName={selectedChannelName}
              channelId={channelId}
              userList={userList}
              signupUserImage={signupUserImage}
              mobUserImage={mobUserImage}
              mobUserName={mobUserName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
