import { useCurrenUserInfo } from "../Context/CurrenUserInfoContext"
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useState,useRef } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useFirestore} from '../Context/FireStoreContext'
import { useAuth } from "../Context/AuthContext";
import { MdOutlineStayCurrentLandscape } from "react-icons/md";
import { MdPersonRemove } from "react-icons/md";


export default function PersonalMainPage() {

  const {currenUserInfoState,setCurrenUserInfoState  } = useCurrenUserInfo();
  const [loading, setLoading] = useState(false);
  const [addingDetailes, setAddDetailes] = useState(false);
  const {addFS,updateFS}=useFirestore();
  const {currentUser}=useAuth();
  const nameRef = useRef();
  const ageRef = useRef();


  function AddChild(){
    setLoading(true);

  }
  function deleteChild(index){
  console.log("hi",index);
  let updatedChildren=currenUserInfoState.childrensInfo.filter((item,i)=>
  i !== index)
  console.log(updatedChildren);
   setCurrenUserInfoState({...currenUserInfoState, childrensInfo:updatedChildren})
   updateFS(currentUser.uid,"childrensInfo",updatedChildren);
 
}
  function handleSubmit(e){
    e.preventDefault();


    const temp =[...currenUserInfoState.childrensInfo];
    console.log(temp);
    const addedDetailes={
        name:nameRef.current.value,
        age:ageRef.current.value,
        milestones: {
          "sixWeeksToThree": {
            jyrx6457: "unknown",
            opjbuv234: "unknown",
            yhbolk836: "unknown",
            pzuysj610: "unknown",
          },
          "threeMonthsToSix": {
            qrbxlf0396: "unknown",
            pzqmtco03g: "unknown",
            gpgwhc9jb: "unknown",
            pmo94n9fn: "unknown",
            b7x5zuib: "unknown",
            yb7c4x30m: "unknown",
            vusdtww45ed: "unknown",
          },
          "sixMonthsToNine": {
            evd72hsod: "unknown",
            u3l6j9n: "unknown",
            spdn658rhx: "unknown",
            nxid73gds6w: "unknown",
          },
          "nineMonthsToTwelve": {
            nmso03jf41: "unknown",
            b827xnajs42: "unknown",
            nvm9mes43: "unknown",
            vtx5s4in44: "unknown",
            alzmcjo45: "unknown",
            tyrhejkw46: "unknown",
            nc834nc3m2op47: "unknown",
            nx74z29qir48: "unknown",
            xe4ynjd5g49: "unknown",
            omxcrw410: "unknown",
          },
          "twelveMonthsToEighteen": {
            nc44nc51: "unknown",
            pabdhy47h52: "unknown",
            vuddy73n53: "unknown",
            pxmfh84b54: "unknown",
            m9n7v6md55: "unknown",
            pwxmeu7d7d56: "unknown",
            zmuugwko57: "unknown",
          },
          "eighteenMonthsToTwentyfour": {
            mkoi89076y61: "unknown",
            mfnbkj62: "unknown",
            hvbvfi787df63: "unknown",
            zxfej980hf64: "unknown",
            yutrgv65: "unknown",
            hbhbcij66: "unknown",
            pojjgh67: "unknown",
            pppmlp68: "unknown",
            ppp990jh69: "unknown",
          },
          "twoYearsToThree": {
            yyy67676u71: "unknown",
            llll99996po72: "unknown",
            pp55opo73: "unknown",
            i432iiw74: "unknown",
            dghfy67571k75: "unknown",
            beycge64t64gf76: "unknown",
            zy8l90dy6k77: "unknown",
            ytuir78463q78: "unknown",
          },
          "threeYearsToFour": {
            p0l736yet81: "unknown",
            udhf7rt47k82: "unknown",
            mosh626ys83: "unknown",
            pilo86yvd84: "unknown",
            udhberb7ut85: "unknown",
          },
          "fourYearsToFive": {
            tnt50779eoj76n91: "unknown",
            try5r7zz92: "unknown",
            idfgurhg7478488kjk93: "unknown",
            opjr948hfurf94: "unknown",
            nifgnbiudbuy7ry95: "unknown",
            difgiud97dfbh96: "unknown",
            egergiuyg97: "unknown",
            jbdsfiuegiuug98: "unknown",
          },
          "fiveYearsToSix": {
            ubycex473b101: "unknown",
            nv7ncv347t102: "unknown",
            n8n4c7mp103: "unknown",
            vst2vxj104: "unknown",
            nd8dnx105: "unknown",
            n7zm3wrs106: "unknown",
            q9dnml107: "unknown",
          }
        }
    }
    currenUserInfoState.childrensInfo.push(addedDetailes)
setCurrenUserInfoState(currenUserInfoState)
addFS(currentUser.uid,currenUserInfoState)
.then(()=>{
  setLoading(false);
})


  }

  return (
    <div dir="rtl" className="bg-light-indigo p-5 d-flex flex-column flex-md-row justify-content-evenly" style={{minHeight:'100vh'}}>
      <div className="d-flex flex-column justify-content-evenly align-items-start">
        <h1>{currenUserInfoState.pName} {currenUserInfoState.sName}</h1>
        {loading?  <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>שם</Form.Label>
              <Form.Control ref={nameRef} type="string" required/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>תאריך לידה</Form.Label>
              <Form.Control ref={ageRef} type="date" required />
            </Form.Group>
            <Button variant="primary" type='submit'>
           הוסף
          </Button>
            </Form>
            :  <button className="btn btn-primary fs-4" onClick={AddChild}>הוסף ילד</button>

            }
      </div>
      <div className="d-flex col-8 col-md-3 flex-column  text-center  justify-content-between">
        {currenUserInfoState.childrensInfo.map((child, i) => {
          return (<div  ><Link key={i} to={`../../child/${child.name}`} className="col-12 text-center btn btn-light rounded-pill m-3">
            <div className='col-12 text-dark text-decoration-none fs-4'>
              {child.name}
            </div>
          </Link> <MdPersonRemove onClick={()=>deleteChild(i)}></MdPersonRemove> </div> )
        })}
      
          
      </div>
    </div>
    );
}
