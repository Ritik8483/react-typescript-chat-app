import { createContext, useContext } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";

const firebaseContext = createContext({});              //need to provide {} as default value in TS

export const FirebaseService = ({ children }: any) => {
  const signInWihGoogle = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };
  const funValues = {
    signInWihGoogle,            //value={{signInWihGoogle}}
  };
  return (
    <firebaseContext.Provider value={funValues}>
      {children}
    </firebaseContext.Provider>
  );
};

export const UseFirebaseContextService = () => {
  return useContext(firebaseContext);
};
