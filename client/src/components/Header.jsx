import { Link } from "react-router-dom";
import siteLogo from '../images/logo.jpeg'
import genPerson from '../images/gen-person.jpg'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCurrenUserInfo } from "../Context/CurrenUserInfoContext";
import { useAuth } from "../Context/AuthContext";
import {endConnection} from '../ConnectionsToserver/httpRequests'
export default function Header() {
  const{currenUserInfoState,isAdmin,setIsAdmin} = useCurrenUserInfo();
  const {logout,currentUser} = useAuth();
  
  return (
    <Navbar expand="md" dir='rtl' className="bg-dark-blue">
      <Container>
        <Link to={''} className='col-lg-1 col-4 col-md-2 '>
          <img src={siteLogo} alt="" className="img-fluid " />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="col-12 col-lg-6 d-lg-flex justify-content-evenly align-items-start align-items-md-center ">
            <Link to={'../../'} className='link-light text-decoration-none fs-4'>דף הבית</Link>
            {isAdmin? <Link to={'../../adminsPage'} className='link-light text-decoration-none fs-4'>דף מנהל</Link>:null} 

            {(currenUserInfoState)?
              (<>
              <Link to={'../../user/main'} className='link-light text-decoration-none fs-4'>מידע אישי</Link>
              <Link to={'../../user/forum'} className='link-light text-decoration-none fs-4'>פורום הורים</Link>

            {(currenUserInfoState.childrensInfo.length>0)?(
              <NavDropdown title="ילדים" className="text-nothing text-decoration-none fs-4 " id="navbarScrollingDropdown">
                <div className="d-flex flex-column text-center  justify-content-between">
                {currenUserInfoState.childrensInfo.map((child,i)=>{
                  return <Link key={i} to={`../../child/${child.name}`} className='link-primary text-decoration-none p-1 fs-4'>{child.name}</Link>
                })}</div>
            </NavDropdown>
            ):null}
            </>):null}
          </Nav>
        </Navbar.Collapse>
        <Dropdown className="  m-3 m-md-0 position-absolute position-md-static end-50 top-0 col-2 col-md-1">
            <Dropdown.Toggle className="bg-dark-blue border-0  "  id="dropdown-basic">
              <div className="col-md-10 border rounded-circle  border-white">
                <img src={(currenUserInfoState)? currenUserInfoState.avatar : genPerson} alt="" className="img-fluid" style={(currenUserInfoState)? null:{ mixBlendMode: 'color-burn' }} />
              </div>
            </Dropdown.Toggle>
          <Dropdown.Menu className="bg-nothing m-2 p-2">
          <div className="d-flex flex-column text-center">{(currenUserInfoState || isAdmin)?
              (<>
              <Link to={'../../user/main'} className='link-primary text-decoration-none p-1 fs-4'>שלום {isAdmin? currentUser.name:currenUserInfoState.pName}</Link>
              <Link to={'../../login'} onClick={isAdmin? ()=>{endConnection();setIsAdmin(false);} :logout} className="text-decoration-none p-1 fs-4  ">יציאה</Link>
              </>):
              (<>
                <Link to={'../../login'} className="text-decoration-none p-1 fs-4  ">כניסה</Link>
                <Link to={'../../signup'} className="text-decoration-none p-1 fs-4  ">הרשמה</Link>

              </>)}</div>
          </Dropdown.Menu>
        </Dropdown>

      </Container>
    </Navbar>
  )
}
