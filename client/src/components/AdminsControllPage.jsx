import React, { useState ,useEffect} from 'react'
import { useFirestore } from '../Context/FireStoreContext';
import { AppBar, Tab, Tabs, Typography, Box, Container } from '@mui/material';
import './AdminsControllPage.css';
import { MdPersonRemove } from "react-icons/md";
import axios from 'axios';

export default function AdminsControllPage() {

  const { addFsForum, getDataFsForum,getWholeCollection } = useFirestore();
const [forumData,setForumData]=useState();
const [allUsers,setAllUsers]=useState();



useEffect(()=>{
  axios.get('http://localhost:3000/user/listAllUsers').then((res)=>{
    setAllUsers(res.data);
    console.log(res.data);
  })

},[])


  useEffect(() => {
    getDataFsForum("forumMessages").then((data) => {
      setForumData(data);
    });
  },[]);

useEffect(()=>{
  addFsForum("forumMessages",forumData).then(()=>{
    console.log("data was uploaded and updated",forumData);
  })
},[forumData])



const deleteMessages=(indexToRemove)=>{
const filterdForum=forumData?.forum.filter((n,i)=> i !== indexToRemove);
setForumData({forum:filterdForum});
}
const deleteUsers=(uid)=>{
  console.log(uid)
  axios.delete(`http://localhost:3000/user/remove/${uid}`).then((res)=>{
    console.log(res.data)
    setAllUsers(res.data);
   ;})
}



  return (
    <div className='d-flex flex-row gap-5'>
  <div dir='rtl' className='d-flex flex-column gap-2 w-50'>
    <h2>ניהול הפורום</h2>
    {forumData?.forum?.map((msg,i)=>{
      return(
        <div className='border rounded w-50'>{msg.message} <button onClick={()=>deleteMessages(i)}>הסר</button></div>
      )
    })}
  </div>
  <div dir='rtl' className='d-flex flex-column gap-2 w-50'>
    <h2>ניהול משתמשים</h2>
    {allUsers? allUsers?.map((user,i)=>{
      return(
<div className='border rounded d-flex flex-column w-50'><span>אימייל: {user.email}</span> <span>תאריך הרשמה:{user.metadata.creationTime}</span><button style={{left:'0'}} onClick={()=>deleteUsers(user.uid)}>הסר משתשמש</button></div>
      )
    }):null}
    </div></div>
  )
}

