import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCurrenUserInfo } from "../Context/CurrenUserInfoContext";
import { useData } from "../Context/DataContext";
import { useFirestore } from "../Context/FireStoreContext";
import { Tab, Tabs, ListGroup, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { BsInfoCircle } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import moment from "moment/moment";
import { useAuth } from "../Context/AuthContext";
import ThreeDots from "./ThreeDots";

export default function ChildPage() {
  const { currenUserInfoState, setCurrenUserInfoState } = useCurrenUserInfo();
  const { currentUser } = useAuth();
  const { updateFS } = useFirestore();
  const { dataState } = useData();
  const [loadingVaccines, setLoadingVaccines] = useState(true);
  const { name } = useParams();
  const [curChildInfo, setCurChildInfo] = useState(currenUserInfoState.childrensInfo.find((child) => child.name === name))
  const [curAgeFields, setCurAgeFields] = useState(null);
  const [curVaccineKey, setCurVaccineKey] = useState(null);
  const [grownUp, setGrownUp] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (curVaccineKey) {
      setLoadingVaccines(false);
    }
  }, [curVaccineKey])

  useEffect(() => {
    setCurChildInfo(currenUserInfoState.childrensInfo.find((child) => child.name === name))
  }, [name])

  useEffect(() => {

    let childDateOfBirth = moment(curChildInfo.age, "YYYY-MM-DD");
    let years = moment().year() - childDateOfBirth.year();
    let months = moment().month() - childDateOfBirth.month() + (years * 12);
    setCurAgeFields(dataState?.development.find((step) => step.months.includes(months)))

    if (months > 72) {
      setGrownUp(true);
    }



    let curVacc = dataState?.vaccines.find((vacc) => vacc.months.includes(months));
    if (curVacc) {
      setLoadingVaccines(false);
      setCurVaccineKey(curVacc.month)
    }
    else {
      setLoadingVaccines(true);
      setCurVaccineKey(null)
    }
  }, [curChildInfo])

  useEffect(() => {
    if (curAgeFields && curChildInfo.name === name) {
      setGrownUp(false)
    }
  }, [curAgeFields])

  function HandleCheckInput(e, step) {
    let changedUserInfo = { ...currenUserInfoState };
    changedUserInfo.childrensInfo.forEach((child) => {
      if (child.name === name) {
        child.milestones[curAgeFields.stepId][step] = (e.target.checked) ? "success" : "faliure";
      }
    })
    setCurrenUserInfoState(changedUserInfo)
    updateFS(currentUser.uid, "childrensInfo", changedUserInfo.childrensInfo);
  }

  return (
    <div dir="rtl" className="bg-peach p-4">
      <h1 className="m-4">{name}</h1>
      <br />
      {grownUp ? null : <div className="border border-1 rounded p-1">
        <p className="fs-2 text-center m-3 text-decoration-underline">צעדי התפתחות</p>
        <p className="fs-3 text-center mb-2">{curAgeFields?.nameInHeb}</p>
        {curAgeFields?.milestones.map((step, i) => {
          return (
            <div key={i} className=" mb-2 p-1 border border-1 rounded d-flex flex-column flex-md-row justify-content-between">
              <div className="form-check form-check-reverse">
                {(curChildInfo?.name !== name) ? <ThreeDots />
                  : curChildInfo?.milestones[curAgeFields.stepId][step.id] === "success" ?
                    <input className="form-check-input pointer " type="checkbox" value="" id={`question${i}`} checked onChange={(e) => { HandleCheckInput(e, step.id) }} /> :
                    <input className="form-check-input pointer" type="checkbox" value="" id={`question${i}`} onChange={(e) => { HandleCheckInput(e, step.id) }} />
                }
                <label className="form-check-label fs-4" htmlFor={`question${i}`}>
                  {step.name}
                </label>
              </div>
            </div>
          )
        })}
      </div>}
      <br />
      {(loadingVaccines) ? null :
        (<div className="mt-2 p-1 border border-1 rounded">
          <p className="text-center fs-3 m-2 border-bottom text-decoration-underline">תוכנית החיסונים בטיפת חלב</p>

          <Tabs
            id="controlled-tab-example"
            activeKey={curVaccineKey}
            onSelect={(k) => setCurVaccineKey(k)}
            transition={false}
            justify
            fill
            className="mb-3"
          >
            {dataState.vaccines.map((item, i) => {
              return (
                <Tab key={i} eventKey={item.month} title={item.name}>
                  <ListGroup className="bg-peach container" as="ol" numbered>
                    {item.vaccines.map((vac, i) => {
                      return (<ListGroup.Item key={i} className="container" as="li">
                        <div className="d-flex ">
                          <div className="col-5 col-lg-3">
                            <span >{vac.offName}:   {vac.name}</span>
                          </div>
                          <div className="col-2 col-lg-1">
                            <a href={vac.ref} target="_blank" rel="noopener noreferrer">
                              <img src={vac.picture} alt="" className="img-fluid col-10 rounded" />
                            </a>
                          </div>
                          <OverlayTrigger
                            key={vac.name}
                            placement="bottom"
                            overlay={
                              <Tooltip id={`tooltip-${vac.name}`}>
                                {vac.discription}
                              </Tooltip>
                            }
                          >
                            <Button variant="light"><BsInfoCircle /></Button>
                          </OverlayTrigger>
                          <a href={vac.ref} className="col-3 col-lg-6 text-start color-dark" target="_blank" rel="noopener noreferrer"><FiExternalLink /></a>
                        </div>
                      </ListGroup.Item>)
                    })}
                  </ListGroup>
                </Tab>
              )
            })}
          </Tabs>
          <p className="text-center fs-4 border-top m-2 ">מידע נוסף בנוגע לחיסונים</p>
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-evenly align-items-center p-2 col-6">
              <a className="col-2 col-md-1" href="https://vaccines.sanofi.co.il/" target="_blank" rel="noopener noreferrer">
                <img className="rounded img-fluid" src="https://www.infomed.co.il/content/images/encyclopedia/icons/vaccines.svg" alt="" />
              </a>
              <a className="col-2 col-md-1" href="https://www.chisunim.co.il/" target="_blank" rel="noopener noreferrer">
                <img className="rounded img-fluid" src="https://www.chisunim.co.il/wp-content/uploads/2021/01/cropped-chisunim-logo-100-100.jpg" alt="" />
              </a>
              <a className="col-2 col-md-1" href="https://www.health.gov.il/Subjects/pregnancy/Childbirth/Vaccination_of_infants/Pages/default.aspx" target="_blank" rel="noopener noreferrer">
                <img className="rounded img-fluid" src="https://govextra.gov.il/media/15564/logo_ministryofhealth150x150.jpg" alt="" />
              </a>
              <a className="col-2 col-md-1" href="https://www.midaat.org.il/vaccination/childhood/" target="_blank" rel="noopener noreferrer">
                <img className="rounded img-fluid" src="data:image/png;base64,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" alt="" />
              </a>
            </div>
          </div>
        </div>)}
      {grownUp ? (
        <p className="fs-1 m-5 text-center">הילד/ה כבר גדול!</p>
      ) : null}
    </div>
  )
}