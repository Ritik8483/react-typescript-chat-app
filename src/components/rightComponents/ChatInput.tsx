import React, { useState } from "react";
import styles from "../Dashboard.module.scss";
import { BsEmojiSmile } from "react-icons/bs";
import { TbSend } from "react-icons/tb";

const ChatInput = ({ setMsgText, msgText, submitTextMessage }: any) => {
  return (
    <div className={styles.chatInputField}>
      <form onSubmit={submitTextMessage}>
        <BsEmojiSmile className={styles.smilyEmoji} />
        <input
          value={msgText}
          onChange={(e: any) => setMsgText(e.target.value)}
          placeholder="Message"
          type="text"
        />
        <TbSend type="submit" onClick={(e:any)=>submitTextMessage(e)} className={styles.sendEmoji} />
      </form>
    </div>
  );
};

export default ChatInput;
