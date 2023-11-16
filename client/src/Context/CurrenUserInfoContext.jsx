import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import {useFirestore} from './FireStoreContext'
const CurrenUserInfoContext = createContext();

export function CurrenUserInfoProvider({ children }) {
  const [currenUserInfoState, setCurrenUserInfoState] = useState(null);
  const {currentUser}=useAuth();
  const {getDataFS}=useFirestore();
const [isAdmin,setIsAdmin]=useState(false);
  const value = {
    currenUserInfoState,
    setCurrenUserInfoState,
    setIsAdmin,isAdmin
  };

  useEffect(()=>{
    if(currentUser)
    {
      
      getDataFS(currentUser.uid)
      .then((data)=>{
        console.log(data);
        setCurrenUserInfoState(data)
      })
    }
    else setCurrenUserInfoState(null)

  },[currentUser])

  return <CurrenUserInfoContext.Provider value={value}>{children}</CurrenUserInfoContext.Provider>;
}

export function useCurrenUserInfo() {
  return useContext(CurrenUserInfoContext);
}