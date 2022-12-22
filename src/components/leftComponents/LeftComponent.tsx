import styles from "../Dashboard.module.scss";
import { RiAddLine } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { userIcon } from "../../images/icons/Logos";

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
  userList,
  signupUserImage,
  mobUserImage,
  mobUserName,
}: any) => {
  const getUserName = useSelector(
    (state: any) => state?.authSlice?.googleCreds
  );
  const getMobileNo = useSelector(
    (state: any) => state?.authSlice?.mobileUserNumber
  );

  return (
    <div style={{ height: "calc(100% - 80px)", overflowY: "auto" }}>
      <div className={styles.leftCardHeader}>
        <h3>
          Hello{" "}
          {getUserName?.displayName?.split(" ")[0]
            ? getUserName?.displayName?.split(" ")[0]
            : mobUserName === undefined
            ? "...loading"
            : mobUserName?.split(" ")[0]
            ? mobUserName?.split(" ")[0]
            : userList === undefined
            ? "...loading"
            : userList?.split(" ")[0]}
        </h3>
        <span>
          <img
            src={
              getUserName?.photoURL
                ? getUserName?.photoURL
                : signupUserImage
                ? signupUserImage
                : mobUserImage
                ? mobUserImage
                : userIcon
            }
            alt="getUserImg"
          />
        </span>
        <h6>{getUserName?.email ? getUserName?.email : getMobileNo}</h6>
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
