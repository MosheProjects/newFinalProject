import { Card, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrenUserInfo } from "../Context/CurrenUserInfoContext";
export default function ErrNotLoggedIn() {
  const { isAdmin } = useCurrenUserInfo();

  return (
    <>
      {isAdmin ? (
        <Container
          dir="rtl"
          className="d-flex align-items-center justify-content-center text-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
              <Card.Body className="d-flex flex-column justify-content-evenly">
                <Alert variant="danger">אנא היכנס</Alert>
                <Link
                  to={"../../login"}
                  className="text-decoration-none p-1 fs-4  "
                >
                  כניסה
                </Link>
                <Link
                  to={"../../signup"}
                  className="text-decoration-none p-1 fs-4  "
                >
                  הרשמה
                </Link>
              </Card.Body>
            </Card>
          </div>
        </Container>
      ) : (
        <Container
          dir="rtl"
          className="d-flex align-items-center justify-content-center text-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
              <Card.Body className="d-flex flex-column justify-content-evenly">
                <Alert variant="danger">אינך רשום כמנהל אין לך גישה!</Alert>
              </Card.Body>
            </Card>
          </div>
        </Container>
      )}
    </>
  );
}
