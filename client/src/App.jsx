import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Login from './components/Login'
import ForgotPassword from "./components/ForgotPassword";
import './style/style.css'
import AddDetailes from "./components/AddDetailes";
import PersonalMainPage from "./components/PersonalMainPage";
import Footer from "./components/Footer";
import { useCurrenUserInfo } from "./Context/CurrenUserInfoContext";
import ErrNotLoggedIn from "./components/ErrNotLoggedIn";
import ChildPage from "./components/ChildPage";
import { useAuth } from "./Context/AuthContext";
import ThreeDots from "./components/ThreeDots";
import Forum from "./components/Forum";
import Articlle1 from "./components/Articlle1";
import Article2 from "./components/Article2";
import Article4 from "./components/Article4";
import Article3 from "./components/Article3";
import AdminsControllPage from "./components/AdminsControllPage";
import { checkConnection } from "./ConnectionsToserver/httpRequests";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

export default function App() {
  const{currenUserInfoState,isAdmin,setIsAdmin } = useCurrenUserInfo();
  const {currentUser,setCurrentUser} = useAuth();


useEffect(()=>{

  checkConnection().then((res)=>{
    console.log(res);
  setCurrentUser(res.data.user)
  setIsAdmin(true)
  console.log("im in",isAdmin);
}).catch((error)=>{
  console.log(error);
  setIsAdmin(false)
})
},[])


  return (
    <>
   <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgotPassword" element={<ForgotPassword/>}/>
      <Route path="/addDetailes" element={(currentUser)?<AddDetailes/>:<ErrNotLoggedIn/>}/>
      <Route path="/user/main" element={(currenUserInfoState)?(<PersonalMainPage/>):((currentUser)?<ThreeDots/>:<ErrNotLoggedIn/>)}/>
      <Route path="/child/:name" element={(currenUserInfoState)?(<ChildPage/>):((currentUser)?<ThreeDots/>:<ErrNotLoggedIn/>)}/>
      <Route path="/user/forum" element={(currenUserInfoState)?(<Forum/>):((currentUser)?<ThreeDots/>:<ErrNotLoggedIn/>)}/>
      <Route path="/article1" element={<Articlle1/>}/>
      <Route path="/article2" element={<Article2/>}/>
      <Route path="/article3" element={<Article3/>}/>
      <Route path="/article4" element={<Article4/>}/>
      <Route path="/adminsPage" element={isAdmin?<AdminsControllPage/>:<ErrNotLoggedIn/>}/>


    </Routes>
    <Footer/>
    </>
  )
}

