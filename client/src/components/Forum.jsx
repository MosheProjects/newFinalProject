import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useRef, useState } from "react";
import { useFirestore } from "../Context/FireStoreContext";
import { useAuth } from "../Context/AuthContext";
import { useCurrenUserInfo } from "../Context/CurrenUserInfoContext";
import ThreeDots from "./ThreeDots";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { uuid4 } from "uuid4";
export default function Forum() {
  const [forumdata, setForumData] = useState(null);
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false);
  const { currentUser } = useAuth();
  const { currenUserInfoState } = useCurrenUserInfo();
  const { addFsForum, getDataFsForum } = useFirestore();
  const messageRef = useRef();
  const [colorByName, setColorByName] = useState([]);



  useEffect(() => {
    getDataFsForum("forumMessages").then((data) => {
      setForumData(data);
      setFlag(true)
    });
  }, []);



  useEffect(() => {
    if (flag)
      addFsForum("forumMessages", forumdata).then(() => {
        getDataFsForum("forumMessages").then((data) => {
          setForumData(data);
        });
        const colors = ["red", "blue", "green", "yellow", "brown", "orange", "pink"];
        const names = forumdata.forum.map((message) => message.name);
        const uniqeNames = [...new Set(names)];
        setColorByName(uniqeNames.map((person, i) => { return { name: person, color: colors[i % colors.length] } }))
      });
  }, [forumdata]);



  function handleSubmit(e) {
    setMessage("");
    console.log("ref:", messageRef.current.value);
    const uniqId = uuid4();
    e.preventDefault();
    const newObj = {
      name: currenUserInfoState.pName + " " + currenUserInfoState.sName,
      message: messageRef.current.value,
      likes: 0,
      dLikes: 0,
      id: uniqId
    };
    const newArray = [...forumdata.forum, newObj];
    console.log("newArr:", newArray);
    setForumData({ forum: newArray });
  }



  function handleLikes(id) {
    let tempData = [...forumdata.forum]
    tempData.forEach((message) => {
      if (message.id === id) {
        message.likes++;
      }
    })
    setForumData({ forum: tempData });
  }



  function handleDlikes(id) {
    let tempData = [...forumdata.forum]
    tempData.forEach((message) => {
      if (message.id === id) {
        message.dLikes++;
      }
    })
    setForumData({ forum: tempData });
  }



  
  return (
    <div
      dir="rtl"
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1>פורום ייעוץ להורים</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingTextarea2" label="כתוב משהו...">
          <Form.Control
            as="textarea"
            style={{ height: "100px", width: "500px" }}
            ref={messageRef}
            required
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={() => {
              getDataFsForum("forumMessages")
                .then((data) => { setForumData(data); });
            }}
          />
        </FloatingLabel>
        <Button type="submit">הוסף תגובה</Button>
      </Form>
      {forumdata?.forum ? (
        <div className="d-flex flex-column-reverse w-50">
          {forumdata?.forum.map((item) => {
            return (
              <div key={item.id} className="border rounded  p-1" style={{ height: "100px" }}>
                <p style={{ fontWeight: "bold", color: `${colorByName?.find((message) => item.name === message.name)?.color}` }}>
                  {item.name}
                </p>
                <span>{item.message}</span>
                <div className="d-flex float-start gap-2">
                  <div>
                    {" "}
                    {item.dLikes}
                    <FiThumbsDown className="pointer" onClick={() => handleDlikes(item.id)} />
                  </div>
                  <div>
                    {item.likes}
                    <FiThumbsUp className="pointer" onClick={() => handleLikes(item.id)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <ThreeDots />
      )}
    </div>
  );
}