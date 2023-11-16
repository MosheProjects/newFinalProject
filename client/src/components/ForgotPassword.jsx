import React from "react";
import { Card, Button, Form, Alert,Container } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMassage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();


    try {
        setMassage('');
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
    setMassage('תבדוק את תיבת הדואר נכנס שלך להמשך הוראות')
    } catch {
      setError("failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      <div className="w-100" style={{maxWidth:'400px'}}>
      <Card dir="rtl">
        <Card.Body>
          <h2 className="text-center mb-4">עידכון סיסמא</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>אימייל</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
עדכן סיסמא            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
         <Link to={'/login'}> היכנס</Link>
</div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
       איך לכם חשבון? <Link to={'/signup'}>הירשמו</Link>
      </div>
      </div>
      </Container>
    </>
  );
}