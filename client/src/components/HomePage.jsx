import playingKidsPic from "../images/playing-kids.jpg";
import { Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div dir="rtl" className="fs-4 fw-semibold">
      <div className="  bg-light-indigo full-lg-page fs-4 fw-semibold ">
        <h1 className="display-4 p-4 text-center ">התפתחות הילד</h1>
        <Carousel indicators={false} nextLabel={null} controls={false}>
          <Carousel.Item>
            <div className="d-flex flex-column flex-lg-row p-2 justify-content-evenly align-items-center ">
              <img
                src={playingKidsPic}
                className="col-lg-3 col-11 img-fluid rounded mb-2 m-lg-0"
                alt=""
              />
              <div className=" p-2 col-lg-8">
                <text>
                  השנים הראשונות לחייו של תינוק טומנות בחובן התפתחות מהירה בכל
                  תחום אפשרי
                </text>
                <br />
                <text>
                  התפתחות שפה התפתחות מוטורית התפתחות החשיבה, התפתחות רגשית
                  חברתית ועוד.
                </text>
                <br />
                <text>
                  ידוע לכל כי שנים אלו הן קריטיות. המוח גמיש בשנים אלו, וסופג
                  כספוג
                </text>
                <br />
                <text>
                  כל מה שמגישים לו. מסיבה זו חשוב לתת לילד כל מה שהוא צריך ולא
                  להציף בגירויים.
                </text>
                <br />
                <text>
                  הורים רבים מוצאים את עצמם מתלבטים בשאלות משמעותיות לגבי גידולו
                  של התינוק.
                </text>
                <br />
                <text>
                  מה ומתי הוא מבין? כמה להרים על הידיים ומתי ללמדו לדחות
                  סיפוקים?
                </text>
                <br />
                <text>איך מתחילים את הגמילה ממוצץ? את הגמילה מחיתולים?</text>
                <br />
                <text>מתי לפנות למומחה להתפתחות הילד?</text>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className=" d-flex flex-column flex-lg-row p-2 justify-content-evenly align-items-center ">
              <img
                className="col-lg-3 col-11 img-fluid rounded mb-2 m-lg-0"
                src="https://mexp.co.il/wp-content/uploads/thumbs/87793017-ol7lhcgl49h40jgufqkn6skinso4ihpv778v4yzeyw.jpg"
                alt=""
              />
              <div className=" p-2 col-lg-8">
                חשוב להבין שבדומה לעולם המבוגרים, גם אצל ילדים יש רגעים של עליות
                ומורדות, אם משום פחד כתוצאה מסביבה מאיימת ובעייתית, אם משום
                בעיות למידה ואם כתוצאה מסיבות אחרות. בעת מצוקה הילדים יכולים
                להפגין אי שקט, תוקפנות ואף להתנהג באופן בלתי הולם משום הרצון
                בתשומת לב. כל אלו מובילים למסקנה שחשוב להכיר את ההתנהגויות הבלתי
                הולמות אצל ילדים, לזהות אותן כאשר הן מופיעות אצל ילדכם ולנסות
                לעזור לילד ולתקן את המצב. הדרך הטובה ביותר של כל הורה להגיב על
                סיטואציה בה הילד שלו מרביץ לאחרים היא לבחון האם הילד מחקה מבוגר
                שנמצא בסביבתו ונוהג בפיזיות אלימה ומהווה דוגמת חיקוי שלילית
                לילד. בנוסף, חשוב שתלמדו את הילד כיצד לפתור בעיות שונות עם ילדים
                או מבוגרים מבלי לריב
              </div>
            </div>
          </Carousel.Item>
        </Carousel>

       <div className=" bg-dark-blue w-100 d-flex flex-column justify-content-center align-items-center mt-5">
          {" "}
          <h1 className=" text-white">מעקב ומידע על התפתחות הילד החל מגיל לידה </h1>

          <Link  to={'../../signup'} className="text-decoration-none"><h1 className=" text-white border rounded border-3">  להרשמה לחצו כאן!</h1></Link>
        </div>
      </div>
      <div>
        <div className="mt-5">
          <h1>התפתחות הילד לצפיה</h1>
          <div className="d-flex  gap-5 justify-content-center align-items-center p-4">
            <Card className="w-25 d-flex justify-content-between align-items-center">
              <Card.Body>
                <iframe
                  className="rounded"
                  width="350"
                  height="200"
                  src="https://www.youtube.com/embed/NNgp1_B-6c8"
                  title="Early Childhood Education: The Research"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
                <Card.Text>להבין את התפתחות הילד</Card.Text>
              </Card.Body>
            </Card>
            <Card className="w-25 d-flex justify-content-between align-items-center">
              <Card.Body>
                <iframe
                  width="350"
                  height="200"
                  src="https://www.youtube.com/embed/gIZ8PkLMMUo"
                  title="What is the most important influence on child development | Tom Weisner | TEDxUCLA"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
                <Card.Text>מה משפיע על התפתחות הילד?</Card.Text>
              </Card.Body>
            </Card>
            <Card className="w-25 d-flex justify-content-between align-items-center">
              <Card.Body>
                <iframe
                  width="350"
                  height="200"
                  src="https://www.youtube.com/embed/1d5Nb6aPC5k"
                  title="התפתחות ילדים"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
                <Card.Text>התפתחות הילד</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="mt-4 p-3">
          <h1>מידע להורים</h1>
          <div className="d-flex gap-5 justify-content-center ">
            <Link className="text-decoration-none" to={"/article1"}>
              <Card style={{ width: "20rem", height: "18rem" }}>
                <Card.Img
                  style={{ height: "230px" }}
                  variant="top"
                  src="https://studiotzeadim.com/wp-content/uploads/2018/07/1-3.jpg"
                />
                <Card.Body>
                  <Card.Text>התפתחות הילד: אין כמו אמא</Card.Text>
                </Card.Body>
              </Card>
            </Link>
            <Link className="text-decoration-none" to={"/article2"}>
              <Card style={{ width: "20rem", height: "18rem" }}>
                <Card.Img
                  style={{ height: "230px" }}
                  variant="top"
                  src="https://studiotzeadim.com/wp-content/uploads/2018/07/%D7%A6%D7%91%D7%99-1100x733.jpg"
                />
                <Card.Body>
                  <Card.Text>להבין את התפתחות הילד</Card.Text>
                </Card.Body>
              </Card>
            </Link>
            <Link className="text-decoration-none" to={"/article3"}>
              <Card style={{ width: "20rem", height: "18rem" }}>
                <Card.Img
                  style={{ height: "230px" }}
                  variant="top"
                  src="https://studiotzeadim.com/wp-content/uploads/2018/07/4-3.jpg"
                />
                <Card.Body>
                  <Card.Text>איך להגיב לאלימות </Card.Text>
                </Card.Body>
              </Card>
            </Link>
            <Link className="text-decoration-none" to={"/article4"}>
              {" "}
              <Card style={{ width: "20rem", height: "18rem" }}>
                <Card.Img
                  style={{ height: "230px" }}
                  variant="top"
                  src="https://studiotzeadim.com/wp-content/uploads/2018/07/1-5.jpg"
                />
                <Card.Body>
                  <Card.Text>הילד חווה הפרעה באכילה </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
