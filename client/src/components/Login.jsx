import React, { useEffect } from "react";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFirestore } from '../Context/FireStoreContext'
import { useCurrenUserInfo } from "../Context/CurrenUserInfoContext";
import { useNavigate } from "react-router-dom";
import {loginNode} from '../ConnectionsToserver/httpRequests'
import axios from "axios";
import Cookies from "js-cookie";



export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login,setCurrentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getDataFS } = useFirestore();
  const { setCurrenUserInfoState,isAdmin,setIsAdmin } = useCurrenUserInfo();
  const [admin,setAdmin]=useState(false);
  const [userDataRecived,setUsersDataRecived]=useState();


  async function handleSubmit(e) {
    e.preventDefault();
setAdmin(false)
    setError("");
    setLoading(true);
    await login(emailRef.current.value, passwordRef.current.value)
      .then((person) => { return getDataFS(person.user.uid) })
      .then((userData) => { setCurrenUserInfoState(userData);  })
      .then(() => navigate('../../user/main'))
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("שגיאת התחברות נסה שנית!"); 
      })
  }

 

  const  adminLogin=async(e)=>{
    e.preventDefault();

      const adminsData={
        email:emailRef.current.value,
        password:passwordRef.current.value
      }
      await loginNode(adminsData).then((res)=>{
              console.log(res.data);
        setCurrentUser(res.data.user)
        setIsAdmin(true)
        navigate('/')
      }).catch((error)=>{
        setError(error)
      })
    }
  
  

  return (
    <>
    {admin?  <Container dir="rtl" className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
           <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card dir="rtl">
            <Card.Body>
              <h2 className="text-center mb-4">התחברות מנהל</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={adminLogin}>
                <Form.Group id="email">
                  <Form.Label>אימייל</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>סיסמא</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Button disabled={loading} className="w-100 mt-2 " type="submit">
                  התחבר            </Button>
              </Form>
              <div className="w-100 text-center mt-3 ">
                <Link to={'/forgotPassword'}> שכחת סיסמא?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2 d-flex flex-column">
            איך לכם חשבון? <Link to={'/signup'}>הירשמו</Link>
            <Button onClick={()=>setAdmin(false)} className="w-25">login as a user</Button>

          </div>
        </div>
      </Container>
       :
     <Container dir="rtl" className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
     <div className="w-100" style={{ maxWidth: '400px' }}>
       <Card >
         <Card.Body>
           <h2 className="text-center mb-4">התחברות </h2>
           {error && <Alert variant="danger">{error}</Alert>}
           <Form onSubmit={handleSubmit}>
             <Form.Group id="email">
               <Form.Label>אימייל</Form.Label>
               <Form.Control type="email" ref={emailRef} required />
             </Form.Group>
             <Form.Group id="password">
               <Form.Label>סיסמא</Form.Label>
               <Form.Control type="password" ref={passwordRef} required />
             </Form.Group>

             <Button disabled={loading} className="w-100 mt-2 " type="submit">
               התחבר            
               </Button>
           </Form>
           <div className="w-100 text-center mt-3 ">
             <Link to={'/forgotPassword'}> שכחת סיסמא?</Link>
           </div>
         </Card.Body>
       </Card>
       <div className="w-100 text-center mt-2 d-flex flex-column">
         איך לכם חשבון? <Link to={'/signup'}>הירשמו</Link>
         <Button onClick={()=>setAdmin(true)} className="w-25"> login as Admin</Button>
       </div>
     </div>
   </Container>
      }
     
    </>
  );
}
