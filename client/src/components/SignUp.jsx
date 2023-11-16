import React from "react";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {signupNode,loginNode} from '../ConnectionsToserver/httpRequests'
import {useCurrenUserInfo} from '../Context/CurrenUserInfoContext'
export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const passwordConfirmRef = useRef();
  const SQARef=useRef();
  const SQBRef=useRef();
  const { signup,currentUser,setCurrentUser } = useAuth();
  const{isAdmin,setIsAdmin} = useCurrenUserInfo();

  const [error, setError] = useState("");
  const [admin,setAdmin]=useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
if(admin){

  if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    return setError("סיסמא לא תואמת");
  }
  try {
    const signUpData={
      email:emailRef.current.value,
      password:passwordRef.current.value,
      securityQuestionA:SQARef.current.value,
      securityQuestionB:SQBRef.current.value,
      name:nameRef.current.value,
      role:"admin"
    }
    setError("");
    setLoading(true);
    await signupNode(signUpData).then((response)=>{
console.log("data coming from node srever",response);
setCurrentUser(signUpData);
setIsAdmin(true)
    })
  } catch {
    return setError("אינך יכול להירשם כמנהל");
  }
  setLoading(false);
  navigate('/')
}else 
  { if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("סיסמא לא תואמת");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      return setError("שגיאה ביצירת חשבון");
    }
    setLoading(false);
    navigate('/addDetailes')}
  }

  return (
    <>{admin?
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      
      <div className="w-100" style={{maxWidth:'400px'}}>
      <Card dir="rtl">
        <Card.Body>
          <h2 className="text-center mb-4">הרשמה</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>אימות סיסמא</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>שם:</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="admin-confirm">
              <Form.Label>שאלת אימות א:</Form.Label>
              <Form.Control type="text" ref={SQARef} required />
            </Form.Group>
            <Form.Group id="admin-confirm">
              <Form.Label>שאלת אימות ב:</Form.Label>
              <Form.Control type="text" ref={SQBRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              הרשמה
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
       יש לך כבר חשבון? <Link to={'/login'}>היכנס</Link>
      </div>
      </div>

      </Container>
:
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      <div className="w-100" style={{maxWidth:'400px'}}>
      <Card dir="rtl">
        <Card.Body>
          <h2 className="text-center mb-4">הרשמה</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>אימות סיסמא</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              הרשמה
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
       יש לך כבר חשבון? <Link to={'/login'}>היכנס</Link>
      </div>
      <Button onClick={()=>setAdmin(true)} className="w-75 m-4">SignUp as Admin</Button>

      </div>
      </Container>
    }
   
    </>
  );
}
